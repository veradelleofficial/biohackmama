import Link from 'next/link'
import { SWAPS } from '@/lib/zamienniki'
import SwapCard from './SwapCard'

/** Skrót na stronę główną: jasna "kartka" z 3 zamiennikami + link do pełnej listy. */
export default function SwapsSection() {
  return (
    <section className="lr-swaps-sheet">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="lr-swaps-sheet__kicker">Lista zakupów, wersja zdrowsza</span>
            <h2 className="lr-swaps-sheet__title">
              Wybierz <span className="lr-swaps-sheet__mark">zdrowszą</span> opcję.
            </h2>
            <p className="lr-swaps-sheet__lead">
              Małe zamiany, które robią różnicę. Co zwykle wkładamy do koszyka w markecie i czym to zastąpić.
            </p>
          </div>
          <Link href="/zamienniki" className="lr-swaps-sheet__cta">
            Wszystkie zamienniki <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SWAPS.slice(0, 3).map((s, i) => (
            <SwapCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
