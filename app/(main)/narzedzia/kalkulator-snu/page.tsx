import type { Metadata } from 'next'
import Link from 'next/link'
import SleepCalculator from './SleepCalculator'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Kalkulator Snu – idealna godzina zasypiania oparta na cyklach REM | BioHackMama',
  description: 'Oblicz idealną godzinę zasypiania lub budzenia na podstawie 90-minutowych cyklów snu. Wstawaj wypoczęta, nie zmęczona. Darmowy kalkulator snu.',
  alternates: { canonical: `${BASE_URL}/narzedzia/kalkulator-snu` },
  openGraph: {
    title: 'Kalkulator Snu – idealna godzina zasypiania | BioHackMama',
    description: 'Oblicz idealne godziny snu oparte na 90-minutowych cyklach REM. Wstawaj wypoczęta.',
    url: `${BASE_URL}/narzedzia/kalkulator-snu`,
    siteName: 'BioHackMama',
    type: 'website',
  },
}

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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ile trwa jeden cykl snu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jeden pełny cykl snu trwa średnio 90 minut i składa się z faz NREM (1-3) oraz fazy REM. W ciągu nocy przechodzimy przez 4-6 takich cykli.',
        },
      },
      {
        '@type': 'Question',
        name: 'Dlaczego budzę się zmęczona mimo 8 godzin snu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Możesz budzić się w środku cyklu snu – w głębokiej fazie NREM lub REM. Wstawanie na końcu pełnego cyklu (wielokrotność 90 minut) sprawia, że czujesz się bardziej wypoczęta.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ile cykli snu potrzebuje kobieta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Większość dorosłych potrzebuje 5-6 pełnych cykli snu (7,5-9 godzin). Kobiety mogą potrzebować nieco więcej snu w fazie lutealnej cyklu miesiączkowego.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="container max-w-3xl">

          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground flex-wrap">
              <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
              <li>/</li>
              <li><Link href="/narzedzia" className="hover:text-coastal-gold transition-colors">Narzędzia</Link></li>
              <li>/</li>
              <li className="text-coastal-slate font-medium">Kalkulator Snu</li>
            </ol>
          </nav>

          <div className="mb-10">
            <div className="text-5xl mb-4">🌙</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading uppercase mb-4">
              Kalkulator Snu
            </h1>
            <p className="text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
              Oblicz idealną godzinę zasypiania lub budzenia opartą na 90-minutowych cyklach snu.
              Wstawaj w lekkiej fazie snu – nie z głębokiego NREM.
            </p>
          </div>

          <SleepCalculator />

          {/* Educational section */}
          <section className="mt-14 space-y-8">
            <h2 className="text-2xl font-heading font-normal tracking-heading uppercase">
              Dlaczego 90 minut?
            </h2>
            <div className="prose-coastal space-y-4">
              <p className="font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.85)' }}>
                Sen dzieli się na cykle trwające około 90 minut każdy. Każdy cykl składa się z faz
                lekkiego snu (N1, N2), głębokiego snu wolnofalowego (N3) oraz fazy REM,
                w której konsolidujemy pamięć i przetwarzamy emocje.
              </p>
              <p className="font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.85)' }}>
                Budzenie się na końcu cyklu – gdy jesteś w lekkiej fazie N1 lub N2 – sprawia,
                że czujesz się odświeżona i gotowa do działania. Budzenie w środku głębokiej
                fazy N3 powoduje tzw. <strong>inercję senną</strong> – uczucie ciężkości i dezorientacji.
              </p>
              <div className="p-5 bg-secondary/8 border border-border/40 rounded-2xl">
                <p className="text-sm font-medium text-coastal-ocean mb-2">Wskazówka dla kobiet:</p>
                <p className="text-sm font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                  W fazie lutealnej (po owulacji) potrzebujesz zwykle 30-60 minut więcej snu.
                  Twój metabolizm przyspiesza, temperatura ciała rośnie i regeneracja trwa dłużej.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-heading font-normal tracking-heading uppercase pt-4">
              FAQ
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: 'Ile trwa jeden cykl snu?',
                  a: 'Jeden pełny cykl snu trwa średnio 90 minut i składa się z faz NREM (1-3) oraz fazy REM. W ciągu nocy przechodzimy przez 4-6 takich cykli.',
                },
                {
                  q: 'Dlaczego budzę się zmęczona mimo 8 godzin snu?',
                  a: 'Możesz budzić się w środku cyklu snu – w głębokiej fazie NREM lub REM. Wstawanie na końcu pełnego cyklu (wielokrotność 90 minut) sprawia, że czujesz się bardziej wypoczęta.',
                },
                {
                  q: 'Ile cykli snu potrzebuje kobieta?',
                  a: 'Większość dorosłych potrzebuje 5-6 pełnych cykli snu (7,5-9 godzin). Kobiety mogą potrzebować nieco więcej snu w fazie lutealnej cyklu miesiączkowego.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="p-5 bg-card border border-border/60 rounded-2xl">
                  <h3 className="font-semibold mb-2 text-coastal-slate">{q}</h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12 pt-6 border-t border-border/40">
            <p className="text-xs font-light leading-relaxed text-center" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
              Wyniki kalkulatora są orientacyjne. Indywidualne potrzeby snu mogą się różnić.
              W przypadku problemów ze snem skonsultuj się z lekarzem lub specjalistą ds. snu.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
