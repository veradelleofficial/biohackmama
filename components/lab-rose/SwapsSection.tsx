import Link from 'next/link'
import { SWAPS } from '@/lib/zamienniki'
import SwapCard from './SwapCard'

/** Skrót na stronę główną: 3 pierwsze zamienniki + link do pełnej listy. */
export default function SwapsSection() {
  return (
    <section className="relative overflow-hidden" style={{ padding: 'clamp(4rem, 9vw, 7rem) 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <h2 style={{ maxWidth: '18ch' }}>
              Wybierz <span className="lr-rose">zdrowszą</span> opcję.
            </h2>
            <p className="mt-5" style={{ maxWidth: '52ch' }}>
              Małe zamiany, które robią różnicę. Co zwykle wkładamy do koszyka w markecie i czym to zastąpić.
            </p>
          </div>
          <Link href="/zamienniki" className="lr-cta-ghost">
            Wszystkie zamienniki <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SWAPS.slice(0, 3).map((s, i) => (
            <SwapCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
