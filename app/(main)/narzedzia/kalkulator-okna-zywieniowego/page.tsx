import type { Metadata } from 'next'
import Link from 'next/link'
import IFCalculator from './IFCalculator'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Kalkulator Okna Żywieniowego IF – post przerywany dla kobiet | BioHackMama',
  description: 'Oblicz swoje okno żywieniowe dla postu przerywanego (IF). Protokoły 16:8, 14:10, 12:12 dopasowane do kobiecego metabolizmu i rytmu dnia.',
  alternates: { canonical: `${BASE_URL}/narzedzia/kalkulator-okna-zywieniowego` },
  openGraph: {
    title: 'Kalkulator Okna Żywieniowego IF | BioHackMama',
    description: 'Post przerywany dla kobiet. Oblicz godziny jedzenia i postu dopasowane do twojego rytmu dnia.',
    url: `${BASE_URL}/narzedzia/kalkulator-okna-zywieniowego`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

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
      <main className="pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="container max-w-3xl">

          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground flex-wrap">
              <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li><Link href="/narzedzia" className="hover:text-coastal-gold transition-colors">Narzędzia</Link></li>
              <li>/</li>
              <li className="text-coastal-slate font-medium">Kalkulator Okna Żywieniowego</li>
            </ol>
          </nav>

          <div className="mb-10">
            <div className="text-5xl mb-4">⏰</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading uppercase mb-4">
              Kalkulator Okna Żywieniowego
            </h1>
            <p className="text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
              Zaplanuj okno żywieniowe dla postu przerywanego (IF). Wybierz protokół
              i dowiedz się, kiedy zacząć i skończyć jedzenie.
            </p>
          </div>

          <IFCalculator />

          <section className="mt-14 space-y-6">
            <h2 className="text-2xl font-heading font-normal tracking-heading uppercase">
              Post przerywany a kobiecy cykl
            </h2>
            <div className="space-y-4">
              <p className="font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.85)' }}>
                Post przerywany działa inaczej u kobiet niż u mężczyzn. Twój organizm
                jest wrażliwy na sygnały niedoboru kalorii – zbyt długi post może
                zaburzyć oś HPG (podwzgórze-przysadka-gonady) i wpłynąć na cykl miesiączkowy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { phase: 'Faza folikularna', days: 'Dni 1-14', note: 'Lepiej tolerojesz dłuższy post. Protokół 16:8 jest bezpieczny.', color: 'border-rose-200 bg-rose-50/50' },
                  { phase: 'Owulacja', days: 'Dzień ~14', note: 'Zwiększone zapotrzebowanie kaloryczne. Skróć okno postu do 12h.', color: 'border-amber-200 bg-amber-50/50' },
                  { phase: 'Faza lutealna', days: 'Dni 15-28', note: 'Głód wzrasta. Protokół 12:12 lub 14:10 jest lepszy dla hormonów.', color: 'border-indigo-200 bg-indigo-50/50' },
                ].map(({ phase, days, note, color }) => (
                  <div key={phase} className={`p-4 rounded-2xl border ${color}`}>
                    <div className="font-semibold text-sm text-coastal-slate mb-1">{phase}</div>
                    <div className="text-xs text-muted-foreground mb-2">{days}</div>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>{note}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-secondary/8 border border-border/40 rounded-2xl">
                <p className="text-sm font-medium text-coastal-ocean mb-2">Ważne dla kobiet:</p>
                <p className="text-sm font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                  Jeśli masz nieregularne cykle, problemy z tarczycą, PCOS lub stres – zacznij
                  od protokołu 12:12 i obserwuj swoje ciało przez 4-6 tygodni zanim wydłużysz post.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-12 pt-6 border-t border-border/40">
            <p className="text-xs font-light leading-relaxed text-center" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
              Kalkulator ma charakter informacyjny. Post przerywany nie jest odpowiedni dla wszystkich.
              Przed wdrożeniem skonsultuj się z lekarzem, szczególnie jeśli masz problemy hormonalne lub tarczycę.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
