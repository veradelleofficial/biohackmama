'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '@/components/lab-rose/PageHeader'

const EASE = [0.22, 1, 0.36, 1] as const

interface Question {
  id: number
  key: string
  q: string
  short: string
  options: { label: string; points: number }[]
}

const questions: Question[] = [
  {
    id: 1,
    key: 'temperatura',
    q: 'Jaka jest temperatura w sypialni dziecka w nocy?',
    short: 'Temperatura sypialni',
    options: [
      { label: '22°C i więcej', points: 0 },
      { label: '21°C', points: 1 },
      { label: '19–20°C — optymalnie', points: 3 },
      { label: 'Nie wiem, nie mierzę', points: 0 },
    ],
  },
  {
    id: 2,
    key: 'zaciemnienie',
    q: 'Jak ciemno jest w sypialni w nocy?',
    short: 'Zaciemnienie nocy',
    options: [
      { label: 'Świeci uliczna latarnia lub nocna lampka', points: 0 },
      { label: 'Lekkie zaciemnienie, trochę światła wpada', points: 1 },
      { label: 'Częściowe rolety zaciemniające', points: 2 },
      { label: 'Pełen blackout — kompletna ciemność', points: 3 },
    ],
  },
  {
    id: 3,
    key: 'materac',
    q: 'Z czego jest materac dziecka?',
    short: 'Skład materaca',
    options: [
      { label: 'Piankowy, nie znam dokładnego składu', points: 0 },
      { label: 'Konwencjonalny sprężynowy', points: 1 },
      { label: 'Z certyfikatem OEKO-TEX lub podobnym', points: 2 },
      { label: 'Organiczny: lateks naturalny, kokos lub wełna', points: 3 },
    ],
  },
  {
    id: 4,
    key: 'kosmetyki',
    q: 'Czego używasz do kąpieli dziecka?',
    short: 'Kosmetyki do kąpieli',
    options: [
      { label: 'Klasyczna drogeria (Johnson\'s, Bambino itp.)', points: 0 },
      { label: '"Naturalne" z drogerii (Weleda, Bambino Natura)', points: 1 },
      { label: 'Eko brand z certyfikatem (Mokosh, Hagi, Natu)', points: 2 },
      { label: 'Sama mydło Aleppo lub oliwka kokosowa', points: 3 },
    ],
  },
  {
    id: 5,
    key: 'emf',
    q: 'Jak daleko od łóżka jest router WiFi i telefon w nocy?',
    short: 'EMF wokół łóżka',
    options: [
      { label: 'Telefon w łóżku, router w tym samym pokoju', points: 0 },
      { label: 'Router w tym samym pokoju, telefon dalej', points: 1 },
      { label: 'Router w innym pokoju, telefon poza sypialnią', points: 2 },
      { label: 'Wszystko poza pokojem lub WiFi wyłączone na noc', points: 3 },
    ],
  },
  {
    id: 6,
    key: 'wentylacja',
    q: 'Jak często wietrzysz sypialnię dziecka?',
    short: 'Wentylacja',
    options: [
      { label: 'Rzadko, raz w tygodniu lub mniej', points: 0 },
      { label: 'Co kilka dni krótko', points: 1 },
      { label: 'Codziennie rano przez kilka minut', points: 2 },
      { label: 'Codziennie rano i wieczorem przed snem', points: 3 },
    ],
  },
  {
    id: 7,
    key: 'niebieskie-swiatlo',
    q: 'Czy dziecko widzi ekran (TV, tablet, telefon) w ciągu 2h przed snem?',
    short: 'Niebieskie światło wieczorem',
    options: [
      { label: 'Tak, regularnie do późna', points: 0 },
      { label: 'Czasem, kilka razy w tygodniu', points: 1 },
      { label: 'Sporadycznie, z filtrem niebieskiego światła', points: 2 },
      { label: 'Nigdy w ciągu 2h przed snem', points: 3 },
    ],
  },
  {
    id: 8,
    key: 'chemia-pralni',
    q: 'Czego używasz do prania ubrań i pościeli dziecka?',
    short: 'Chemia w pralni',
    options: [
      { label: 'Klasyczne proszki (Persil, Ariel, Vizir)', points: 0 },
      { label: '"Eco" z marketu (Persil Bio, Ariel Sensitive)', points: 1 },
      { label: 'Eko marka bez parabenów (Sonett, Almawin)', points: 2 },
      { label: 'Mydlnica, orzechy piorące lub soda + ocet', points: 3 },
    ],
  },
]

const MAX_SCORE = questions.length * 3

type Status = 'biophilic' | 'dobry' | 'sredni' | 'do-poprawy'

