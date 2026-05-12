import type { Metadata } from 'next'
import Link from 'next/link'
import IFCalculator from './IFCalculator'
import PageHeader from '@/components/lab-rose/PageHeader'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Kalkulator Okna Żywieniowego (IF) | BioHackMama',
  description:
    'Zaplanuj okno żywieniowe dla postu przerywanego. Wybierz protokół 12:12, 14:10 lub 16:8 dopasowany do twojego rytmu i fazy cyklu.',
  alternates: { canonical: `${BASE_URL}/narzedzia/kalkulator-okna-zywieniowego` },
}

const FAQ = [
  {
    q: 'Który protokół IF jest najlepszy dla kobiet?',
    a: '14:10 to balans między korzyściami metabolicznymi a bezpieczeństwem hormonalnym. 16:8 tylko w fazie folikularnej (do owulacji). 12:12 w fazie lutealnej i przy stresie.',
  },
  {
    q: 'Czy IF jest bezpieczny w ciąży i karmieniu?',
    a: 'Nie. W ciąży, karmieniu piersią i przy zaburzeniach hormonalnych post przerywany jest niewskazany. Skonsultuj się z lekarzem przed wprowadzeniem.',
  },
  {
    q: 'Co mogę pić w trakcie postu?',
    a: 'Woda, herbata bez cukru, czarna kawa. Wszystko bez kalorii. Mleko roślinne, śmietanka, miód czy słodzik łamią post.',
  },
]

export default function KalkulatorOknaPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Narzędzia', item: `${BASE_URL}/narzedzia` },
      { '@type': 'ListItem', position: 3, name: 'Kalkulator Okna Żywieniowego', item: `${BASE_URL}/narzedzia/kalkulator-okna-zywieniowego` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Narzędzie · 02 · Kalkulator"
          meta="IF · 12:12 / 14:10 / 16:8"
          title={
            <>
              Kalkulator okna{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                żywieniowego.
              </span>{' '}
              Post przerywany.
            </>
          }
          description="Wybierz protokół postu przerywanego (12:12, 14:10 lub 16:8) dopasowany do twojego rytmu dnia i fazy cyklu hormonalnego. Zaplanuj realne okno jedzenia."
        />

        <section style={{ padding: '0 0 clamp(4rem, 8vw, 7rem)' }}>
          <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol
                className="lr-mono flex items-center gap-2 flex-wrap"
                style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
              >
                <li><Link href="/" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>HOME</Link></li>
                <li>/</li>
                <li><Link href="/narzedzia" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>NARZĘDZIA</Link></li>
                <li>/</li>
                <li style={{ color: 'var(--lr-rose)' }}>OKNO ŻYWIENIOWE</li>
              </ol>
            </nav>

            <IFCalculator />

            <section className="mt-14">
              <span className="lr-eyebrow">FAQ · 3 pytania</span>
              <h2 className="mt-6 mb-8">
                Najczęstsze{' '}
                <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                  pytania.
                </span>
              </h2>
              <div className="space-y-4">
                {FAQ.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--lr-surface)',
                      border: '1px solid var(--lr-rule)',
                      padding: '1.5rem',
                    }}
                  >
                    <div className="flex items-baseline gap-3 mb-3">
                      <span
                        className="lr-mono"
                        style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.22em' }}
                      >
                        Q.{String(i + 1).padStart(2, '0')}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-fraunces), serif',
                          fontSize: '1.125rem',
                          color: 'var(--lr-ink)',
                          fontWeight: 400,
                          flex: 1,
                          lineHeight: 1.25,
                        }}
                      >
                        {item.q}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.9375rem', margin: 0 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-14 pt-8 text-center" style={{ borderTop: '1px solid var(--lr-rule)' }}>
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
                Wyniki kalkulatora są orientacyjne. W ciąży, karmieniu piersią i przy zaburzeniach
                hormonalnych post przerywany jest niewskazany. Skonsultuj się z lekarzem.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
