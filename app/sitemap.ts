import { MetadataRoute } from 'next'
import { getArticles, getCourses, getEbooks, getPilars, getSubcategoriesByPilar } from '@/lib/sanity/queries'

const BASE_URL = 'https://biohackmama.pl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/o-mnie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/kursy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/ebooki`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/narzedzia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/narzedzia/kalkulator-snu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/narzedzia/kalkulator-okna-zywieniowego`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/narzedzia/tracker-cyklu-suplementacja`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  let pilarPages: MetadataRoute.Sitemap = []
  let subcategoryPages: MetadataRoute.Sitemap = []
  let articlePages: MetadataRoute.Sitemap = []
  let coursePages: MetadataRoute.Sitemap = []
  let ebookPages: MetadataRoute.Sitemap = []

  // Pilar hub pages
  try {
    const pilars = await getPilars()
    pilarPages = (pilars || []).map((p: any) => ({
      url: `${BASE_URL}/${p.slug?.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))

    // Subcategory pages
    for (const pilar of pilars || []) {
      const subs = await getSubcategoriesByPilar(pilar.slug?.current)
      for (const sub of subs || []) {
        subcategoryPages.push({
          url: `${BASE_URL}/${pilar.slug?.current}/${sub.slug?.current}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        })
      }
    }
  } catch {}

  // Article pages – new URL structure
  try {
    const articles = await getArticles()
    articlePages = (articles || [])
      .filter((a: any) => a.pilarSlug && a.categorySlug && a.slug?.current)
      .map((a: any) => ({
        url: `${BASE_URL}/${a.pilarSlug}/${a.categorySlug}/${a.slug.current}`,
        lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
  } catch {}

  try {
    const courses = await getCourses()
    coursePages = (courses || []).map((c: any) => ({
      url: `${BASE_URL}/kursy/${c.slug?.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch {}

  try {
    const ebooks = await getEbooks()
    ebookPages = (ebooks || []).map((e: any) => ({
      url: `${BASE_URL}/ebooki/${e.slug?.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch {}

  return [...staticPages, ...pilarPages, ...subcategoryPages, ...articlePages, ...coursePages, ...ebookPages]
}
