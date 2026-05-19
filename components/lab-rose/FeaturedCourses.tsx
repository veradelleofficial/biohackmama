'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE } },
}

const courses = [
  {
    id: 1,
    num: '01',
    title: 'Hormony w równowadze',
    summary:
      'Masz dość tego, że w jednym tygodniu możesz góry przenosić, a w kolejnym brakuje Ci sił na cokolwiek? Twój cykl zarządza wszystkim: nastrojem, energią i regeneracją. Przedstawiam Ci protokół oparty na kobiecym zegarze dobowym. Nauczę Cię, jak naturalnie zbalansować hormony, by odzyskać stabilną energię przez cały miesiąc.',
    duration: '8 tygodni',
    lessons: '24 lekcje',
    price: 'od 497 zł',
  },
  {
    id: 2,
    num: '02',
    title: 'Hakowanie Snu: Reset dla zapracowanych',
    summary:
      'Sen to Twój najpotężniejszy, darmowy lek. Koniec z bezskutecznym przewracaniem się z boku na bok i poranną mgłą mózgową. Nauczę Cię, jak okiełznać rytm dobowy, jak światło steruje Twoimi hormonami i jak realnie regenerować ciało oraz umysł – nawet przy najbardziej napiętym grafiku.',
    duration: '6 tygodni',
    lessons: '18 lekcji',
    price: 'od 397 zł',
  },
  {
    id: 3,
    num: '03',
    title: 'Codzienny Biohacking',
    summary:
      'Zapomnij o skomplikowanych i drogich kuracjach. Zdrowie to suma małych wyborów. Oddaję w Twoje ręce 50 gotowych, biohackingowych zmian, które możesz wdrożyć bez czyszczenia portfela. Nauczę Cię, jak poprzez proste nawyki zarządzać swoją energią i odpornością. Od darmowego porannego światła po usuwanie chemii z domu. Jedna mała rzecz na raz, bez presji i rewolucji.',
    duration: '4 tygodnie',
    lessons: '12 lekcji',
    price: 'od 297 zł',
  },
]

export default function FeaturedCourses() {
  return (
    <section
      id="kursy"
      style={{
        padding: 'clamp(4rem, 9vw, 8rem) 0',
        borderTop: '1px solid var(--lr-rule)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <span className="lr-eyebrow">Programy</span>
            <h2 className="mt-6" style={{ maxWidth: '16ch' }}>
              Trzy{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                protokoły
              </span>{' '}
              dla mam.
            </h2>
          </div>
          <Link href="/kursy" className="lr-cta-ghost">
            Poznaj programy dla każdego
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {courses.map((c) => (
            <motion.article
              key={c.id}
              variants={fadeUp}
              style={{
                background: 'var(--lr-surface)',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                border: '1px solid var(--lr-rule)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Status pill */}
              <div className="flex items-center justify-between mb-8">
                <span
                  className="lr-mono"
                  style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}
                >
                  // {c.num}
                </span>
                <span
                  className="lr-mono"
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--lr-rose)',
                    border: '1px solid var(--lr-rule-strong)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                  }}
                >
                  · waitlist
                </span>
              </div>

              <h3 style={{ minHeight: '3.5em' }}>{c.title}</h3>

              <p className="mt-4 mb-8" style={{ fontSize: '0.9375rem', flexGrow: 1 }}>
                {c.summary}
              </p>

              {/* Specs row */}
              <div
                className="lr-mono"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem 1rem',
                  fontSize: '0.6875rem',
                  color: 'var(--lr-ink-soft)',
                  paddingTop: '1.25rem',
                  marginBottom: '1.5rem',
                  borderTop: '1px solid var(--lr-rule)',
                }}
              >
                <span>{c.duration}</span>
                <span style={{ textAlign: 'right' }}>{c.lessons}</span>
                <span className="lr-accent">{c.price}</span>
              </div>

              {/* CTA */}
              <Link
                href="#newsletter"
                className="lr-cta-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Powiadom mnie o starcie
                <span aria-hidden>→</span>
              </Link>

              <p
                className="lr-mono"
                style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.18em',
                  color: 'var(--lr-ink-dim)',
                  marginTop: '0.875rem',
                  textAlign: 'center',
                }}
              >
                Pierwsze 200 osób · −40%
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
