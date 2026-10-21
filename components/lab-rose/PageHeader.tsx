'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface PageHeaderProps {
  /** Nieużywane od 2026-10-21 (klientka usunęła etykiety z kropką nad tytułem). Zostaje w typie, żeby nie zmieniać 15 stron. */
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Nieużywane, j.w. */
  meta?: string
}

/**
 * Nagłówek podstron w stylu hero strony głównej:
 * zorza lime/rose/teal w tle, winieta, ziarno, tytuł wysuwany spod maski.
 * Bez etykiety z kropką nad tytułem. Wyróżnione słowa (.lr-rose) dostają
 * mieniący się gradient z globals.css.
 */
export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)', background: '#0A0A0A' }}
    >
      {/* zorza jak w hero, trochę spokojniejsza */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.85 }}>
        <div className="lr-aurora lr-aurora--lime" />
        <div className="lr-aurora lr-aurora--rose" />
        <div className="lr-aurora lr-aurora--teal" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 40% 40%, transparent 35%, rgba(10,10,10,0.8) 100%), linear-gradient(to bottom, transparent 70%, var(--lr-bg) 100%)',
        }}
      />
      <div aria-hidden className="lr-grain absolute inset-0 pointer-events-none" style={{ opacity: 0.05 }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative">
        {/* tytuł wysuwa się spod maski */}
        <div style={{ overflow: 'hidden', paddingBottom: '0.12em' }}>
          <motion.h1
            style={{ maxWidth: '22ch' }}
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            {title}
          </motion.h1>
        </div>

        {description && (
          <motion.p
            className="mt-8"
            style={{ maxWidth: '56ch', fontSize: '1.0625rem' }}
            initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
