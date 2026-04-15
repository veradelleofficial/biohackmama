import type { Metadata } from 'next'
import { getArticles } from '@/lib/sanity/queries'
import BlogList from './BlogList'

export const metadata: Metadata = {
  title: 'Blog – biohacking i wellness dla kobiet',
  description: 'Artykuły o biohackingu, hormonach, śnie, żywieniu i długowieczności. Naukowe protokoły dopasowane do kobiecego ciała.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-normal mb-4 md:mb-5 tracking-heading uppercase">
            Blog
          </h1>
          <p className="text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Artykuły, porady i protokoły na twoje zdrowie
          </p>
        </div>

        <BlogList articles={articles || []} />

        <div className="mt-14 md:mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.75)' }}>
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady medycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia skonsultuj się z lekarzem.
          </p>
        </div>
      </div>
    </main>
  )
}
