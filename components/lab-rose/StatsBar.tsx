'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  {
    num: '50%',
    label: 'Polaków cierpi na zaburzenia snu',
    source: 'Narodowy Test Snu',
  },
  {
    num: '30%',
    label: 'dzieci w Polsce ma nadwagę lub otyłość',
    source: 'WHO COSI 2020',
  },
  {
    num: '1 / 10',
    label: 'osób ma chorobę autoimmunologiczną',
    source: 'AARDA / NIH',
  },
  {
    num: '1 / 4',
    label: 'Polaków ma problemy ze zdrowiem psychicznym',
    source: 'EZOP II 2021',
  },
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
            <span
              className="lr-mono"
              style={{
                fontSize: '0.5625rem',
                color: 'var(--lr-ink-dim)',
                letterSpacing: '0.18em',
                marginTop: '0.5rem',
                display: 'inline-block',
              }}
            >
              ŹRÓDŁO · {s.source}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
