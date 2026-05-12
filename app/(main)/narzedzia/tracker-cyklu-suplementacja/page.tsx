import type { Metadata } from 'next'
import Link from 'next/link'
import CycleTracker from './CycleTracker'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Tracker Cyklu i Suplementacji – co brać w każdej fazie cyklu | BioHackMama',
  description: 'Dowiedz się, jakie suplementy wspierają twój organizm w każdej fazie cyklu menstruacyjnego. Spersonalizowane protokoły dla fazy folikularnej, owulacji i fazy lutealnej.',
  alternates: { canonical: `${BASE_URL}/narzedzia/tracker-cyklu-suplementacja` },
  openGraph: {
    title: 'Tracker Cyklu i Suplementacji | BioHackMama',
    description: 'Suplementy dopasowane do fazy cyklu. Dowiedz się, co brać i kiedy dla równowagi hormonalnej.',
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
      { '@type': 'ListItem', position: 3, name: 'Tracker Cyklu i Suplementacji', item: `${BASE_URL}/narzedzia/tracker-cyklu-suplementacja` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="container max-w-3xl">

          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground flex-wrap">
              <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li><Link href="/narzedzia" className="hover:text-coastal-gold transition-colors">Narzędzia</Link></li>
              <li>/</li>
              <li className="text-coastal-slate font-medium">Tracker Cyklu i Suplementacji</li>
            </ol>
          </nav>

          <div className="mb-10">
            <div className="text-5xl mb-4">🌸</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading uppercase mb-4">
              Tracker Cyklu i Suplementacji
            </h1>
            <p className="text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
              Podaj dzień cyklu i dowiedz się, jakie suplementy najlepiej wspierają
              twój organizm teraz. Protokoły oparte na infradian rhythm.
            </p>
          </div>

          <CycleTracker />

          <section className="mt-14 space-y-6">
            <h2 className="text-2xl font-heading font-normal tracking-heading uppercase">
              Czym jest infradian rhythm?
            </h2>
            <div className="space-y-4">
              <p className="font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.85)' }}>
                Kobiety mają dwa rytmy biologiczne: dobowy (circadian) i miesięczny (infradian).
                Infradian rhythm trwa 24-35 dni i reguluje cykl menstruacyjny, gospodarkę
                hormonalną, poziom energii, metabolizm i nastrój.
              </p>
              <p className="font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.85)' }}>
                W każdej fazie cyklu twoje ciało ma inne potrzeby żywieniowe i suplementacyjne.
                Dostosowanie diety i suplementacji do faz cyklu (cycle syncing) może poprawić
                równowagę hormonalną, zmniejszyć PMS i zwiększyć poziom energii.
              </p>
              <div className="p-5 bg-secondary/8 border border-border/40 rounded-2xl">
                <p className="text-sm font-medium text-coastal-ocean mb-2">Cycle syncing:</p>
                <p className="text-sm font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                  Koncepcja cycle syncing, spopularyzowana przez Alise Vitti, zakłada synchronizację
                  diety, ćwiczeń i stylu życia z fazami cyklu. Tracker suplementacji to prosty
                  pierwszy krok w kierunku tej praktyki.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-12 pt-6 border-t border-border/40">
            <p className="text-xs font-light leading-relaxed text-center" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
              Informacje mają charakter edukacyjny i nie stanowią porady medycznej. Przed wdrożeniem
              suplementacji skonsultuj się z lekarzem lub dietetykiem klinicznym.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
