'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  { num: '50%', label: 'Polaków cierpi na zaburzenia snu' },
  { num: '65%', label: 'pracowników w Polsce odczuwa wypalenie zawodowe' },
  { num: '1 / 4', label: 'dorosłych zmaga się ze zdrowiem psychicznym' },
  { num: '22%', label: 'Polaków ma zaburzenia tarczycy' },
]

export default function StatsBar() {
  return (
    <section
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        borderTop: '1px solid var(--lr-rule)',
        borderBottom: '1px solid var(--lr-rule)',
      }}
    >
      <motion.div
        className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {stats.map((s, i) => (
          <div key={i} className="lr-stat">
            <span className="lr-stat__num">{s.num}</span>
            <span className="lr-stat__label">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
