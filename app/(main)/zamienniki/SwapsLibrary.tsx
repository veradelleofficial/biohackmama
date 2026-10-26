'use client'

import { useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import { SWAPS, CATEGORY_LABEL, type SwapCategory } from '@/lib/zamienniki'
import SwapCard from '@/components/lab-rose/SwapCard'

export default function SwapsLibrary() {
  const cats = Array.from(new Set(SWAPS.map((s) => s.category))) as SwapCategory[]
  const [active, setActive] = useState<SwapCategory | 'all'>('all')
  const list = active === 'all' ? SWAPS : SWAPS.filter((s) => s.category === active)

  return (
    <section style={{ padding: '0 0 clamp(4rem, 8vw, 7rem)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {cats.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8" role="tablist">
            {(['all', ...cats] as const).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`lr-swap-chip ${active === c ? 'is-active' : ''}`}
              >
                {c === 'all' ? 'Wszystkie' : CATEGORY_LABEL[c]}
              </button>
            ))}
          </div>
        )}
        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((s, i) => (
              <SwapCard key={s.id} s={s} index={i} />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
