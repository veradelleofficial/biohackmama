import { getArticleBySlug } from '@/lib/sanity/queries'
import { renderOgImage, OG_SIZE } from '@/lib/brand-image'

export const runtime = 'edge'
export const alt = 'BioHackMama: artykuł'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  const title = article?.title || 'BioHackMama'
  const category = article?.category || 'Biohacking'
  const readTime = article?.readTime ? ` · ${article.readTime} min czytania` : ''

  return renderOgImage({
    eyebrow: `${category}${readTime}`,
    title,
  })
}
