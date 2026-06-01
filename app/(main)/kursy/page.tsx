'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getCourses } from '@/lib/sanity/queries'
import PageHeader from '@/components/lab-rose/PageHeader'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

interface Course {
  _id: string
  title: string
  slug: { current: string }
  description: string
  price: number | string
  level: string
  duration: string
  lessons: number
}

type Segment = 'kobiety' | 'mezczyzni' | 'dzieci'

const segments: { key: Segment; label: string; desc: string; available: boolean }[] = [
  { key: 'kobiety', label: 'Dla kobiet', desc: 'Hormony, sen, PMS, zmęczenie, piękne włosy i skóra', available: true },
  { key: 'mezczyzni', label: 'Dla mężczyzn', desc: 'Testosteron, sen, libido, energia, skupienie i wydajność', available: false },
  { key: 'dzieci', label: 'Dla dzieci', desc: 'Odporność, sen, alergie, mądra dieta, czyste otoczenie i rozwój', available: false },
]

const kobietyWaitlist = [
  {
    id: 'k-1',
    num: '01',
    title: 'Hormony w równowadze',
    description:
      'Masz dość tego, że w jednym tygodniu możesz góry przenosić, a w kolejnym brakuje Ci sił na cokolwiek? Twój cykl zarządza wszystkim: nastrojem, energią i regeneracją. Przedstawiam Ci protokół oparty na kobiecym zegarze dobowym. Nauczę Cię, jak naturalnie zbalansować hormony, by odzyskać stabilną energię przez cały miesiąc.',
    duration: '8 tygodni',
    lessons: '24 lekcje',
    level: 'Początkujący',
    price: 'od 497 zł',
    launch: 'sierpień 2026',
  },
  {
    id: 'k-2',
    num: '02',
    title: 'Hakowanie Snu: Reset dla zapracowanych',
    description:
      'Sen to Twój najpotężniejszy, darmowy lek. Koniec z bezskutecznym przewracaniem się z boku na bok i poranną mgłą mózgową. Nauczę Cię, jak okiełznać rytm dobowy, jak światło steruje Twoimi hormonami i jak realnie regenerować ciało oraz umysł – nawet przy najbardziej napiętym grafiku.',
    duration: '6 tygodni',
    lessons: '18 lekcji',
    level: 'Średniozaawansowany',
    price: 'od 397 zł',
    launch: 'sierpień 2026',
  },
  {
    id: 'k-3',
    num: '03',
    title: 'Codzienny Biohacking',
    description:
      'Zapomnij o skomplikowanych i drogich kuracjach. Zdrowie to suma małych wyborów. Oddaję w Twoje ręce 50 gotowych, biohackingowych zmian, które możesz wdrożyć bez czyszczenia portfela. Nauczę Cię, jak poprzez proste nawyki zarządzać swoją energią i odpornością. Od darmowego porannego światła po usuwanie chemii z domu. Jedna mała rzecz na raz, bez presji i rewolucji.',
    duration: '4 tygodnie',
    lessons: '12 lekcji',
    level: 'Początkujący',
    price: 'od 297 zł',
    launch: 'lipiec 2026',
  },
]

