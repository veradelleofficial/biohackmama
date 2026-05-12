import type { Metadata } from 'next'
import Link from 'next/link'
import { Moon, Clock, Flower2, Zap, Dumbbell, Baby } from 'lucide-react'
import PageHeader from '@/components/lab-rose/PageHeader'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Narzędzia biohackingu dla kobiet | BioHackMama',
  description:
    'Darmowe kalkulatory i narzędzia biohackingu: kalkulator snu oparty na cyklach REM, kalkulator okna żywieniowego IF, tracker suplementacji dopasowanej do cyklu.',
  alternates: { canonical: `${BASE_URL}/narzedzia` },
  openGraph: {
    title: 'Darmowe narzędzia biohackingu dla kobiet | BioHackMama',
    description:
      'Kalkulator snu, kalkulator IF, tracker cyklu i suplementacji. Bezpłatne narzędzia biohackingu dopasowane do kobiecego ciała.',
    url: `${BASE_URL}/narzedzia`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

const tools = [
  {
    slug: 'kalkulator-snu',
    Icon: Moon,
    accent: 'rose' as const,
    title: 'Kalkulator Snu',
    description:
      'Oblicz idealne godziny zasypiania i budzenia oparte na 90-minutowych cyklach snu. Wstawaj wypoczęta, nie zmęczona.',
    tags: ['Sen', 'Cykle REM', 'Regeneracja'],
  },
  {
    slug: 'kalkulator-okna-zywieniowego',
    Icon: Clock,
    accent: 'lime' as const,
    title: 'Kalkulator Okna Żywieniowego',
    description:
      'Zaplanuj okno żywieniowe dla postu przerywanego (IF). Dobierz protokół 16:8, 14:10 lub 12:12 dopasowany do twojego rytmu dnia.',
    tags: ['Post przerywany', 'IF', 'Metabolizm'],
  },
  {
    slug: 'tracker-cyklu-suplementacja',
    Icon: Flower2,
    accent: 'rose' as const,
    title: 'Tracker Cyklu i Suplementacji',
    description:
      'Dowiedz się, jakie suplementy wspierają twój organizm w każdej fazie cyklu menstruacyjnego. Personalizowane protokoły dla każdego etapu.',
    tags: ['Cykl', 'Suplementacja', 'Hormony'],
  },
  {
    slug: 'audyt-kortyzolu',
    Icon: Zap,
    accent: 'lime' as const,
    title: 'Audyt Kortyzolu',
    description:
      'Sprawdź, czy Twoja oś HPA jest przeciążona. 8 pytań opartych na fizjologii stresu oceni stan Twojego rytmu dobowego kortyzolu.',
    tags: ['Kortyzol', 'Stres', 'Nadnercza'],
  },
  {
    slug: 'trening-w-cyklu',
    Icon: Dumbbell,
    accent: 'rose' as const,
    title: 'Trening w cyklu',
    description:
      'Przesuń suwak na dzień swojego cyklu i dowiedz się, jaki trening będzie dziś dla Ciebie optymalny: zgodnie z hormonami, nie wbrew nim.',
    tags: ['Trening', 'Cykl', 'Hormony'],
  },
  {
    slug: 'audyt-sypialni-dziecka',
    Icon: Baby,
    accent: 'lime' as const,
    title: 'Audyt Sypialni Dziecka',
    description:
      'Sprawdź czy sypialnia twojego dziecka wspiera czysty sen i regenerację. 8 pytań o temperaturze, świetle, materacu, kosmetykach, EMF i wentylacji.',
    tags: ['Dzieci', 'Non-toxic', 'Sen'],
  },
]

export default function NarzedziaPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Narzędzia', item: `${BASE_URL}/narzedzia` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Narzędzia · GRATIS"
          meta={`${tools.length} KALKULATORÓW`}
          title={
            <>
              Darmowe{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                kalkulatory
              </span>{' '}
              i trackery zdrowia.
            </>
          }
          description="Jakość snu, post przerywany, cykl menstruacyjny, kortyzol, trening. Plus narzędzia dla rodziców. Każde narzędzie oparte na fizjologii i konkretnych badaniach, nie na marketingu."
        />

        <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(5rem, 9vw, 8rem)' }}>
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: 'var(--lr-rule)' }}
            >
              {tools.map((tool, i) => {
                const Icon = tool.Icon
                const accentColor = tool.accent === 'lime' ? 'var(--lr-accent)' : 'var(--lr-rose)'
                return (
                  <Link
                    key={tool.slug}
                    href={`/narzedzia/${tool.slug}`}
                    className="group"
                    style={{
                      background: 'var(--lr-bg)',
                      padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      transition: 'background-color 240ms var(--ease-out-strong)',
                    }}
                  >
                    {/* Number + icon row */}
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className="lr-mono"
                        style={{
                          fontSize: '0.625rem',
                          color: 'var(--lr-ink-dim)',
                          letterSpacing: '0.22em',
                        }}
                      >
                        // {String(i + 1).padStart(2, '0')}
                      </span>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          border: '1px solid var(--lr-rule-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'border-color 240ms var(--ease-out-strong)',
                        }}
                        className="group-hover:border-[currentColor]"
                      >
                        <Icon size={20} strokeWidth={1.5} style={{ color: accentColor }} />
                      </div>
                    </div>

                    {/* Title */}
                    <h2
                      className="group-hover:text-[#E8AEBD] transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
                        lineHeight: 1.1,
                        color: 'var(--lr-ink)',
                        marginBottom: '1rem',
                        minHeight: '2.4em',
                        fontWeight: 400,
                      }}
                    >
                      {tool.title}
                    </h2>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--lr-ink-soft)',
                        lineHeight: 1.6,
                        flexGrow: 1,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {tool.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-6">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="lr-mono"
                          style={{
                            fontSize: '0.5625rem',
                            color: 'var(--lr-ink-dim)',
                            letterSpacing: '0.18em',
                          }}
                        >
                          · {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div
                      style={{
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--lr-rule)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        className="lr-mono"
                        style={{
                          fontSize: '0.6875rem',
                          color: accentColor,
                          letterSpacing: '0.22em',
                          fontWeight: 600,
                        }}
                      >
                        OTWÓRZ NARZĘDZIE
                      </span>
                      <span
                        style={{
                          color: accentColor,
                          fontSize: '1rem',
                          transition: 'transform 240ms var(--ease-out-strong)',
                          display: 'inline-block',
                        }}
                        className="group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Disclaimer */}
            <div
              className="mt-14 pt-8 text-center"
              style={{ borderTop: '1px solid var(--lr-rule)' }}
            >
              <p
                className="lr-mono"
                style={{
                  color: 'var(--lr-ink-dim)',
                  fontSize: '0.625rem',
                  letterSpacing: '0.22em',
                  lineHeight: 1.8,
                  maxWidth: '60ch',
                  margin: '0 auto',
                }}
              >
                Narzędzia mają charakter informacyjny i edukacyjny. Wyniki kalkulatorów nie
                zastępują indywidualnej konsultacji ze specjalistą.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
