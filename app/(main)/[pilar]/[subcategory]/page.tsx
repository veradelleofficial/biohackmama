import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSubcategoryBySlug, getArticlesBySubcategory } from '@/lib/sanity/queries'

const BASE_URL = 'https://biohackmama.pl'

const PILARS_CONFIG: Record<string, { icon: string }> = {
  'biohacking-kobiet': { icon: '🧬' },
  'sen-regeneracja': { icon: '🌙' },
  'zywienie-metabolizm': { icon: '🥗' },
  'wydajnosc-umyslu': { icon: '🧠' },
  'longevity': { icon: '⚡' },
}

interface PageProps {
  params: { pilar: string; subcategory: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const sub = await getSubcategoryBySlug(params.pilar, params.subcategory)
  if (!sub) return { title: 'Nie znaleziono', robots: { index: false, follow: false } }

  const title = sub.metaTitle || `${sub.title} – ${sub.pilarTitle} | BioHackMama`
  const description = sub.metaDescription || sub.description || ''

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${params.pilar}/${params.subcategory}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${params.pilar}/${params.subcategory}`,
      type: 'website',
      siteName: 'BioHackMama',
    },
  }
}

export default async function SubcategoryPage({ params }: PageProps) {
  const [sub, articles] = await Promise.all([
    getSubcategoryBySlug(params.pilar, params.subcategory),
    getArticlesBySubcategory(params.pilar, params.subcategory),
  ])

  if (!sub) notFound()

  const icon = PILARS_CONFIG[params.pilar]?.icon || '📝'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: sub.pilarTitle, item: `${BASE_URL}/${params.pilar}` },
      { '@type': 'ListItem', position: 3, name: sub.title, item: `${BASE_URL}/${params.pilar}/${params.subcategory}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="container">

          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li>
                <Link href={`/${params.pilar}`} className="hover:text-coastal-gold transition-colors">
                  {sub.pilarTitle}
                </Link>
              </li>
              <li>/</li>
              <li className="text-coastal-slate font-medium">{sub.title}</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="mb-14">
            <div className="text-4xl mb-4">{icon}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading uppercase mb-4">
              {sub.title}
            </h1>
            {sub.description && (
              <p className="text-lg font-light max-w-2xl" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                {sub.description}
              </p>
            )}
            <div className="mt-6">
              <Link
                href={`/${params.pilar}`}
                className="inline-flex items-center gap-2 text-coastal-gold hover:text-coastal-gold/80 transition-colors text-sm font-medium"
              >
                ← Wszystkie tematy: {sub.pilarTitle}
              </Link>
            </div>
          </div>

          {/* Articles */}
          <section>
            <h2 className="text-2xl font-heading font-normal tracking-heading uppercase mb-6">
              Artykuły ({articles?.length || 0})
            </h2>

            {!articles || articles.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg mb-2">Artykuły pojawią się tutaj wkrótce.</p>
                <Link href={`/${params.pilar}`} className="text-coastal-gold hover:underline">
                  Wróć do {sub.pilarTitle}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {articles.map((article: any) => (
                  <article
                    key={article._id}
                    className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-full h-40 bg-gradient-to-br from-secondary/15 via-primary/8 to-secondary/10 flex items-center justify-center text-5xl">
                      {icon}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                          {sub.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{article.readTime} min</span>
                      </div>
                      <Link href={`/${params.pilar}/${params.subcategory}/${article.slug.current}`}>
                        <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2 tracking-heading group-hover:text-coastal-gold transition-colors duration-300">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                        </span>
                        <Link
                          href={`/${params.pilar}/${params.subcategory}/${article.slug.current}`}
                          className="text-coastal-gold hover:text-coastal-gold/80 transition-colors duration-300 text-sm font-medium"
                        >
                          Czytaj →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Disclaimer */}
          <div className="mt-14 pt-8 border-t border-border/40 text-center">
            <p className="text-xs font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
              Treści mają charakter edukacyjny i nie zastępują porady lekarskiej. Przed wdrożeniem protokołów skonsultuj się ze specjalistą.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
