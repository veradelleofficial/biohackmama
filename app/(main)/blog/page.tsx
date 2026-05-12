import type { Metadata } from 'next'
import { getArticles } from '@/lib/sanity/queries'
import { BlogCoverHero } from '@/components/blog/BlogCoverHero'
import BlogList from './BlogList'

export const metadata: Metadata = {
  title: 'Blog – biohacking i wellness dla kobiet',
  description:
    'Artykuły o biohackingu, hormonach, śnie, żywieniu i długowieczności. Naukowe protokoły dopasowane do kobiecego ciała.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <main className="pb-14 md:pb-20">

      {/* Full-bleed cover hero — no container, no top padding */}
      <BlogCoverHero />

      {/* Content area — -mt pulls it up to overlap the hero's fade-out zone */}
      <div className="container max-w-5xl -mt-8 md:-mt-14 relative z-40">
        <BlogList articles={articles || []} />

        <div className="mt-14 md:mt-20 pt-8 border-t border-border/40 text-center">
          <p
            className="text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'rgba(72, 89, 107, 0.75)' }}
          >
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady
            medycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia skonsultuj się
            z lekarzem.
          </p>
        </div>
      </div>

    </main>
  )
}
