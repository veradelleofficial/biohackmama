'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

function NewsletterContent() {
  return (
    <>
      <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
        <span className="lr-eyebrow">Bezpłatny start</span>
      </div>

      <h2 style={{ maxWidth: '22ch' }}>
        Poranny Protokół Mamy.
        <br />
        <span className="lr-rose" style={{ fontStyle: 'italic', fontWeight: 300 }}>
          7 kroków, 8 minut,
        </span>
        <br />
        mierzalna różnica w 14 dni.
      </h2>

      <ul className="mt-10 space-y-3" style={{ listStyle: 'none', padding: 0 }}>
        {[
          'PDF z protokołem i checklist do druku',
          'Dziennik do śledzenia efektów przez 14 dni',
          'Lista 12 zbędników z drogerii do wyrzucenia',
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3"
            style={{ color: 'var(--lr-ink-soft)' }}
          >
            <span
              className="lr-accent lr-mono"
              style={{ fontSize: '0.875rem', marginTop: '0.15rem' }}
            >
              ✓
            </span>
            <span style={{ fontSize: '0.9375rem' }}>{item}</span>
          </li>
        ))}
      </ul>

      <form
        className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          required
          placeholder="twoj@email.pl"
          className="lr-mono"
          style={{
            flex: 1,
            padding: '1rem 1.25rem',
            background: 'var(--lr-bg)',
            border: '1px solid var(--lr-rule-strong)',
            borderRadius: '2px',
            color: 'var(--lr-ink)',
            fontSize: '0.875rem',
            letterSpacing: '0.04em',
            outline: 'none',
          }}
        />
        <button type="submit" className="lr-cta-primary">
          Pobierz protokół
          <span aria-hidden>→</span>
        </button>
      </form>

      <p
        className="mt-6 lr-mono"
        style={{
          color: 'var(--lr-ink-dim)',
          fontSize: '0.6875rem',
          letterSpacing: '0.18em',
        }}
      >
        Premiera 2026 · bez spamu · jedno kliknięcie żeby się wypisać
      </p>
    </>
  )
}

export default function NewsletterCTA() {
  return (
    <>
      {/* WERSJA 1 — Two-column (obraz lewo, tekst prawo) */}
      <section
        id="newsletter"
        style={{
          padding: 'clamp(4rem, 9vw, 8rem) 0',
          borderTop: '1px solid var(--lr-rule)',
          position: 'relative',
        }}
      >
        <span
          className="lr-mono"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            fontSize: '0.625rem',
            color: 'var(--lr-accent)',
            letterSpacing: '0.22em',
            zIndex: 5,
          }}
        >
          // WERSJA 1 · TWO-COLUMN
        </span>

        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div className="order-2 md:order-1">
              <NewsletterContent />
            </div>
            <div
              className="order-1 md:order-2"
              style={{
                aspectRatio: '4 / 3',
                backgroundImage:
                  'linear-gradient(to left, rgba(12,12,12,0) 60%, rgba(12,12,12,0.35) 100%), url(/images/tired-mom-morning.png?v=2)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: '1px solid var(--lr-rule)',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* WERSJA 2 — Full background z dark overlay */}
      <section
        style={{
          padding: 'clamp(4rem, 9vw, 8rem) 0',
          borderTop: '1px solid var(--lr-rule)',
          backgroundImage:
            'linear-gradient(rgba(12,12,12,0.78), rgba(12,12,12,0.85)), url(/images/tired-mom-morning.png?v=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <span
          className="lr-mono"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            fontSize: '0.625rem',
            color: 'var(--lr-accent)',
            letterSpacing: '0.22em',
            zIndex: 5,
          }}
        >
          // WERSJA 2 · FULL BG OVERLAY
        </span>

        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <NewsletterContent />
          </motion.div>
        </div>
      </section>
    </>
  )
}
