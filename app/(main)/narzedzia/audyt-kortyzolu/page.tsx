import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/lab-rose/PageHeader'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Audyt Przeciążenia Kortyzolem | BioHackMama',
  description:
    'Sprawdź, czy Twoja oś HPA jest przeciążona. 8 pytań opartych na fizjologii stresu pomoże ocenić stan Twojego rytmu dobowego kortyzolu.',
  alternates: { canonical: `${BASE_URL}/narzedzia/audyt-kortyzolu` },
  openGraph: {
    title: 'Audyt Przeciążenia Kortyzolem | BioHackMama',
    description: 'Sprawdź stan swojej osi HPA w 8 pytaniach.',
    url: `${BASE_URL}/narzedzia/audyt-kortyzolu`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

export default function AudytKortyzolaPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Narzędzie · 04 · Audyt"
        meta="8 PYTAŃ · ~ 2 MIN"
        title={
          <>
            Czy twoja oś{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              HPA
            </span>{' '}
            jest przeciążona?
          </>
        }
        description="8 pytań opartych na fizjologii stresu. Dowiedz się, w jakim stanie jest Twój rytm dobowy kortyzolu i co naprawić najpierw."
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
              <li style={{ color: 'var(--lr-rose)' }}>AUDYT KORTYZOLU</li>
            </ol>
          </nav>

          <div
            className="lr-tool-panel"
            style={{ overflow: 'hidden' }}
          >
            <iframe
              src="/tools/kortyzol-quiz.html"
              title="Audyt Przeciążenia Kortyzolem"
              className="w-full border-0"
              style={{ height: '780px', background: 'var(--lr-bg)' }}
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
              Quiz ma charakter informacyjny i edukacyjny. Wyniki nie zastępują konsultacji
              lekarskiej ani diagnostyki hormonalnej.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
