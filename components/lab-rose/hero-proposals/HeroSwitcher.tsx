'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeroA from './HeroA'
import HeroB from './HeroB'

const EASE = [0.22, 1, 0.36, 1] as const

const OPTIONS = [
  { id: 'a', label: 'A · Konstelacja', hint: 'orbity tematów, rotujący nagłówek, ticker' },
  { id: 'b', label: 'B · Manifest', hint: 'kinowy portret, słowo po słowie, parallax' },
] as const

type Id = (typeof OPTIONS)[number]['id']

export default function HeroSwitcher() {
  const [active, setActive] = useState<Id>('a')
  const [key, setKey] = useState(0)

  // ?v=b otwiera od razu propozycję B (do podglądu i linków)
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('v')
    if (v === 'b') setActive('b')
  }, [])

  return (
    <>
      {/* pływający przełącznik */}
      <div
        className="fixed z-[60] flex items-center gap-1 p-1"
        style={{
          right: '1.25rem',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          background: 'rgba(20,20,20,0.86)',
          border: '1px solid var(--lr-rule-strong)',
          borderRadius: 999,
          backdropFilter: 'blur(12px)',
          boxShadow: '0 20px 50px -20px rgba(0,0,0,0.8)',
        }}
      >
        {OPTIONS.map((o) => {
          const on = o.id === active
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setActive(o.id)}
              className="lr-mono relative"
              title={o.hint}
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.18em',
                padding: '0.7rem 1.1rem',
                borderRadius: 999,
                color: on ? 'var(--lr-bg)' : 'var(--lr-ink-soft)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {on && (
                <motion.span
                  layoutId="hero-switch-pill"
                  className="absolute inset-0"
                  style={{ background: 'var(--lr-accent)', borderRadius: 999 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="lr-mono"
          title="Odtwórz animację wejścia od nowa"
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.18em',
            padding: '0.7rem 0.9rem',
            borderRadius: 999,
            color: 'var(--lr-rose)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ↻
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${active}-${key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {active === 'a' ? <HeroA /> : <HeroB />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
