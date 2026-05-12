import type { Metadata } from 'next'
import { getArticles } from '@/lib/sanity/queries'
import BlogListLabRose from './BlogList'

export const metadata: Metadata = {
  title: 'Artykuły o biohackingu i wellness | BioHackMama',
  description:
    'Artykuły o biohackingu dla kobiet. Hormony, sen, regeneracja, longevity. Każdy z bibliografią i źródłami.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const articles = await getArticles()
  return (
    <main className="min-h-screen">
      <BlogListLabRose articles={articles || []} />
    </main>
  )
}
