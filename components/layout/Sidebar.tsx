'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Newsletter (Lab × Rose) ─────────────────────────────────────────────────

function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    setTimeout(() => {
      setStatus('sent')
      setEmail('')
    }, 900)
  }

  return (
    <div
      style={{
        background: 'var(--lr-surface)',
        border: '1px solid var(--lr-rule)',
        padding: '1.5rem 1.25rem',
      }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="lr-eyebrow" style={{ fontSize: '0.625rem' }}>
          Protokół · 001
        </span>
      </div>
      <h3
        style={{
          fontSize: '1.125rem',
          lineHeight: 1.15,
          maxWidth: '20ch',
          marginBottom: '0.875rem',
        }}
      >
        Poranny{' '}
        <span className="lr-rose" style={{ fontStyle: 'italic' }}>
          protokół
        </span>
        . 8 minut, 14 dni.
      </h3>
      <p style={{ fontSize: '0.8125rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
        Cotygodniowe protokoły, analizy i przemyślenia, prosto do skrzynki.
      </p>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="py-2"
            >
              <p className="lr-mono" style={{ color: 'var(--lr-accent)', fontSize: '0.6875rem' }}>
                ✓ Dzięki. Sprawdź skrzynkę
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.pl"
                required
                className="lr-mono"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  background: 'var(--lr-bg)',
                  border: '1px solid var(--lr-rule-strong)',
                  color: 'var(--lr-ink)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.03em',
                  borderRadius: '2px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="lr-cta-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem 1rem',
                  fontSize: '0.6875rem',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
              >
                {status === 'loading' ? 'Zapisuję...' : 'Pobierz protokół'}
                {status !== 'loading' && <span aria-hidden>→</span>}
              </button>
              <p
                className="lr-mono"
                style={{
                  fontSize: '0.5625rem',
                  color: 'var(--lr-ink-dim)',
                  letterSpacing: '0.16em',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                }}
              >
                BEZ SPAMU · WYPISZ JEDNYM KLIKNIĘCIEM
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

// ─── Promo Blocks (Lab × Rose) ───────────────────────────────────────────────

interface PromoBlock {
  label: string
  sublabel: string
  desc: string
  href: string
  glyph: string
  accent: string
}

const PROMOS: PromoBlock[] = [
  {
    label: 'Programy',
    sublabel: 'ONLINE',
    desc: 'Hormony, sen, biohacking',
    href: '/kursy',
    glyph: '01',
    accent: 'var(--lr-accent)',
  },
  {
    label: 'Biblioteka',
    sublabel: 'PDF',
    desc: 'Ebooki z bibliografią',
    href: '/ebooki',
    glyph: '02',
    accent: 'var(--lr-rose)',
  },
  {
    label: 'Narzędzia',
    sublabel: 'GRATIS',
    desc: 'Kalkulatory i quizy',
    href: '/narzedzia',
    glyph: '03',
    accent: 'var(--lr-ink)',
  },
]

const EASE_OUT = [0.22, 1, 0.36, 1] as const

function PromoBlocks() {
  return (
    <div className="space-y-3">
      <p
        className="lr-mono"
        style={{
          fontSize: '0.625rem',
          color: 'var(--lr-ink-dim)',
          letterSpacing: '0.22em',
          marginBottom: '0.75rem',
        }}
      >
        SPRAWDŹ TEŻ
      </p>
      {PROMOS.map((promo, i) => (
        <motion.div
          key={promo.href}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
        >
          <Link
            href={promo.href}
            className="group block"
            style={{
              background: 'var(--lr-surface)',
              border: '1px solid var(--lr-rule)',
              padding: '1rem 1rem 1rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              transition: 'border-color 240ms var(--ease-out-strong)',
              position: 'relative',
            }}
          >
            {/* Left vertical accent bar */}
            <span
              aria-hidden
              style={{
                width: '3px',
                alignSelf: 'stretch',
                background: promo.accent,
                marginRight: '0.5rem',
              }}
            />
            {/* Glyph number */}
            <span
              className="lr-mono"
              style={{
                fontSize: '0.6875rem',
                color: 'var(--lr-ink-dim)',
                letterSpacing: '0.18em',
                minWidth: '2.5ch',
              }}
            >
              //{promo.glyph}
            </span>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-baseline gap-2">
                <span
                  style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: '1.0625rem',
                    color: 'var(--lr-ink)',
                    lineHeight: 1.1,
                  }}
                >
                  {promo.label}
                </span>
                <span
                  className="lr-mono"
                  style={{
                    fontSize: '0.5625rem',
                    color: promo.accent,
                    letterSpacing: '0.18em',
                  }}
                >
                  · {promo.sublabel}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--lr-ink-soft)',
                  marginTop: '0.25rem',
                  lineHeight: 1.3,
                }}
              >
                {promo.desc}
              </p>
            </div>
            {/* Arrow */}
            <span
              style={{
                color: promo.accent,
                fontSize: '1rem',
                marginRight: '0.5rem',
                transition: 'transform 240ms var(--ease-out-strong)',
                display: 'inline-block',
              }}
              className="group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Ad Slots ────────────────────────────────────────────────────────────────

const AD1_HREF = 'https://czarneznatury.pl/produkt/alcalina-kwas-humusowy/'

function SidebarAdSlot({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--lr-rule)',
        overflow: 'hidden',
        background: 'var(--lr-surface)',
      }}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer sponsored">
        <Image src={src} alt={alt} width={300} height={250} className="block w-full h-auto" />
      </Link>
    </div>
  )
}

function SidebarAdSlot2() {
  return (
    <div
      style={{
        border: '1px solid var(--lr-rule)',
        overflow: 'hidden',
        background: 'var(--lr-surface)',
      }}
    >
      <Link
        href="https://mitowell.pl/sklep/lampy-do-terapii-czerwonym-swiatlem/"
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        <Image
          src="/images/mitowell-ad.jpg.png"
          alt="Mitowell -10% kod: VERONICA10"
          width={300}
          height={250}
          className="block w-full h-auto"
        />
      </Link>
    </div>
  )
}

// ─── Main Sidebar (desktop — xl+) ────────────────────────────────────────────

export default function Sidebar() {
  return (
    <div className="sticky top-28 space-y-6">
      <NewsletterBox />
      <PromoBlocks />
      <SidebarAdSlot
        href={AD1_HREF}
        src="/images/alcalina-ad.jpg.png"
        alt="Alcalina -10% kod: WERONIKA"
      />
      <SidebarAdSlot2 />
    </div>
  )
}

// ─── Mobile Sidebar (below xl) ───────────────────────────────────────────────

export function MobileSidebar() {
  return (
    <div className="xl:hidden mt-14 space-y-8">
      <div style={{ height: '1px', background: 'var(--lr-rule)' }} />
      <PromoBlocks />
      <NewsletterBox />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SidebarAdSlot
          href={AD1_HREF}
          src="/images/alcalina-ad.jpg.png"
          alt="Alcalina -10% kod: WERONIKA"
        />
        <SidebarAdSlot2 />
      </div>
    </div>
  )
}
