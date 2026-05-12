import type { Metadata } from 'next'
import Link from 'next/link'
import CycleTracker from './CycleTracker'
import PageHeader from '@/components/lab-rose/PageHeader'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Tracker Cyklu i Suplementacji | BioHackMama',
  description:
    'Co brać w każdej fazie cyklu. Spersonalizowane protokoły suplementacyjne dla menstruacji, fazy folikularnej, owulacji i fazy lutealnej.',
  alternates: { canonical: `${BASE_URL}/narzedzia/tracker-cyklu-suplementacja` },
  openGraph: {
    title: 'Tracker Cyklu i Suplementacji | BioHackMama',
    description: 'Suplementy dopasowane do fazy cyklu, dla równowagi hormonalnej.',
    url: `${BASE_URL}/narzedzia/tracker-cyklu-suplementacja`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

export default function TrackerCykluPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Narzędzia', item: `${BASE_URL}/narzedzia` },
      { '@type': 'ListItem', position: 3, name: 'Tracker Cyklu', item: `${BASE_URL}/narzedzia/tracker-cyklu-suplementacja` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Narzędzie · 03 · Tracker"
          meta="28 DNI · 4 FAZY"
          title={
            <>
              Suplementacja w{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                fazach cyklu.
              </span>{' '}
              Personalizowana.
            </>
          }
          description="Przesuń suwak na dzień cyklu i zobacz jakie suplementy wspierają twój organizm w każdej fazie. Menstruacja, folikularna, owulacja, lutealna, każda potrzebuje czegoś innego."
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
                <li style={{ color: 'var(--lr-rose)' }}>TRACKER CYKLU</li>
              </ol>
            </nav>

            <CycleTracker />

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
                Protokoły suplementacyjne są orientacyjne. Dawkowanie dostosuj do masy ciała
                i indywidualnych potrzeb. Sprawdzaj interakcje z lekami i skonsultuj się z lekarzem.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
