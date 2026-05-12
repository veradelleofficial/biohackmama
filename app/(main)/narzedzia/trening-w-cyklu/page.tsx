import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Co ćwiczyć w swoim cyklu? – Wyszukiwarka treningów | BioHackMama',
  description: 'Dopasuj trening do fazy swojego cyklu menstruacyjnego. Przesuń suwak na dzień cyklu i dowiedz się, jakie ćwiczenia będą dziś dla Ciebie optymalne.',
  alternates: { canonical: `${BASE_URL}/narzedzia/trening-w-cyklu` },
  openGraph: {
    title: 'Co ćwiczyć w swoim cyklu? – Wyszukiwarka treningów',
    description: 'Dopasuj trening do dnia cyklu. Faza folikularna, owulacja, lutealna – każda ma swoje optimum treningowe.',
    url: `${BASE_URL}/narzedzia/trening-w-cyklu`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

export default function TreningWCykluPage() {
  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container">

        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-muted-foreground flex-wrap">
            <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
            <li>/</li>
            <li><Link href="/narzedzia" className="hover:text-coastal-gold transition-colors">Narzędzia</Link></li>
            <li>/</li>
            <li className="text-coastal-slate font-medium">Trening w cyklu</li>
          </ol>
        </nav>

        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] tracking-widest font-medium mb-4 border border-primary/20 uppercase">
            Biohacking · Cykl · Trening
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal mb-4 tracking-heading">
            Co ćwiczyć w moim cyklu?
          </h1>
          <p className="text-base md:text-lg font-light max-w-2xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Przesuń suwak na dzień swojego cyklu i dowiedz się, jaki trening
            będzie dla Ciebie dziś optymalny — zgodnie z hormonami, nie wbrew nim.
          </p>
        </div>

        <div className="max-w-[640px] mx-auto">
          <iframe
            src="/tools/trening-cykl.html"
            title="Trening dopasowany do cyklu"
            className="w-full border-0 rounded-3xl"
            style={{ height: '820px' }}
          />
        </div>

        <div className="mt-14 pt-8 border-t border-border/40 text-center">
          <p className="text-xs font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Narzędzie ma charakter informacyjny. Każdy organizm jest inny — obserwuj swoje ciało i dostosowuj intensywność do własnego samopoczucia. Nie zastępuje konsultacji ze specjalistą.
          </p>
        </div>

      </div>
    </main>
  )
}
