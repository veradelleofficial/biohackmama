'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const handles = [
  { handle: '@biohackmama.pl', href: 'https://instagram.com/biohackmama.pl', label: 'Brand' },
  { handle: '@veradelleofficial', href: 'https://instagram.com/veradelleofficial', label: 'Osobiste' },
]

export default function SignatureBlock() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) 0',
        borderTop: '1px solid var(--lr-rule)',
      }}
    >
      {/* Ambient rose glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(232,174,189,0.10) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Ambient lime glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          right: '-10%',
          width: '40%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,242,79,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: EASE }}
        className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 relative text-center"
      >
        <span className="lr-eyebrow">Poznajmy się bliżej</span>

        <h2 className="mt-8" style={{ maxWidth: '22ch', margin: '2rem auto 0' }}>
          Codziennie nowe odkrycia{' '}
          <span className="lr-rose" style={{ fontStyle: 'italic' }}>
            po drodze.
          </span>
        </h2>
        <p
          className="mt-6"
          style={{
            maxWidth: '58ch',
            margin: '1.5rem auto 0',
            color: 'var(--lr-ink-soft)',
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          Moje codzienne doświadczenia własne, sprawdzone polecenia, nowinki ze świata
          zdrowia oraz odpowiedzi na Wasze pytania publikuję na bieżąco na Instagramie.
        </p>
        <p
          className="mt-4"
          style={{
            maxWidth: '50ch',
            margin: '1rem auto 0',
            color: 'var(--lr-ink)',
            fontSize: '1rem',
            fontStyle: 'italic',
          }}
        >
          Dołącz do mnie i wybierz profil dla siebie:
        </p>

        <div className="mt-10 md:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {handles.map((ig) => (
              <a
                key={ig.handle}
                href={ig.href}
                target="_blank"
                rel="noopener noreferrer"
                className="lr-promo-card group"
                style={{ ['--promo-accent' as any]: 'var(--lr-rose)' }}
              >
                <span aria-hidden className="lr-promo-card__bar" />
                <Instagram
                  size={18}
                  strokeWidth={1.5}
                  style={{ color: 'var(--lr-rose)', marginLeft: '0.25rem' }}
                />
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: 'var(--lr-ink)',
                      lineHeight: 1.1,
                      display: 'block',
                    }}
                  >
                    {ig.handle}
                  </span>
                  <span
                    className="lr-mono"
                    style={{
                      fontSize: '0.5625rem',
                      color: 'var(--lr-ink-dim)',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      marginTop: '0.2rem',
                      display: 'block',
                    }}
                  >
                    {ig.label}
                  </span>
                </div>
                <span className="lr-promo-card__arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