function getStatus(percentage: number): { status: Status; label: string; color: string } {
  if (percentage >= 85) return { status: 'biophilic', label: 'BIOPHILIC SPA', color: 'var(--lr-accent)' }
  if (percentage >= 65) return { status: 'dobry', label: 'DOBRY STAN', color: 'var(--lr-accent)' }
  if (percentage >= 45) return { status: 'sredni', label: 'WYMAGA POPRAWY', color: 'var(--lr-rose)' }
  return { status: 'do-poprawy', label: 'PILNA INTERWENCJA', color: 'var(--lr-rose)' }
}

export default function AudytSypialniDziecka() {
  const [answers, setAnswers] = useState<Record<string, number | null>>(
    Object.fromEntries(questions.map((q) => [q.key, null]))
  )
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = Object.values(answers).every((v) => v !== null)

  const score = useMemo(() => {
    return Object.values(answers).reduce<number>((sum, v) => sum + (v ?? 0), 0)
  }, [answers])

  const percentage = Math.round((score / MAX_SCORE) * 100)
  const status = getStatus(percentage)

  // 3 lowest-scoring questions = priorities
  const priorities = useMemo(() => {
    return [...questions]
      .map((q) => ({ ...q, scored: answers[q.key] ?? 0 }))
      .sort((a, b) => a.scored - b.scored)
      .slice(0, 3)
  }, [answers])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allAnswered) return
    setSubmitted(true)
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleReset = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.key, null])))
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Narzędzie · 06 · Audyt"
        meta="8 PYTAŃ · ~ 3 MIN"
        title={
          <>
            Czy sypialnia twojego dziecka{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              wspiera regenerację?
            </span>
          </>
        }
        description="8 pytań o temperaturze, świetle, materacu, kosmetykach, EMF i wentylacji. Wynik na 100 punktów + lista 3 rzeczy do naprawienia najpierw."
      />

      {/* Breadcrumb */}
      <section style={{ padding: '0 0 2rem' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
          <nav aria-label="Breadcrumb">
            <ol
              className="lr-mono flex items-center gap-2 flex-wrap"
              style={{
                fontSize: '0.625rem',
                color: 'var(--lr-ink-dim)',
                letterSpacing: '0.22em',
              }}
            >
              <li>
                <Link href="/" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>
                  HOME
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/narzedzia"
                  style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}
                >
                  NARZĘDZIA
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: 'var(--lr-rose)' }}>AUDYT SYPIALNI</li>
            </ol>
          </nav>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(4rem, 8vw, 7rem)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {questions.map((q, i) => (
                <motion.div
                  key={q.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.03 }}
                  style={{
                    background: 'var(--lr-surface)',
                    border: '1px solid var(--lr-rule)',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span
                      className="lr-mono"
                      style={{
                        fontSize: '0.625rem',
                        color: 'var(--lr-accent)',
                        letterSpacing: '0.22em',
                      }}
                    >
                      Q.{String(q.id).padStart(2, '0')}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: 'clamp(1.125rem, 1.7vw, 1.375rem)',
                        lineHeight: 1.25,
                        color: 'var(--lr-ink)',
                        fontWeight: 400,
                        flex: 1,
                      }}
                    >
                      {q.q}
                    </h3>
                  </div>
                  <div className="space-y-2 mt-5">
                    {q.options.map((opt, j) => {
                      const isSelected = answers[q.key] === opt.points
                      return (
                        <label
                          key={j}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1rem',
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--lr-accent)' : 'var(--lr-rule)',
                            background: isSelected ? 'rgba(201, 242, 79, 0.04)' : 'var(--lr-bg)',
                            cursor: 'pointer',
                            transition: 'all 200ms var(--ease-out-strong)',
                          }}
                        >
                          <input
                            type="radio"
                            name={q.key}
                            value={opt.points}
                            checked={isSelected}
                            onChange={() =>
                              setAnswers((prev) => ({ ...prev, [q.key]: opt.points }))
                            }
                            style={{
                              appearance: 'none',
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              border: '1px solid var(--lr-rule-strong)',
                              background: isSelected ? 'var(--lr-accent)' : 'transparent',
                              cursor: 'pointer',
                              flexShrink: 0,
                              boxShadow: isSelected ? 'inset 0 0 0 3px var(--lr-bg)' : 'none',
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.875rem',
                              color: isSelected ? 'var(--lr-ink)' : 'var(--lr-ink-soft)',
                              transition: 'color 200ms',
                              flex: 1,
                            }}
                          >
                            {opt.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
              <span
                className="lr-mono"
                style={{
                  fontSize: '0.625rem',
                  color: 'var(--lr-ink-dim)',
                  letterSpacing: '0.22em',
                }}
              >
                ODPOWIEDZIANO: {Object.values(answers).filter((v) => v !== null).length} / {questions.length}
              </span>
              <button
                type="submit"
                disabled={!allAnswered}
                className="lr-cta-primary"
                style={{
                  opacity: allAnswered ? 1 : 0.4,
                  cursor: allAnswered ? 'pointer' : 'not-allowed',
                }}
              >
                {allAnswered ? 'Pokaż wynik' : 'Odpowiedz na wszystkie pytania'}
                {allAnswered && <span aria-hidden>→</span>}
              </button>
            </div>
          </form>

          {/* Result */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                id="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-16"
              >
                <div
                  style={{
                    border: `1px solid ${status.color}`,
                    background: 'var(--lr-surface)',
                    padding: 'clamp(2rem, 4vw, 3rem)',
                  }}
                >
                  <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
                    <span className="lr-eyebrow">Wynik audytu</span>
                    <span
                      className="lr-mono"
                      style={{
                        fontSize: '0.625rem',
                        color: status.color,
                        letterSpacing: '0.22em',
                        fontWeight: 600,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: 'clamp(4rem, 10vw, 7rem)',
                        color: status.color,
                        lineHeight: 1,
                        fontWeight: 300,
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {percentage}
                    </span>
                    <span
                      className="lr-mono"
                      style={{
                        fontSize: '1rem',
                        color: 'var(--lr-ink-dim)',
                        letterSpacing: '0.18em',
                      }}
                    >
                      / 100
                    </span>
                  </div>

                  <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                    {percentage >= 85
                      ? 'Sypialnia twojego dziecka jest praktycznie laboratorium snu. Tak trzymaj — to jeden z najlepszych biohacków, jakie możesz dać dziecku.'
                      : percentage >= 65
                      ? 'Solidnie. Większość rzeczy działa, ale kilka detali da się jeszcze podkręcić. Zobacz priorytety poniżej.'
                      : percentage >= 45
                      ? 'Jest co naprawiać. Sen dziecka jest gorszy niż mógłby być, a to się przekłada na cały dzień. Zacznij od 3 priorytetów.'
                      : 'Pilna interwencja. Środowisko sypialni ma realny wpływ na regenerację — kilka zmian w tym tygodniu da bardzo szybki efekt.'}
                  </p>

                  {/* Priorities */}
                  <div
                    style={{
                      paddingTop: '2rem',
                      borderTop: '1px solid var(--lr-rule)',
                    }}
                  >
                    <span className="lr-eyebrow">Priorytety · naprawi te 3 najpierw</span>
                    <ol
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        marginTop: '1.25rem',
                      }}
                    >
                      {priorities.map((p, i) => (
                        <li
                          key={p.key}
                          style={{
                            display: 'flex',
                            gap: '1rem',
                            padding: '1rem 0',
                            borderBottom:
                              i < priorities.length - 1 ? '1px solid var(--lr-rule)' : undefined,
                          }}
                        >
                          <span
                            className="lr-mono"
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--lr-accent)',
                              letterSpacing: '0.18em',
                              minWidth: '2.5ch',
                              paddingTop: '0.15rem',
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div style={{ flex: 1 }}>
                            <h4
                              style={{
                                fontFamily: 'var(--font-fraunces), serif',
                                fontSize: '1.0625rem',
                                color: 'var(--lr-ink)',
                                fontWeight: 400,
                                marginBottom: '0.25rem',
                              }}
                            >
                              {p.short}
                            </h4>
                            <p style={{ fontSize: '0.8125rem', margin: 0 }}>
                              Twoja odpowiedź:{' '}
                              {p.options.find((o) => o.points === p.scored)?.label}
                            </p>
                          </div>
                          <span
                            className="lr-mono"
                            style={{
                              fontSize: '0.625rem',
                              color: 'var(--lr-ink-dim)',
                              letterSpacing: '0.18em',
                              paddingTop: '0.25rem',
                            }}
                          >
                            {p.scored} / 3
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/#newsletter" className="lr-cta-primary">
                      Pobierz protokół czystej sypialni
                      <span aria-hidden>→</span>
                    </Link>
                    <button onClick={handleReset} className="lr-cta-ghost" type="button">
                      Powtórz audyt
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <div
            className="mt-14 pt-8 text-center"
            style={{ borderTop: '1px solid var(--lr-rule)' }}
          >
            <p
              className="lr-mono"
              style={{
                color: 'var(--lr-ink-dim)',
                fontSize: '0.625rem',
                letterSpacing: '0.22em',
                lineHeight: 1.8,
                maxWidth: '60ch',
                margin: '0 auto',
              }}
            >
              Audyt ma charakter informacyjny i edukacyjny. Wyniki nie stanowią porady medycznej.
              W razie problemów ze snem dziecka skonsultuj się z pediatrą.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
