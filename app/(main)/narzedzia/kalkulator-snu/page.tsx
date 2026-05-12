import type { Metadata } from 'next'
import Link from 'next/link'
import SleepCalculator from './SleepCalculator'
import PageHeader from '@/components/lab-rose/PageHeader'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Kalkulator Snu, idealna godzina zasypiania | BioHackMama',
  description:
    'Oblicz idealną godzinę zasypiania lub budzenia na podstawie 90-minutowych cykli snu. Wstawaj wypoczęta, nie zmęczona.',
  alternates: { canonical: `${BASE_URL}/narzedzia/kalkulator-snu` },
  openGraph: {
    title: 'Kalkulator Snu, idealna godzina zasypiania | BioHackMama',
    description:
      'Oblicz idealne godziny snu oparte na 90-minutowych cyklach REM. Wstawaj wypoczęta.',
    url: `${BASE_URL}/narzedzia/kalkulator-snu`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

const FAQ = [
  {
    q: 'Ile trwa jeden cykl snu?',
    a: 'Jeden pełny cykl snu trwa średnio 90 minut i składa się z faz NREM (1-3) oraz fazy REM. W ciągu nocy przechodzimy przez 4-6 takich cykli.',
  },
  {
    q: 'Dlaczego budzę się zmęczona mimo 8 godzin snu?',
    a: 'Możesz budzić się w środku cyklu snu, w głębokiej fazie NREM lub REM. Wstawanie na końcu pełnego cyklu (wielokrotność 90 minut) sprawia, że czujesz się bardziej wypoczęta.',
  },
  {
    q: 'Ile cykli snu potrzebuje kobieta?',
    a: 'Większość dorosłych potrzebuje 5-6 pełnych cykli snu (7,5-9 godzin). Kobiety mogą potrzebować nieco więcej snu w fazie lutealnej cyklu miesiączkowego.',
  },
]

export default function KalkulatorSnuPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Narzędzia', item: `${BASE_URL}/narzedzia` },
      { '@type': 'ListItem', position: 3, name: 'Kalkulator Snu', item: `${BASE_URL}/narzedzia/kalkulator-snu` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Narzędzie · 01 · Kalkulator"
          meta="~ 1 MIN · CYKLE 90MIN"
          title={
            <>
              Kalkulator{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                snu
              </span>
              . Wstawaj wypoczęta.
            </>
          }
          description="Oblicz idealną godzinę zasypiania lub budzenia opartą na 90-minutowych cyklach. Wstawaj w lekkiej fazie snu, nie z głębokiego NREM."
        />

        <section style={{ padding: '0 0 clamp(4rem, 8vw, 7rem)' }}>
          <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol
                className="lr-mono flex items-center gap-2 flex-wrap"
                style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
              >
                <li><Link href="/" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>HOME</Link></li>
                <li>/</li>
                <li><Link href="/narzedzia" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>NARZĘDZIA</Link></li>
                <li>/</li>
                <li style={{ color: 'var(--lr-rose)' }}>KALKULATOR SNU</li>
              </ol>
            </nav>

            <SleepCalculator />

            {/* Educational */}
            <section className="mt-14">
              <span className="lr-eyebrow">Dlaczego 90 minut</span>
              <h2 className="mt-6 mb-6">
                Każdy cykl to{' '}
                <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                  inna faza snu.
                </span>
              </h2>
              <p>
                Sen dzieli się na cykle trwające około 90 minut każdy. Każdy cykl składa się z faz
                lekkiego snu (N1, N2), głębokiego snu wolnofalowego (N3) oraz fazy REM, w której
                konsolidujemy pamięć i przetwarzamy emocje.
              </p>
              <p>
                Budzenie się na końcu cyklu, gdy jesteś w lekkiej fazie N1 lub N2, sprawia że
                czujesz się odświeżona i gotowa do działania. Budzenie w środku głębokiej fazy N3
                powoduje tzw. <strong style={{ color: 'var(--lr-ink)' }}>inercję senną</strong> czyli uczucie ciężkości i dezorientacji.
              </p>
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  border: '1px solid var(--lr-rule)',
                  background: 'var(--lr-surface)',
                  borderLeft: '3px solid var(--lr-rose)',
                }}
              >
                <span className="lr-eyebrow">Wskazówka dla kobiet</span>
                <p style={{ marginTop: '0.75rem', fontSize: '0.9375rem' }}>
                  W fazie lutealnej (po owulacji) potrzebujesz zwykle 30-60 minut więcej snu. Twój
                  metabolizm przyspiesza, temperatura ciała rośnie i regeneracja trwa dłużej.
                </p>
              </div>
            </section>

            {/* FAQ */}
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
                Wyniki kalkulatora są orientacyjne. Indywidualne potrzeby snu mogą się różnić.
                W razie problemów ze snem skonsultuj się z lekarzem lub specjalistą.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
