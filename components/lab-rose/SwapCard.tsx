'use client'

import { motion } from 'framer-motion'
import { Cookie, Flame, Container, Package, Slice, Wind, X, Check, ArrowRight, ExternalLink } from 'lucide-react'
import type { Swap } from '@/lib/zamienniki'

const ICONS = { Cookie, Flame, Container, Package, Slice, Wind }
const EASE = [0.22, 1, 0.36, 1] as const

export default function SwapCard({ s, index = 0 }: { s: Swap; index?: number }) {
  const Icon = ICONS[s.icon]
  return (
    <motion.article
      className="lr-swap group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
      layout
    >
      <header className="lr-swap__head">
        <span className="lr-swap__icon"><Icon size={18} strokeWidth={1.6} /></span>
        <h3 className="lr-swap__title">{s.title}</h3>
      </header>

      <div className="lr-swap__pair">
        <div className="lr-swap__side lr-swap__side--instead">
          <span className="lr-swap__tag"><X size={12} strokeWidth={2.5} /> Zamiast</span>
          <p className="lr-swap__name">{s.instead.name}</p>
          <p className="lr-swap__why">{s.instead.why}</p>
        </div>

        <span className="lr-swap__arrow" aria-hidden><ArrowRight size={16} /></span>

        <div className="lr-swap__side lr-swap__side--choose">
          <span className="lr-swap__tag"><Check size={12} strokeWidth={2.5} /> Wybierz</span>
          <p className="lr-swap__name">
            {s.choose.name}
            {s.choose.brand && <span className="lr-swap__brand"> · {s.choose.brand}</span>}
          </p>
          <p className="lr-swap__why">{s.choose.why}</p>
          {s.choose.link && (
            <a href={s.choose.link} target="_blank" rel="noopener noreferrer sponsored" className="lr-swap__buy">
              Gdzie kupić <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
