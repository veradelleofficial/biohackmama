import { NextResponse } from 'next/server'
import { scoreProduct, type ProductKind } from '@/lib/skaner/score'

/**
 * GET /api/sklad?ean=5900259128843
 * Szuka produktu w Open Food Facts, a jeśli go nie ma, w Open Beauty Facts.
 * Zwraca znormalizowane dane i ocenę (gwiazdki + werdykt).
 */

const UA = 'BioHackMama/1.0 (https://biohackmama.pl; contact@biohackmama.pl)'
const FIELDS = [
  'product_name', 'product_name_pl', 'generic_name_pl', 'brands', 'image_front_small_url', 'image_front_url',
  'ingredients_text_pl', 'ingredients_text', 'ingredients_text_en',
  'additives_tags', 'ingredients_tags', 'ingredients_analysis_tags', 'nova_group',
].join(',')

const SOURCES: { kind: ProductKind; host: string; label: string; url: string }[] = [
  { kind: 'food', host: 'https://world.openfoodfacts.org', label: 'Open Food Facts', url: 'https://pl.openfoodfacts.org/produkt/' },
  { kind: 'cosmetic', host: 'https://world.openbeautyfacts.org', label: 'Open Beauty Facts', url: 'https://pl.openbeautyfacts.org/produkt/' },
]

async function lookup(host: string, ean: string) {
  const res = await fetch(`${host}/api/v2/product/${ean}.json?fields=${FIELDS}`, {
    headers: { 'User-Agent': UA },
    next: { revalidate: 60 * 60 * 24 },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (data?.status !== 1 || !data.product) return null
  return data.product as Record<string, any>
}

export async function GET(req: Request) {
  const ean = new URL(req.url).searchParams.get('ean')?.replace(/\D/g, '') ?? ''
  if (!/^\d{8,14}$/.test(ean)) {
    return NextResponse.json({ error: 'Nieprawidłowy kod kreskowy. Powinien mieć od 8 do 14 cyfr.' }, { status: 400 })
  }

  try {
    for (const src of SOURCES) {
      const p = await lookup(src.host, ean)
      if (!p) continue

      const ingredientsText: string =
        p.ingredients_text_pl || p.ingredients_text || p.ingredients_text_en || ''
      const input = {
        kind: src.kind,
        ingredientsText,
        additives: (p.additives_tags as string[]) || [],
        ingredientTags: (p.ingredients_tags as string[]) || [],
        analysisTags: (p.ingredients_analysis_tags as string[]) || [],
        nova: typeof p.nova_group === 'number' ? p.nova_group : null,
      }
      const score = scoreProduct(input)

      return NextResponse.json(
        {
          found: true,
          ean,
          kind: src.kind,
          source: src.label,
          sourceUrl: src.url + ean,
          name: p.product_name_pl || p.product_name || p.generic_name_pl || '',
          brand: (p.brands || '').split(',')[0]?.trim() || '',
          image: p.image_front_small_url || p.image_front_url || null,
          ingredientsText,
          nova: input.nova,
          ...score,
        },
        { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } },
      )
    }

    return NextResponse.json({ found: false, ean })
  } catch {
    return NextResponse.json({ error: 'Nie udało się połączyć z bazą produktów. Spróbuj za chwilę.' }, { status: 502 })
  }
}
