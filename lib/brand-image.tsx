import { ImageResponse } from 'next/og'
import { WORDMARK_DATA_URI, WORDMARK_RATIO, MARK_DATA_URI, MARK_RATIO, SQUARE_DATA_URI } from '@/components/brand/logo-assets'

const LOGO_CREAM = '#F4EFE6'
const LOGO_LIME = '#C9F24F'

const CACHE = { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' }

const BG = '#0E0D0A'
const INK_SOFT = '#B8B0A3'
const INK_DIM = '#948C7F'
const RULE = '#2A2622'

/**
 * Pobiera czcionkę z Google Fonts w formacie TTF (ImageResponse nie czyta woff2).
 * `text` ogranicza plik do potrzebnych znaków, więc jest mały.
 */
async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const chars = Array.from(new Set(text)).join('')
  const api = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(chars)}`
  const css = await (await fetch(api, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text() // stary UA = TTF
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error(`Nie udało się pobrać czcionki ${family}`)
  return (await fetch(url)).arrayBuffer()
}

/* eslint-disable @next/next/no-img-element */
const Wordmark = ({ height }: { height: number }) => (
  <img src={WORDMARK_DATA_URI} height={height} width={Math.round(height * WORDMARK_RATIO)} alt="" />
)
const Mark = ({ height }: { height: number }) => (
  <img src={MARK_DATA_URI} height={height} width={Math.round(height * MARK_RATIO)} alt="" />
)

/** Poziome logo na ciemnym tle (dla Google / schema.org). */
export function renderLogoPng() {
  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG }}>
        <Wordmark height={112} />
      </div>
    ),
    { width: 1200, height: 320, headers: CACHE }
  )
}

/** Kwadratowy znak do zdjęcia profilowego (Instagram, Facebook, YouTube). */
export function renderAvatarPng() {
  return new ImageResponse(
    (
      <div style={{ width: 1080, height: 1080, display: 'flex', background: BG }}>
        <img src={SQUARE_DATA_URI} width={1080} height={1080} alt="" />
      </div>
    ),
    { width: 1080, height: 1080, headers: CACHE }
  )
}

/* ───────────────── Obrazki do udostępniania linków (1200 x 630) ───────────────── */

export const OG_SIZE = { width: 1200, height: 630 }

export type OgInput = {
  /** Mała etykieta nad tytułem, np. "HORMONY · 9 MIN" */
  eyebrow: string
  /** Główny tytuł. Fragment w `accent` (jeśli jest w tytule) dostaje kolor limonki. */
  title: string
  accent?: string
  /** Krótki opis pod tytułem (opcjonalnie) */
  subtitle?: string
  /** Pigułki na dole, np. poziom, czas trwania. `highlight` = limonkowa (cena) */
  chips?: { label: string; highlight?: boolean }[]
}

function titleSize(title: string) {
  if (title.length > 70) return 46
  if (title.length > 48) return 54
  if (title.length > 28) return 64
  return 76
}

export async function renderOgImage({ eyebrow, title, accent, subtitle, chips = [] }: OgInput) {
  const soraText = title + chips.map((c) => c.label).join('')
  const [sora600, sora300, mono] = await Promise.all([
    loadGoogleFont('Instrument Sans', 600, soraText),
    loadGoogleFont('Instrument Sans', 300, subtitle || 'a'),
    loadGoogleFont('JetBrains Mono', 500, (eyebrow + 'biohackmama.pl').toUpperCase() + 'biohackmama.pl'),
  ])

  // Podział tytułu na część zwykłą i wyróżnioną
  let before = title
  let accented = ''
  let after = ''
  if (accent && title.includes(accent)) {
    const i = title.indexOf(accent)
    before = title.slice(0, i)
    accented = accent
    after = title.slice(i + accent.length)
  }

  const fs = titleSize(title)
  // Opis max ~2 linie, ucięty na całym słowie
  const shortSubtitle =
    subtitle && subtitle.length > 100
      ? subtitle.slice(0, 100).replace(/\s+\S*$/, '').replace(/[\s,.:;]+$/, '') + '…'
      : subtitle

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: 'flex', position: 'relative', background: BG, overflow: 'hidden' }}>
        {/* Zorza: limonka z lewej góry, róż z prawej dołu (jak hero strony) */}
        <div style={{ position: 'absolute', top: -260, left: -200, width: 760, height: 760, borderRadius: 9999, display: 'flex', background: 'radial-gradient(circle, rgba(201,242,79,0.16) 0%, rgba(201,242,79,0) 65%)' }} />
        <div style={{ position: 'absolute', bottom: -320, right: -160, width: 820, height: 820, borderRadius: 9999, display: 'flex', background: 'radial-gradient(circle, rgba(232,174,189,0.14) 0%, rgba(232,174,189,0) 65%)' }} />

        {/* Duży znak po prawej */}
        <div style={{ position: 'absolute', right: 150, top: 95, display: 'flex' }}>
          <Mark height={440} />
        </div>

        {/* Treść */}
        <div style={{ position: 'absolute', left: 80, top: 64, bottom: 64, width: 760, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex' }}>
            <Wordmark height={30} />
          </div>

          {/* Środek: etykieta, tytuł, opis */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 500, fontSize: 18, letterSpacing: '3.5px', color: LOGO_LIME, textTransform: 'uppercase' }}>
              {eyebrow}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontFamily: 'Instrument Sans', fontWeight: 600, fontSize: fs, lineHeight: 1.06, letterSpacing: `${-fs * 0.03}px`, color: LOGO_CREAM }}>
              {before && <span style={{ whiteSpace: 'pre-wrap' }}>{before}</span>}
              {accented && <span style={{ whiteSpace: 'pre-wrap', color: LOGO_LIME }}>{accented}</span>}
              {after && <span style={{ whiteSpace: 'pre-wrap' }}>{after}</span>}
            </div>
            {shortSubtitle && (
              <span style={{ fontFamily: 'Instrument Sans', fontWeight: 300, fontSize: 24, lineHeight: 1.45, color: INK_SOFT, maxWidth: 700 }}>
                {shortSubtitle}
              </span>
            )}
          </div>

          {/* Dół: pigułki + adres */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {chips.map((c) => (
              <span
                key={c.label}
                style={{
                  fontFamily: 'Instrument Sans',
                  fontWeight: 600,
                  fontSize: 18,
                  padding: '8px 18px',
                  borderRadius: 999,
                  color: c.highlight ? BG : LOGO_CREAM,
                  background: c.highlight ? LOGO_LIME : 'transparent',
                  border: c.highlight ? `1px solid ${LOGO_LIME}` : `1px solid ${RULE}`,
                }}
              >
                {c.label}
              </span>
            ))}
            <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 500, fontSize: 16, letterSpacing: '2px', color: INK_DIM, marginLeft: chips.length ? 12 : 0 }}>
              biohackmama.pl
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Instrument Sans', data: sora600, weight: 600, style: 'normal' },
        { name: 'Instrument Sans', data: sora300, weight: 300, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
      ],
    }
  )
}