export default function CoursesPage() {
  const [liveCourses, setLiveCourses] = useState<Course[]>([])
  const [segment, setSegment] = useState<Segment>('kobiety')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCourses()
      .then((data) => setLiveCourses(data || []))
      .catch(() => setLiveCourses([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Programy · 002"
        title={
          <>
            Świadome zdrowie w{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              trzech kierunkach.
            </span>
          </>
        }
        description="Programy łączące rzetelny biohacking, naukę o ciele i filozofię non-toxic. Wybierz odnogę dla siebie. Dla każdego członka rodziny inny zestaw narzędzi."
      />

      {/* Segmentation tabs — Kobiety / Mężczyźni / Dzieci */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ background: 'var(--lr-rule)' }}
          >
            {segments.map((seg, i) => {
              const isActive = seg.key === segment
              return (
                <button
                  key={seg.key}
                  onClick={() => setSegment(seg.key)}
                  className={`lr-segment-tab${isActive ? ' lr-segment-tab--active' : ''}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="lr-mono lr-segment-tab__num"
                      style={{
                        fontSize: '0.625rem',
                        color: isActive ? 'var(--lr-accent)' : 'var(--lr-ink-dim)',
                        letterSpacing: '0.22em',
                        transition: 'color 200ms var(--ease-out-strong)',
                      }}
                    >
                      // {String(i + 1).padStart(2, '0')}
                    </span>
                    {!seg.available && (
                      <span
                        className="lr-mono"
                        style={{
                          fontSize: '0.5625rem',
                          color: 'var(--lr-rose)',
                          border: '1px solid var(--lr-rule-strong)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '999px',
                          letterSpacing: '0.18em',
                        }}
                      >
                        WKRÓTCE
                      </span>
                    )}
                  </div>
                  <h3
                    className="lr-segment-tab__title"
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                      lineHeight: 1.1,
                      color: isActive ? 'var(--lr-ink)' : 'var(--lr-ink-soft)',
                      transition: 'color 200ms var(--ease-out-strong)',
                    }}
                  >
                    {seg.label}
                  </h3>
                  <p
                    className="mt-3"
                    style={{ fontSize: '0.8125rem', color: 'var(--lr-ink-soft)', margin: '0.75rem 0 0' }}
                  >
                    {seg.desc}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {segment === 'kobiety' && (
          <motion.div
            key="kobiety"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Live courses (jeśli są) */}
            {loading ? (
              <section style={{ padding: '2rem 0' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
                  <p
                    className="lr-mono"
                    style={{ fontSize: '0.75rem', color: 'var(--lr-ink-dim)' }}
                  >
                    · ładowanie programów ·
                  </p>
                </div>
              </section>
            ) : liveCourses.length > 0 ? (
              <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(4rem, 8vw, 6rem)' }}>
                <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    {liveCourses.map((c) => (
                      <motion.article
                        key={c._id}
                        variants={fadeUp}
                        style={{
                          background: 'var(--lr-surface)',
                          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                          border: '1px solid var(--lr-rule)',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div className="flex items-center justify-between mb-6">
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
                            · {c.level}
                          </span>
                        </div>
                        <h3 style={{ minHeight: '3em' }}>{c.title}</h3>
                        <p className="mt-4 mb-6" style={{ fontSize: '0.9375rem', flexGrow: 1 }}>
                          {c.description}
                        </p>
                        <div
                          className="lr-mono"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.5rem 1rem',
                            fontSize: '0.6875rem',
                            paddingTop: '1.25rem',
                            marginBottom: '1.5rem',
                            borderTop: '1px solid var(--lr-rule)',
                            color: 'var(--lr-ink-soft)',
                          }}
                        >
                          <span>{c.duration}</span>
                          <span style={{ textAlign: 'right' }}>{c.lessons} lekcji</span>
                          <span className="lr-accent" style={{ fontSize: '1rem' }}>
                            {c.price} zł
                          </span>
                        </div>
                        <Link
                          href={`/kursy/${c.slug.current}`}
                          className="lr-cta-primary"
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          Wejdź do programu
                          <span aria-hidden>→</span>
                        </Link>
                      </motion.article>
                    ))}
                  </motion.div>
                </div>
              </section>
            ) : null}

            {/* Waitlist programs dla kobiet */}
            <section
              style={{
                padding: 'clamp(4rem, 8vw, 7rem) 0',
                borderTop: '1px solid var(--lr-rule)',
              }}
            >
              <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="mb-10 md:mb-14 flex items-end justify-between flex-wrap gap-6">
                  <div>
                    <span className="lr-eyebrow">Waitlist · pierwsze 200 osób −40%</span>
                    <h2 className="mt-6" style={{ maxWidth: '20ch' }}>
                      Trzy programy dla{' '}
                      <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                        kobiet.
                      </span>{' '}
                      Wkrótce.
                    </h2>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  {kobietyWaitlist.map((c) => (
                    <motion.article
                      key={c.id}
                      variants={fadeUp}
                      style={{
                        background: 'var(--lr-surface)',
                        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                        border: '1px solid var(--lr-rule)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div className="flex items-center justify-between mb-6">
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
                      <div
                        className="lr-mono"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.625rem',
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: 'var(--lr-accent)',
                          padding: '0.45rem 0.75rem',
                          border: '1px solid var(--lr-accent)',
                          borderRadius: '999px',
                          alignSelf: 'flex-start',
                          marginBottom: '1.25rem',
                          background: 'rgba(201, 242, 79, 0.06)',
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'var(--lr-accent)',
                            boxShadow: '0 0 8px var(--lr-accent)',
                            display: 'inline-block',
                          }}
                        />
                        coming soon · {c.launch}
                      </div>
                      <h3 style={{ minHeight: '3em' }}>{c.title}</h3>
                      <p className="mt-4 mb-8" style={{ fontSize: '0.9375rem', flexGrow: 1 }}>
                        {c.description}
                      </p>
                      <div
                        className="lr-mono"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '0.5rem 1rem',
                          fontSize: '0.6875rem',
                          paddingTop: '1.25rem',
                          marginBottom: '1.5rem',
                          borderTop: '1px solid var(--lr-rule)',
                          color: 'var(--lr-ink-soft)',
                        }}
                      >
                        <span>{c.duration}</span>
                        <span style={{ textAlign: 'right' }}>{c.lessons}</span>
                        <span className="lr-accent">{c.price}</span>
                      </div>
                      <Link
                        href="/#newsletter"
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
          </motion.div>
        )}

        {segment === 'mezczyzni' && (
          <SoonPanel
            key="mezczyzni"
            title="Dla mężczyzn"
            subtitle="W przygotowaniu"
            description="Programy o testosteronie, śnie, wydajności fizycznej i regeneracji dla mężczyzn 25–45 lat. Wszystkie oparte na badaniach. Zapisz się, dam znać kiedy będą gotowe."
            note="Zacznij od bezpłatnego Protokołu #001. Działa niezależnie od płci."
          />
        )}

        {segment === 'dzieci' && (
          <SoonPanel
            key="dzieci"
            title="Dla dzieci"
            subtitle="W przygotowaniu"
            description='Programy o czystym domu, diecie dla dzieci, kosmetykach non-toxic i fizycznym rozwoju. Dla rodziców, którzy chcą bardziej niż „kup kolorową kapsułkę”.'
            note="Zacznij od bezpłatnego Protokołu #001. Wiele zasad przekłada się na całą rodzinę."
          />
        )}
      </AnimatePresence>

      {/* Disclaimer */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--lr-rule)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p
            className="lr-mono"
            style={{
              color: 'var(--lr-ink-dim)',
              fontSize: '0.625rem',
              letterSpacing: '0.22em',
              lineHeight: 1.8,
            }}
          >
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady
            medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu
            życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </section>
    </main>
  )
}

function SoonPanel({
  title,
  subtitle,
  description,
  note,
}: {
  title: string
  subtitle: string
  description: string
  note: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', borderTop: '1px solid var(--lr-rule)' }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        <span className="lr-eyebrow">{subtitle}</span>
        <h2 className="mt-6" style={{ maxWidth: '20ch', margin: '1.5rem auto 0' }}>
          <span className="lr-rose" style={{ fontStyle: 'italic' }}>
            {title}
          </span>
        </h2>
        <p className="mt-8" style={{ maxWidth: '44ch', margin: '2rem auto 0', fontSize: '1rem' }}>
          {description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/#newsletter" className="lr-cta-primary">
            Zapisz mnie na waitlist
            <span aria-hidden>→</span>
          </Link>
          <Link href="/" className="lr-cta-ghost">
            Pobierz Protokół #001
          </Link>
        </div>
        <p
          className="lr-mono mt-8"
          style={{
            fontSize: '0.625rem',
            color: 'var(--lr-ink-dim)',
            letterSpacing: '0.22em',
            maxWidth: '50ch',
            margin: '2rem auto 0',
          }}
        >
          {note}
        </p>
      </div>
    </motion.section>
  )
}
