'use client'

import { motion } from 'framer-motion'
import { X, Check, ExternalLink } from 'lucide-react'
import type { Swap } from '@/lib/zamienniki'
import SwapIllustration from './SwapIllustrations'

const EASE = [0.22, 1, 0.36, 1] as const

export default function SwapCard({ s, index = 0 }: { s: Swap; index?: number }) {
  return (
    <motion.article
      className="lr-swap group"
      initial={{ opacity: 0, y: 30, rotate: index % 2 ? 1.2 : -1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
      layout
    >
      <h3 className="lr-swap__title">{s.title}</h3>

      <div className="lr-swap__pair">
        {/* ZAMIAST */}
        <div className="lr-swap__side lr-swap__side--instead">
          <div className="lr-swap__stage">
            <SwapIllustration icon={s.icon} v="bad" />
            <span className="lr-swap__stamp lr-swap__stamp--no"><X size={16} strokeWidth={3} /></span>
          </div>
          <span className="lr-swap__tag">Zamiast</span>
          <p className="lr-swap__name">{s.instead.name}</p>
          <p className="lr-swap__why">{s.instead.why}</p>
        </div>

        <span className="lr-swap__vs" aria-hidden>vs</span>

        {/* WYBIERZ */}
        <div className="lr-swap__side lr-swap__side--choose">
          <div className="lr-swap__stage">
            <SwapIllustration icon={s.icon} v="good" />
            <motion.span
              className="lr-swap__stamp lr-swap__stamp--yes"
              initial={{ scale: 0, rotate: -40 }}
              whileInView={{ scale: 1, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.5 + (index % 3) * 0.1 }}
            >
              <Check size={16} strokeWidth={3} />
            </motion.span>
          </div>
          <span className="lr-swap__tag">Wybierz</span>
          <p className="lr-swap__name">
            {s.choose.name}
            {s.choose.brand && <span className="lr-swap__brand">{s.choose.brand}</span>}
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
