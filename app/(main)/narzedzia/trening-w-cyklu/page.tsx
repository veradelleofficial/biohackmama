import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/lab-rose/PageHeader'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Trening w cyklu menstruacyjnym | BioHackMama',
  description:
    'Przesuń suwak na dzień swojego cyklu i dowiedz się, jaki trening będzie dziś optymalny: zgodnie z hormonami, nie wbrew nim.',
  alternates: { canonical: `${BASE_URL}/narzedzia/trening-w-cyklu` },
}

export default function TreningWCykluPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Narzędzia', item: `${BASE_URL}/narzedzia` },
      { '@type': 'ListItem', position: 3, name: 'Trening w cyklu', item: `${BASE_URL}/narzedzia/trening-w-cyklu` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Narzędzie · 05 · Tracker"
          meta="28 DNI · 4 FAZY"
          title={
            <>
              Trening{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                zgodnie z cyklem.
              </span>{' '}
              Nie wbrew niemu.
            </>
          }
          description="Przesuń suwak na dzień swojego cyklu i sprawdź jaka forma ruchu będzie dziś dla Twojego ciała optymalna. Siła w folikularnej, regeneracja w lutealnej."
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
                <li style={{ color: 'var(--lr-rose)' }}>TRENING W CYKLU</li>
              </ol>
            </nav>

            <div
              className="lr-tool-panel"
              style={{ overflow: 'hidden' }}
            >
              <iframe
                src="/tools/trening-cykl.html"
                title="Trening dopasowany do cyklu"
                className="w-full border-0"
                style={{ height: '820px', background: 'var(--lr-bg)' }}
              />
            </div>

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
                Narzędzie ma charakter informacyjny. Każdy organizm jest inny. Obserwuj swoje
                ciało i dostosuj intensywność do własnego samopoczucia.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
