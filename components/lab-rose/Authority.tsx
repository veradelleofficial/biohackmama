'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const credentials = [
  { num: '2 ×', label: 'pokonana niedoczynność tarczycy naturalnie' },
  { num: '5 lat', label: 'bez leków, hormony w pełnej równowadze' },
  { num: 'Lata', label: 'zagłębiania się w badania i naturoterapię' },
]

const sources = [
  'PubMed · 1 200+ artykułów przeczytanych',
  'dr Stacy Sims · ROAR, Next Level',
  'dr Mindy Pelz · Fast Like a Girl',
  'Examine.com · suplementacja oparta na dowodach',
  'Andrew Huberman · Stanford School of Medicine',
]

export default function Authority() {
  return (
    <section
      id="o-mnie"
      style={{
        padding: 'clamp(4rem, 9vw, 8rem) 0',
        background: 'var(--lr-surface)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — photo placeholder + signature */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div
              style={{
                aspectRatio: '3 / 4',
                backgroundImage:
                  'linear-gradient(to bottom, rgba(12,12,12,0) 55%, rgba(12,12,12,0.78) 100%), url(/images/vera-portrait.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
                border: '1px solid var(--lr-rule)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.5rem',
              }}
            >
              <div>
                <span
                  className="lr-script"
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    color: 'var(--lr-rose)',
                    transform: 'rotate(-3deg)',
                    display: 'inline-block',
                    lineHeight: 0.9,
                    textShadow: '0 2px 12px rgba(12,12,12,0.6)',
                  }}
                >
                  Vera Delle
                </span>
                <div
                  className="lr-mono"
                  style={{
                    fontSize: '0.625rem',
                    color: 'var(--lr-ink-soft)',
                    letterSpacing: '0.22em',
                    marginTop: '0.5rem',
                  }}
                >
                  Founder · Biohackerka · Mama
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — credentials + sources */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
          >
            <span className="lr-eyebrow">Moja historia</span>
            <h2 className="mt-6" style={{ maxWidth: '20ch' }}>
              Dlaczego to{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                robię.
              </span>
            </h2>

            <p className="mt-8" style={{ maxWidth: '50ch' }}>
              Nie jestem lekarzem. Jestem mamą która 4 lata temu po raz drugi dostała
              diagnozę niedoczynności tarczycy i postanowiła zrozumieć dlaczego, czytając
              badania, nie poradniki. Wszystko co tutaj piszę przeszło przez moje ciało.
              Każde źródło jest podlinkowane.
            </p>

            {/* Stats inline */}
            <div
              className="mt-10 grid grid-cols-3 gap-4"
              style={{
                paddingTop: '2rem',
                borderTop: '1px solid var(--lr-rule)',
              }}
            >
              {credentials.map((c, i) => (
                <div key={i} className="lr-stat">
                  <span className="lr-stat__num" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                    {c.num}
                  </span>
                  <span className="lr-stat__label">{c.label}</span>
                </div>
              ))}
            </div>

            {/* Sources */}
            <div className="mt-10">
              <span
                className="lr-mono"
                style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
              >
                ŹRÓDŁA · NA KTÓRYCH BAZUJĘ
              </span>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginTop: '1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.5rem',
                }}
              >
                {sources.map((s, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-jetbrains), monospace',
                      fontSize: '0.75rem',
                      color: 'var(--lr-ink-soft)',
                      letterSpacing: '0.04em',
                      paddingLeft: '1rem',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--lr-accent)',
                      }}
                    >
                      ▸
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Link href="/o-mnie" className="lr-cta-ghost">
                Cała moja historia
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
