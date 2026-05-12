'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  { num: '4 100', label: 'Kobiet w badaniach na których oparto protokoły' },
  { num: '14 dni', label: 'Średni czas do pierwszej mierzalnej zmiany' },
  { num: '87%', label: 'Czytelniczek wraca do treści ponad 3×' },
  { num: '12', label: 'Recenzowanych źródeł na każdy artykuł' },
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
