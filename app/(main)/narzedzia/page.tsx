import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Narzędzia biohackingu dla kobiet – kalkulatory i trackery | BioHackMama',
  description: 'Darmowe kalkulatory i narzędzia biohackingu: kalkulator snu oparty na cyklach REM, kalkulator okna żywieniowego IF, tracker suplementacji dopasowanej do cyklu.',
  alternates: { canonical: `${BASE_URL}/narzedzia` },
  openGraph: {
    title: 'Darmowe narzędzia biohackingu – kalkulatory dla kobiet | BioHackMama',
    description: 'Kalkulator snu, kalkulator IF, tracker cyklu i suplementacji. Bezpłatne narzędzia biohackingu dopasowane do kobiecego ciała.',
    url: `${BASE_URL}/narzedzia`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

const tools = [
  {
    slug: 'kalkulator-snu',
    icon: '🌙',
    title: 'Kalkulator Snu',
    description: 'Oblicz idealne godziny zasypiania i budzenia oparte na 90-minutowych cyklach snu. Wstawaj wypoczęta, nie zmęczona.',
    tags: ['Sen', 'Cykle REM', 'Regeneracja'],
    color: 'from-indigo-500/10 to-blue-500/5',
  },
  {
    slug: 'kalkulator-okna-zywieniowego',
    icon: '⏰',
    title: 'Kalkulator Okna Żywieniowego',
    description: 'Zaplanuj okno żywieniowe dla postu przerywanego (IF). Dobierz protokół 16:8, 14:10 lub 12:12 dopasowany do twojego rytmu dnia.',
    tags: ['Post przerywany', 'IF', 'Metabolizm'],
    color: 'from-emerald-500/10 to-green-500/5',
  },
  {
    slug: 'tracker-cyklu-suplementacja',
    icon: '🌸',
    title: 'Tracker Cyklu i Suplementacji',
    description: 'Dowiedz się, jakie suplementy wspierają twój organizm w każdej fazie cyklu menstruacyjnego. Personalizowane protokoły dla każdego etapu.',
    tags: ['Cykl', 'Suplementacja', 'Hormony'],
    color: 'from-rose-500/10 to-pink-500/5',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="container">

          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li className="text-coastal-slate font-medium">Narzędzia</li>
            </ol>
          </nav>

          <div className="text-center mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-normal mb-4 tracking-heading uppercase">
              Narzędzia
            </h1>
            <p className="text-lg font-light max-w-2xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
              Darmowe kalkulatory i trackery biohackingu dopasowane do kobiecego ciała.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/narzedzia/${tool.slug}`}
                className="group"
              >
                <div className={`h-full p-8 rounded-3xl bg-gradient-to-br ${tool.color} border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500`}>
                  <div className="text-5xl mb-5">{tool.icon}</div>
                  <h2 className="text-2xl font-heading font-semibold tracking-heading mb-3 group-hover:text-coastal-gold transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-sm font-light leading-relaxed mb-5" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 bg-white/60 text-coastal-ocean rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-coastal-gold font-medium text-sm group-hover:gap-3 transition-all">
                    Otwórz narzędzie →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-border/40 text-center">
            <p className="text-xs font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
              Narzędzia mają charakter informacyjny i edukacyjny. Wyniki kalkulatorów nie zastępują indywidualnej konsultacji ze specjalistą.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
