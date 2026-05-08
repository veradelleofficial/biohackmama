import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Podgląd palety – Earth Wise',
  robots: { index: false, follow: false },
}

const PALETTE = {
  bg: '#F2EBDD',
  bgElevated: '#FBF7EE',
  bgCard: '#EDE4CF',
  heading: '#2D3A2D',
  body: '#3F4D3D',
  bodySoft: '#6B7A6A',
  primary: '#4F5E44',
  primaryHover: '#3F4D3D',
  primaryText: '#FBF7EE',
  accent: '#B89668',
  accentDeep: '#8B6F47',
  border: '#D9CFB8',
  borderSoft: '#E5DCC4',
} as const

function Swatch({ hex, name, role, light = false }: { hex: string; name: string; role: string; light?: boolean }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-2 border"
      style={{
        backgroundColor: hex,
        borderColor: PALETTE.border,
        color: light ? PALETTE.heading : '#FBF7EE',
      }}
    >
      <span className="font-mono text-xs uppercase tracking-widest opacity-70">{role}</span>
      <span className="font-medium text-base">{name}</span>
      <span className="font-mono text-sm opacity-90">{hex}</span>
    </div>
  )
}

export default function PaletaEarthPage() {
  return (
    <main
      className="min-h-screen pt-32 pb-24"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.body }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Intro */}
        <div className="mb-16">
          <span
            className="inline-block text-xs uppercase tracking-[0.25em] mb-4 font-mono"
            style={{ color: PALETTE.accentDeep }}
          >
            Propozycja palety · Inspiracja Arterra
          </span>
          <h1
            className="font-heading text-5xl md:text-6xl mb-6 leading-tight"
            style={{ color: PALETTE.heading, letterSpacing: '-0.02em' }}
          >
            Earth Wise dla BioHackMama
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed" style={{ color: PALETTE.body }}>
            Ciepły kremowy fundament, głęboka leśna zieleń jako tekst, oliwkowy CTA i taupe-klin
            akcentowy. Wszystkie pary kolor / tło spełniają WCAG AA dla czytelności.
          </p>
        </div>

        {/* Palette swatches */}
        <section className="mb-20">
          <h2 className="font-heading text-2xl mb-6" style={{ color: PALETTE.heading }}>
            Paleta
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Swatch hex={PALETTE.bg} name="Cream Linen" role="tło strony" light />
            <Swatch hex={PALETTE.bgElevated} name="Light Parchment" role="tło karty" light />
            <Swatch hex={PALETTE.heading} name="Forest Deep" role="nagłówki" />
            <Swatch hex={PALETTE.body} name="Olive Body" role="tekst" />
            <Swatch hex={PALETTE.primary} name="Sage Olive" role="CTA primary" />
            <Swatch hex={PALETTE.accent} name="Warm Taupe" role="akcent" light />
            <Swatch hex={PALETTE.accentDeep} name="Tobacco" role="akcent głęboki" />
            <Swatch hex={PALETTE.border} name="Sand" role="ramki" light />
          </div>
        </section>

        {/* Hero mock */}
        <section
          className="mb-20 rounded-3xl p-10 md:p-16 border"
          style={{ backgroundColor: PALETTE.bgElevated, borderColor: PALETTE.border }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: PALETTE.accentDeep }}
          >
            Przykład: Hero Section
          </span>
          <h2
            className="font-heading text-4xl md:text-5xl mb-5 leading-tight max-w-3xl"
            style={{ color: PALETTE.heading, letterSpacing: '-0.02em' }}
          >
            Biohacking dla kobiet, które słuchają swojego ciała
          </h2>
          <p className="text-lg mb-8 max-w-2xl" style={{ color: PALETTE.body }}>
            Naukowe protokoły dopasowane do twojego cyklu, hormonów i rytmu życia. Bez fitness
            kultu, bez nadludzkich planów.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase transition-colors"
              style={{
                backgroundColor: PALETTE.primary,
                color: PALETTE.primaryText,
              }}
            >
              Zobacz kursy
            </button>
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase border-2 transition-colors"
              style={{
                borderColor: PALETTE.heading,
                color: PALETTE.heading,
                backgroundColor: 'transparent',
              }}
            >
              Pobierz ebook
            </button>
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase transition-colors"
              style={{
                backgroundColor: PALETTE.accent,
                color: PALETTE.heading,
              }}
            >
              Newsletter
            </button>
          </div>
        </section>

        {/* Course cards mock */}
        <section className="mb-20">
          <span
            className="inline-block text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: PALETTE.accentDeep }}
          >
            Przykład: Karty kursów
          </span>
          <h2 className="font-heading text-3xl mb-8" style={{ color: PALETTE.heading }}>
            Trzy warianty karty
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card variant 1 — light */}
            <article
              className="rounded-3xl overflow-hidden border"
              style={{ backgroundColor: PALETTE.bgElevated, borderColor: PALETTE.border }}
            >
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ backgroundColor: PALETTE.bgCard, color: PALETTE.bodySoft }}
              >
                <span className="font-mono text-xs">obraz kursu</span>
              </div>
              <div className="p-6">
                <span
                  className="text-[11px] uppercase tracking-widest font-mono"
                  style={{ color: PALETTE.accentDeep }}
                >
                  Kurs · 8 modułów
                </span>
                <h3
                  className="font-heading text-2xl mt-2 mb-3"
                  style={{ color: PALETTE.heading }}
                >
                  Cykl bez bólu
                </h3>
                <p className="text-sm mb-5" style={{ color: PALETTE.body }}>
                  Hormony, fazy cyklu i jak żyć w zgodzie ze swoją biologią.
                </p>
                <button
                  className="w-full py-3 rounded-full font-medium text-sm uppercase tracking-wider"
                  style={{ backgroundColor: PALETTE.primary, color: PALETTE.primaryText }}
                >
                  Sprawdź
                </button>
              </div>
            </article>

            {/* Card variant 2 — accent */}
            <article
              className="rounded-3xl overflow-hidden border"
              style={{ backgroundColor: PALETTE.bgCard, borderColor: PALETTE.border }}
            >
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ backgroundColor: PALETTE.accent, color: PALETTE.heading }}
              >
                <span className="font-mono text-xs">obraz kursu</span>
              </div>
              <div className="p-6">
                <span
                  className="text-[11px] uppercase tracking-widest font-mono"
                  style={{ color: PALETTE.accentDeep }}
                >
                  Kurs · 12 modułów
                </span>
                <h3
                  className="font-heading text-2xl mt-2 mb-3"
                  style={{ color: PALETTE.heading }}
                >
                  Sen głęboki
                </h3>
                <p className="text-sm mb-5" style={{ color: PALETTE.body }}>
                  Protokoły regeneracji nocnej dopasowane do mam i kobiet po 35.
                </p>
                <button
                  className="w-full py-3 rounded-full font-medium text-sm uppercase tracking-wider border-2"
                  style={{
                    borderColor: PALETTE.heading,
                    color: PALETTE.heading,
                    backgroundColor: 'transparent',
                  }}
                >
                  Sprawdź
                </button>
              </div>
            </article>

            {/* Card variant 3 — dark */}
            <article
              className="rounded-3xl overflow-hidden"
              style={{ backgroundColor: PALETTE.heading, color: PALETTE.bgElevated }}
            >
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ backgroundColor: PALETTE.body }}
              >
                <span className="font-mono text-xs" style={{ color: PALETTE.bgElevated }}>
                  obraz kursu
                </span>
              </div>
              <div className="p-6">
                <span
                  className="text-[11px] uppercase tracking-widest font-mono"
                  style={{ color: PALETTE.accent }}
                >
                  Premium · subskrypcja
                </span>
                <h3
                  className="font-heading text-2xl mt-2 mb-3"
                  style={{ color: PALETTE.bgElevated }}
                >
                  Pigułki Wiedzy
                </h3>
                <p className="text-sm mb-5" style={{ color: PALETTE.borderSoft }}>
                  Codzienna dawka biohackingu w aplikacji. Krótkie, naukowe, działające.
                </p>
                <button
                  className="w-full py-3 rounded-full font-medium text-sm uppercase tracking-wider"
                  style={{ backgroundColor: PALETTE.accent, color: PALETTE.heading }}
                >
                  Dołącz
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Typography */}
        <section
          className="mb-20 rounded-3xl p-10 border"
          style={{ backgroundColor: PALETTE.bgElevated, borderColor: PALETTE.border }}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: PALETTE.accentDeep }}
          >
            Przykład: Typografia
          </span>
          <h1
            className="font-heading text-6xl mb-2 leading-none"
            style={{ color: PALETTE.heading, letterSpacing: '-0.02em' }}
          >
            H1 Heading
          </h1>
          <h2
            className="font-heading text-4xl mb-2"
            style={{ color: PALETTE.heading, letterSpacing: '-0.02em' }}
          >
            H2 Sekcja
          </h2>
          <h3 className="font-heading text-2xl mb-4 font-semibold" style={{ color: PALETTE.heading }}>
            H3 Podsekcja
          </h3>
          <p className="text-base mb-2" style={{ color: PALETTE.body }}>
            Body text · standardowy akapit, ten kolor używany dla głównej treści.
          </p>
          <p className="text-base mb-2" style={{ color: PALETTE.bodySoft }}>
            Body soft · drugorzędny tekst, podpisy, metadata.
          </p>
          <p className="text-base">
            <Link href="#" style={{ color: PALETTE.accentDeep }} className="underline">
              Link kontekstowy
            </Link>
            {' '}
            wewnątrz akapitu z kontrastem zachowanym.
          </p>
        </section>

        {/* Buttons grid */}
        <section className="mb-20">
          <span
            className="inline-block text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: PALETTE.accentDeep }}
          >
            Przykład: Stany przycisków
          </span>
          <h2 className="font-heading text-3xl mb-8" style={{ color: PALETTE.heading }}>
            Hierarchia CTA
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase"
              style={{ backgroundColor: PALETTE.primary, color: PALETTE.primaryText }}
            >
              Primary · sage olive
            </button>
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase border-2"
              style={{
                borderColor: PALETTE.heading,
                color: PALETTE.heading,
                backgroundColor: 'transparent',
              }}
            >
              Secondary · outline
            </button>
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase"
              style={{ backgroundColor: PALETTE.accent, color: PALETTE.heading }}
            >
              Accent · taupe
            </button>
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase"
              style={{ backgroundColor: PALETTE.heading, color: PALETTE.bgElevated }}
            >
              Dark · forest
            </button>
            <button
              className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase"
              style={{ backgroundColor: PALETTE.bgCard, color: PALETTE.heading }}
            >
              Subtle · cream
            </button>
          </div>
        </section>

        {/* Compare links */}
        <section
          className="rounded-3xl p-8 border"
          style={{ backgroundColor: PALETTE.bgElevated, borderColor: PALETTE.border }}
        >
          <h2 className="font-heading text-2xl mb-3" style={{ color: PALETTE.heading }}>
            Porównaj
          </h2>
          <p className="text-sm mb-4" style={{ color: PALETTE.body }}>
            Otwórz w nowej karcie obecną wersję strony i tę paletę obok siebie.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-6 py-2.5 rounded-full text-sm font-medium border-2"
              style={{ borderColor: PALETTE.heading, color: PALETTE.heading }}
            >
              Strona główna (Coastal)
            </Link>
            <Link
              href="/kursy"
              target="_blank"
              className="px-6 py-2.5 rounded-full text-sm font-medium border-2"
              style={{ borderColor: PALETTE.heading, color: PALETTE.heading }}
            >
              Kursy (Coastal)
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
