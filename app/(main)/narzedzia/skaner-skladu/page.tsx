import type { Metadata } from 'next'
import PageHeader from '@/components/lab-rose/PageHeader'
import Scanner from '@/components/skaner/Scanner'

const BASE_URL = 'https://biohackmama.pl'

export const metadata: Metadata = {
  title: 'Skaner składu: sprawdź produkt po kodzie kreskowym | BioHackMama',
  description:
    'Zeskanuj kod kreskowy jedzenia albo kosmetyku i sprawdź skład. Ocena w gwiazdkach według zasad low-tox: śmiało kupuj, szukaj alternatywy albo lepiej nie kupuj.',
  alternates: { canonical: `${BASE_URL}/narzedzia/skaner-skladu` },
}

const FOOD = [
  'Aspartam i inne syntetyczne słodziki',
  'Azotyny w wędlinach',
  'Barwniki azowe i dwutlenek tytanu',
  'Syrop glukozowo-fruktozowy',
  'Tłuszcze utwardzone',
  'Glutaminian sodu, karagen, fosforany',
  'Olej palmowy',
  'Produkty ultraprzetworzone (NOVA 4)',
]
const COSMETIC = [
  'Parabeny i ftalany',
  'Formaldehyd i substancje go uwalniające',
  'Methylisothiazolinone (MIT)',
  'Triklosan i oksybenzon',
  'SLS i SLES',
  'Perfumy (parfum)',
  'PEG, silikony, parafina',
]

export default function SkanerPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title={
          <>
            Sprawdź <span className="lr-rose">skład</span> jednym skanem.
          </>
        }
        description="Zeskanuj kod kreskowy jedzenia albo kosmetyku. Pokażę Ci, co siedzi w składzie, i ocenię produkt w gwiazdkach: śmiało kupuj, szukaj lepszej alternatywy albo lepiej nie kupuj."
      />

      <section style={{ padding: '0 0 clamp(4rem, 8vw, 7rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
          <div className="lr-tool-panel" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
            <Scanner />
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Jak oceniam?</h2>
            <p className="mt-4" style={{ fontSize: '0.95rem' }}>
              Każdy produkt startuje z pięcioma gwiazdkami. Za składnik, którego unikam, odejmuję dwie.
              Za taki, który warto ograniczać, jedną. Liczy się to, co faktycznie jest w składzie, a nie
              obietnice z przodu opakowania.
            </p>

            <h3 className="mt-8" style={{ fontSize: '1.1rem' }}>W jedzeniu patrzę na</h3>
            <ul className="lr-scanner__list mt-3">
              {FOOD.map((t) => <li key={t}>{t}</li>)}
            </ul>

            <h3 className="mt-8" style={{ fontSize: '1.1rem' }}>W kosmetykach patrzę na</h3>
            <ul className="lr-scanner__list mt-3">
              {COSMETIC.map((t) => <li key={t}>{t}</li>)}
            </ul>

            <p className="mt-8" style={{ fontSize: '0.8125rem', color: 'var(--lr-ink-dim)', lineHeight: 1.6 }}>
              Dane o produktach pochodzą z otwartych baz Open Food Facts i Open Beauty Facts, które tworzą
              tysiące ludzi na całym świecie. Jeśli produktu nie ma albo brakuje składu, możesz go tam dodać.
              Ocena ma charakter edukacyjny i nie zastępuje porady lekarza ani dietetyka.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
