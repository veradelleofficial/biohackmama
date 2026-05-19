'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const credentials = [
  { num: '2 ×', label: 'pokonana niedoczynność tarczycy naturalnymi metodami i dietą' },
  { num: '5 lat', label: 'bez leków, hormony w równowadze' },
  { num: 'Lata', label: 'zagłębiania się w badania, naturoterapię i zdrowsze alternatywy' },
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
                  style={{
                    fontFamily: "'Abramo Script', cursive",
                    fontSize: 'clamp(2rem, 2.9vw, 2.85rem)',
                    color: 'var(--lr-rose)',
                    transform: 'rotate(-2deg)',
                    display: 'inline-block',
                    lineHeight: 0.95,
                    textShadow: '0 2px 12px rgba(12,12,12,0.7)',
                  }}
                >
                  Veronica Kuzminczuk
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

            <div className="mt-8 space-y-5" style={{ maxWidth: '58ch' }}>
              <p>
                Kiedy cztery lata temu, będąc w ciąży, po raz drugi usłyszałam diagnozę:
                niedoczynność tarczycy, powiedziałam sobie{' '}
                <span className="lr-rose" style={{ fontStyle: 'italic' }}>„dość”</span>.
                Chciałam w końcu zrozumieć źródło problemu. Miałam dość szukania po omacku,
                wydawania fortuny na kolejnych lekarzy i brania leków, które jedynie maskowały
                objawy, zamiast leczyć przyczynę.
              </p>
              <p>
                Choć nie jestem lekarzem, wzięłam sprawy w swoje ręce. Stałam się dla samej
                siebie królikiem doświadczalnym i od kilku lat z sukcesem testuję najnowsze
                odkrycia oraz naturalne metody wspierania organizmu.
              </p>
              <p>
                Nie znajdziesz u mnie teorii wyssanych z palca. Wszystko, czym się dzielę,
                przeszło przez moje własne ciało, a każdy fakt popieram solidną bibliografią,
                literaturą naukową i linkami do rzetelnych źródeł.
              </p>
              <p>
                Nauczyłam się świadomie zarządzać biologią swojego organizmu. Zaczęłam się
                w niego wsłuchiwać i działać tak, by maksymalnie zwiększyć jego potencjał.
                Od lat osiągam to dzięki precyzyjnemu odżywianiu, ruchowi, ćwiczeniom,
                celowanej suplementacji oraz eliminacji chemii z mojego otoczenia.
              </p>
              <p style={{ color: 'var(--lr-ink)' }}>
                Wejdź do mojego świata i zobacz, jak możesz naturalnie pomóc swojemu ciału
                odzyskać równowagę.
              </p>
            </div>

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
