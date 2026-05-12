import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Audyt Przeciążenia Kortyzolem – Quiz hormonalny | BioHackMama',
  description: 'Sprawdź, czy Twoja oś HPA jest przeciążona. 8 pytań opartych na fizjologii stresu, które pomogą Ci ocenić stan Twojego rytmu dobowego kortyzolu.',
  alternates: { canonical: `${BASE_URL}/narzedzia/audyt-kortyzolu` },
  openGraph: {
    title: 'Audyt Przeciążenia Kortyzolem – Quiz hormonalny',
    description: 'Sprawdź stan swojej osi HPA w 8 pytaniach. Dowiedz się, czy Twój kortyzol działa prawidłowo.',
    url: `${BASE_URL}/narzedzia/audyt-kortyzolu`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

export default function AudytKortyzolaPage() {
  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container">

        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground flex-wrap">
            <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
            <li>/</li>
            <li><Link href="/narzedzia" className="hover:text-coastal-gold transition-colors">Narzędzia</Link></li>
            <li>/</li>
            <li className="text-coastal-slate font-medium">Audyt Kortyzolu</li>
          </ol>
        </nav>

        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] tracking-widest font-medium mb-4 border border-primary/20 uppercase">
            Biohacking · Hormony · Stres
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal mb-4 tracking-heading">
            Audyt Przeciążenia Kortyzolem
          </h1>
          <p className="text-base md:text-lg font-light max-w-2xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            8 pytań opartych na fizjologii stresu. Dowiedz się, w jakim stanie jest Twoja oś HPA
            i rytm dobowy kortyzolu.
          </p>
        </div>

        <div className="max-w-[640px] mx-auto">
          <iframe
            src="/tools/kortyzol-quiz.html"
            title="Audyt Przeciążenia Kortyzolem"
            className="w-full border-0 rounded-3xl"
            style={{ height: '780px' }}
          />
        </div>

        <div className="mt-14 pt-8 border-t border-border/40 text-center">
          <p className="text-xs font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Quiz ma charakter wyłącznie informacyjny i edukacyjny. Wyniki nie zastępują konsultacji lekarskiej ani diagnostyki hormonalnej.
          </p>
        </div>

      </div>
    </main>
  )
}
