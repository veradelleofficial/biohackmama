import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPilarBySlug, getSubcategoriesByPilar, getArticlesByPilar } from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://biohackmama.pl'

const PILARS_CONFIG: Record<string, { icon: string; color: string }> = {
  'biohacking-kobiet': { icon: '🧬', color: 'from-rose-500/10 to-pink-500/5' },
  'sen-regeneracja': { icon: '🌙', color: 'from-indigo-500/10 to-blue-500/5' },
  'zywienie-metabolizm': { icon: '🥗', color: 'from-emerald-500/10 to-green-500/5' },
  'wydajnosc-umyslu': { icon: '🧠', color: 'from-violet-500/10 to-purple-500/5' },
  'longevity': { icon: '⚡', color: 'from-amber-500/10 to-yellow-500/5' },
}

const KNOWN_PILARS = Object.keys(PILARS_CONFIG)

interface PageProps {
  params: { pilar: string }
}

export async function generateStaticParams() {
  return KNOWN_PILARS.map((pilar) => ({ pilar }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pilar = await getPilarBySlug(params.pilar)
  if (!pilar) return { title: 'Nie znaleziono', robots: { index: false, follow: false } }

  const title = pilar.metaTitle || `${pilar.title} – BioHackMama`
  const description = pilar.metaDescription || pilar.description || ''

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${params.pilar}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${params.pilar}`,
      type: 'website',
      siteName: 'BioHackMama',
    },
  }
}

export default async function PilarPage({ params }: PageProps) {
  if (!KNOWN_PILARS.includes(params.pilar)) notFound()

  const [pilar, subcategories, articles] = await Promise.all([
    getPilarBySlug(params.pilar),
    getSubcategoriesByPilar(params.pilar),
    getArticlesByPilar(params.pilar),
  ])

  if (!pilar) notFound()

  const config = PILARS_CONFIG[params.pilar]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: pilar.title, item: `${BASE_URL}/${params.pilar}` },
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
              <li className="text-coastal-slate font-medium">{pilar.title}</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className={`mb-14 p-8 md:p-12 rounded-3xl bg-gradient-to-br ${config.color} border border-border/40`}>
            <div className="text-5xl mb-4">{config.icon}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading uppercase mb-4">
              {pilar.title}
            </h1>
            {pilar.description && (
              <p className="text-lg font-light max-w-2xl" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                {pilar.description}
              </p>
            )}
          </div>

          {/* Subcategories */}
          {subcategories && subcategories.length > 0 && (
            <section className="mb-14">
              <h2 className="text-2xl font-heading font-normal tracking-heading uppercase mb-6">
                Tematy
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subcategories.map((sub: any) => (
                  <Link
                    key={sub._id}
                    href={`/${params.pilar}/${sub.slug.current}`}
                    className="group p-6 bg-card rounded-2xl border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-coastal-gold transition-colors">
                      {sub.title}
                    </h3>
                    {sub.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{sub.description}</p>
                    )}
                    <span className="inline-block mt-3 text-coastal-gold text-sm font-medium">
                      Zobacz artykuły →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Latest articles */}
          <section>
            <h2 className="text-2xl font-heading font-normal tracking-heading uppercase mb-6">
              Ostatnie artykuły
            </h2>

            {!articles || articles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Artykuły pojawią się tutaj wkrótce.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {articles.map((article: any) => (
                  <article
                    key={article._id}
                    className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-full h-40 bg-gradient-to-br from-secondary/15 via-primary/8 to-secondary/10 flex items-center justify-center text-5xl">
                      {config.icon}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Link
                          href={`/${params.pilar}/${article.categorySlug}`}
                          className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium hover:bg-secondary/25 transition-colors"
                        >
                          {article.category}
                        </Link>
                        <span className="text-xs text-muted-foreground">{article.readTime} min</span>
                      </div>
                      <Link href={`/blog/${article.slug.current}`}>
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
                          href={`/blog/${article.slug.current}`}
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
