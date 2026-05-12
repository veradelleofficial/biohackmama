'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

export default function NewsletterCTA() {
  return (
    <section
      id="newsletter"
      style={{
        padding: 'clamp(4rem, 9vw, 8rem) 0',
        borderTop: '1px solid var(--lr-rule)',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
            <span className="lr-eyebrow">Lead magnet</span>
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
              '5 maili przez 2 tygodnie z tłem naukowym',
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
            2&nbsp;847 mam już dostało · bez spamu · wypisz się jednym kliknięciem
          </p>
        </motion.div>
      </div>
    </section>
  )
}
