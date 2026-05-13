'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PageHeader from '@/components/lab-rose/PageHeader'

const EASE = [0.22, 1, 0.36, 1] as const

// ─── Concerns: realne problemy współczesnych ludzi ─────────────────────────
const CONCERNS = [
  { key: 'energia', label: 'Chroniczne zmęczenie, brak energii do życia' },
  { key: 'sen', label: 'Bezsenność, słabej jakości sen' },
  { key: 'stres', label: 'Lęk, przeciążenie psychiczne, niespokojny umysł' },
  { key: 'wypalenie', label: 'Wypalenie zawodowe, brak motywacji, utknięcie' },
  { key: 'hormony', label: 'Zaburzenia cyklu, hormony, niepłodność' },
  { key: 'autoimmun', label: 'Hashimoto, PCOS, endometrioza, autoimmunologia' },
  { key: 'metabolizm', label: 'Waga, insulinooporność, problemy metaboliczne' },
  { key: 'jelita', label: 'Problemy jelitowe, IBS, refluks, wzdęcia' },
  { key: 'skora', label: 'Skóra: trądzik dorosłych, atopia, łuszczyca' },
  { key: 'nontoxic', label: 'Chemia w domu, kosmetykach, czyste otoczenie' },
  { key: 'dzieci', label: 'Zdrowie dzieci, świadome rodzicielstwo' },
  { key: 'longevity', label: 'Długowieczność, prewencja, biomarkery' },
] as const
type ConcernKey = (typeof CONCERNS)[number]['key']

const TIME_OPTIONS = [
  { key: 'short', label: 'Mniej niż 30 minut tygodniowo' },
  { key: 'medium', label: '30 minut do 1 godziny tygodniowo' },
  { key: 'long', label: '1 do 3 godzin tygodniowo' },
  { key: 'lot', label: 'Ponad 3 godziny tygodniowo' },
] as const

// ─── Mapowanie concern → polecenia ──────────────────────────────────────────
type Recommendation = {
  article: { title: string; href: string }
  ebook: { title: string; href: string; price?: number }
  program: { title: string; href: string; status: 'live' | 'waitlist' }
  tool?: { title: string; href: string }
}

const RECOMMENDATIONS: Record<ConcernKey, Recommendation> = {
  energia: {
    article: { title: 'Skąd bierze się chroniczne zmęczenie u współczesnych kobiet', href: '/blog' },
    ebook: { title: 'Poranny Protokół', href: '/ebooki/poranny-protokol', price: 39 },
    program: { title: 'Biohacking na co dzień', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Kalkulator Snu', href: '/narzedzia/kalkulator-snu' },
  },
  sen: {
    article: { title: 'Jak naprawić rytm dobowy w 14 dni bez melatoniny', href: '/blog' },
    ebook: { title: 'Poranny Protokół', href: '/ebooki/poranny-protokol', price: 39 },
    program: { title: 'Regeneracja i sen', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Kalkulator Snu', href: '/narzedzia/kalkulator-snu' },
  },
  stres: {
    article: { title: 'Oś HPA: dlaczego współczesny stres przeciąża ciało', href: '/blog' },
    ebook: { title: 'Poranny Protokół', href: '/ebooki/poranny-protokol', price: 39 },
    program: { title: 'Regeneracja i sen', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Audyt Kortyzolu', href: '/narzedzia/audyt-kortyzolu' },
  },
  wypalenie: {
    article: { title: 'Wypalenie zawodowe to fizjologia, nie słabość', href: '/blog' },
    ebook: { title: 'Poranny Protokół', href: '/ebooki/poranny-protokol', price: 39 },
    program: { title: 'Regeneracja i sen', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Audyt Kortyzolu', href: '/narzedzia/audyt-kortyzolu' },
  },
  hormony: {
    article: { title: 'Cykl menstruacyjny jako wskaźnik zdrowia całego ciała', href: '/blog' },
    ebook: { title: 'Cykl Hormonalny w Praktyce', href: '/ebooki/cykl-hormonalny-w-praktyce', price: 59 },
    program: { title: 'Hormony w równowadze', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Tracker Cyklu i Suplementacji', href: '/narzedzia/tracker-cyklu-suplementacja' },
  },
  autoimmun: {
    article: { title: 'Hashimoto, PCOS, endometrioza: wspólne korzenie problemu', href: '/blog' },
    ebook: { title: 'Cykl Hormonalny w Praktyce', href: '/ebooki/cykl-hormonalny-w-praktyce', price: 59 },
    program: { title: 'Hormony w równowadze', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Tracker Cyklu i Suplementacji', href: '/narzedzia/tracker-cyklu-suplementacja' },
  },
  metabolizm: {
    article: { title: 'Insulinooporność: jak ją cofnąć, zanim stanie się cukrzycą', href: '/blog' },
    ebook: { title: 'Świadoma Suplementacja', href: '/ebooki/swiadoma-suplementacja', price: 49 },
    program: { title: 'Biohacking na co dzień', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Kalkulator Okna Żywieniowego', href: '/narzedzia/kalkulator-okna-zywieniowego' },
  },
  jelita: {
    article: { title: 'Jelita pierwsze, reszta potem: dlaczego IBS niszczy całe ciało', href: '/blog' },
    ebook: { title: 'Świadoma Suplementacja', href: '/ebooki/swiadoma-suplementacja', price: 49 },
    program: { title: 'Biohacking na co dzień', href: '/kursy', status: 'waitlist' },
  },
  skora: {
    article: { title: 'Trądzik dorosłych to nie kosmetyk, to hormony i jelita', href: '/blog' },
    ebook: { title: 'Świadoma Suplementacja', href: '/ebooki/swiadoma-suplementacja', price: 49 },
    program: { title: 'Hormony w równowadze', href: '/kursy', status: 'waitlist' },
  },
  nontoxic: {
    article: { title: 'Co wyrzucić z drogerii w pierwszej kolejności', href: '/blog' },
    ebook: { title: 'Świadoma Suplementacja', href: '/ebooki/swiadoma-suplementacja', price: 49 },
    program: { title: 'Biohacking na co dzień', href: '/kursy', status: 'waitlist' },
  },
  dzieci: {
    article: { title: 'Jak chronić zdrowie dziecka w toksycznym świecie', href: '/blog' },
    ebook: { title: 'Poranny Protokół', href: '/ebooki/poranny-protokol', price: 39 },
    program: { title: 'Dla dzieci, w przygotowaniu', href: '/kursy', status: 'waitlist' },
    tool: { title: 'Audyt Sypialni Dziecka', href: '/narzedzia/audyt-sypialni-dziecka' },
  },
  longevity: {
    article: { title: 'Biomarkery, które warto śledzić po 30. roku życia', href: '/blog' },
    ebook: { title: 'Świadoma Suplementacja', href: '/ebooki/swiadoma-suplementacja', price: 49 },
    program: { title: 'Biohacking na co dzień', href: '/kursy', status: 'waitlist' },
  },
}

// Słowa kluczowe w free text → priorytetowe concern
const KEYWORD_MAP: Array<{ keywords: string[]; concern: ConcernKey }> = [
  { keywords: ['energ', 'zmęczen', 'wyczerp', 'brak siły', 'osłabien', 'bez siły'], concern: 'energia' },
  { keywords: ['sen', 'bezsenność', 'budzę się', 'zasnąć', 'wyspać', 'nie śpię'], concern: 'sen' },
  { keywords: ['stres', 'kortyzol', 'lęk', 'panika', 'niespokojn', 'przeciążen'], concern: 'stres' },
  { keywords: ['wypal', 'motywacj', 'utknięt', 'utknęłam', 'sens', 'wszystko mnie'], concern: 'wypalenie' },
  { keywords: ['hormon', 'cykl', 'okres', 'menstr', 'estrogen', 'progester', 'niepłodn', 'staram się o dziecko'], concern: 'hormony' },
  { keywords: ['hashimoto', 'pcos', 'endometri', 'autoimmun', 'tarczyc', 'reumat', 'lupus'], concern: 'autoimmun' },
  { keywords: ['waga', 'tłuszcz', 'odchudz', 'metabolizm', 'cukier', 'insulin', 'oporn', 'post'], concern: 'metabolizm' },
  { keywords: ['jelit', 'ibs', 'refluks', 'wzdę', 'biegunk', 'zaparc', 'sibo', 'gluten'], concern: 'jelita' },
  { keywords: ['skór', 'trądzik', 'atopi', 'łuszczyc', 'wypryski', 'pryszcz', 'azs'], concern: 'skora' },
  { keywords: ['kosmetyk', 'toxic', 'chemi', 'czysty dom', 'pasta', 'krem', 'detergent', 'pleśń'], concern: 'nontoxic' },
  { keywords: ['dziec', 'syn', 'córk', 'niemowl', 'mama', 'rodzic', 'rodzin'], concern: 'dzieci' },
  { keywords: ['longev', 'starzen', 'biomark', 'dekad', 'lata życia', 'zdrowie na lata'], concern: 'longevity' },
]

function detectConcernFromText(text: string): ConcernKey | null {
  const lower = text.toLowerCase()
  for (const { keywords, concern } of KEYWORD_MAP) {
    if (keywords.some((k) => lower.includes(k))) return concern
  }
  return null
}

// ─── Komponent ──────────────────────────────────────────────────────────────
export default function AudytPage() {
  const [selectedConcerns, setSelectedConcerns] = useState<ConcernKey[]>([])
  const [time, setTime] = useState<string>('')
  const [freeText, setFreeText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [planEmail, setPlanEmail] = useState('')
  const [planSent, setPlanSent] = useState(false)

  const toggleConcern = (key: ConcernKey) => {
    setSelectedConcerns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const canSubmit = selectedConcerns.length > 0 && time !== ''

  // Wynik dopasowania
  const result = useMemo(() => {
    // Pierwszy concern z free text priority, jeśli jakieś keywordy złapane
    const fromText = freeText.trim() ? detectConcernFromText(freeText) : null
    const primary: ConcernKey = fromText && selectedConcerns.includes(fromText)
      ? fromText
      : selectedConcerns[0]

    if (!primary) return null
    return {
      concern: primary,
      label: CONCERNS.find((c) => c.key === primary)?.label || '',
      recs: RECOMMENDATIONS[primary],
    }
  }, [selectedConcerns, freeText])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitted(true)
    setTimeout(() => {
      document.getElementById('wynik')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleReset = () => {
    setSelectedConcerns([])
    setTime('')
    setFreeText('')
    setSubmitted(false)
    setPlanEmail('')
    setPlanSent(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!planEmail.trim()) return
    // TODO: zintegrowac z Mailchimp / ConvertKit + przeslac concern w tagach
    setPlanSent(true)
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Audyt zdrowia"
        meta="3 PYTANIA · ~ 2 MIN"
        title={
          <>
            Co chcesz{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              zmienić
            </span>{' '}
            w swoim zdrowiu?
          </>
        }
        description="Odpowiedz na 3 pytania. Na tej podstawie dopasuję Ci konkretny artykuł, ebook i program. Plus narzędzie, którego możesz użyć już dziś."
      />

      <section style={{ padding: '0 0 clamp(4rem, 8vw, 7rem)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol
              className="lr-mono flex items-center gap-2 flex-wrap"
              style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
            >
              <li><Link href="/" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>HOME</Link></li>
              <li>/</li>
              <li style={{ color: 'var(--lr-rose)' }}>AUDYT</li>
            </ol>
          </nav>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Q1: Concerns */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="lr-tool-panel"
              style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="lr-mono"
                  style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.22em' }}
                >
                  Q.01
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1.125rem, 1.7vw, 1.375rem)',
                    lineHeight: 1.25,
                    flex: 1,
                  }}
                >
                  Co Cię najbardziej dotyka? (możesz zaznaczyć kilka)
                </h3>
              </div>
              <div className="space-y-2 mt-5">
                {CONCERNS.map((c) => {
                  const isSelected = selectedConcerns.includes(c.key)
                  return (
                    <label
                      key={c.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--lr-accent)' : 'var(--lr-rule)',
                        background: isSelected ? 'rgba(201, 242, 79, 0.05)' : 'var(--lr-bg)',
                        cursor: 'pointer',
                        transition: 'all 200ms var(--ease-out-strong)',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleConcern(c.key)}
                        style={{
                          appearance: 'none',
                          width: '14px',
                          height: '14px',
                          border: '1px solid var(--lr-rule-strong)',
                          background: isSelected ? 'var(--lr-accent)' : 'transparent',
                          cursor: 'pointer',
                          flexShrink: 0,
                          boxShadow: isSelected ? 'inset 0 0 0 3px var(--lr-bg)' : 'none',
                          borderRadius: '2px',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.9375rem',
                          color: isSelected ? 'var(--lr-ink)' : 'var(--lr-ink-soft)',
                          flex: 1,
                        }}
                      >
                        {c.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </motion.div>

            {/* Q2: Time */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              className="lr-tool-panel"
              style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="lr-mono"
                  style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.22em' }}
                >
                  Q.02
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1.125rem, 1.7vw, 1.375rem)',
                    lineHeight: 1.25,
                    flex: 1,
                  }}
                >
                  Ile czasu realnie możesz poświęcić tygodniowo?
                </h3>
              </div>
              <div className="space-y-2 mt-5">
                {TIME_OPTIONS.map((opt) => {
                  const isSelected = time === opt.key
                  return (
                    <label
                      key={opt.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--lr-accent)' : 'var(--lr-rule)',
                        background: isSelected ? 'rgba(201, 242, 79, 0.05)' : 'var(--lr-bg)',
                        cursor: 'pointer',
                        transition: 'all 200ms var(--ease-out-strong)',
                      }}
                    >
                      <input
                        type="radio"
                        name="time"
                        checked={isSelected}
                        onChange={() => setTime(opt.key)}
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
                          fontSize: '0.9375rem',
                          color: isSelected ? 'var(--lr-ink)' : 'var(--lr-ink-soft)',
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

            {/* Q3: Free text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="lr-tool-panel"
              style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="lr-mono"
                  style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.22em' }}
                >
                  Q.03
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1.125rem, 1.7vw, 1.375rem)',
                    lineHeight: 1.25,
                    flex: 1,
                  }}
                >
                  Co chciałabyś zmienić najpierw? (własnymi słowami)
                </h3>
              </div>
              <textarea
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="np. Chcę przestać budzić się o 4 nad ranem i mieć energię do wieczora. Albo: cykl mi szaleje od ostatniego roku..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  background: 'var(--lr-bg)',
                  border: '1px solid var(--lr-rule-strong)',
                  color: 'var(--lr-ink)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'var(--font-inter), sans-serif',
                  borderRadius: '2px',
                }}
              />
              <p
                className="lr-mono mt-2"
                style={{
                  fontSize: '0.625rem',
                  color: 'var(--lr-ink-dim)',
                  letterSpacing: '0.18em',
                }}
              >
                OPCJONALNE · POMAGA DOPRECYZOWAĆ POLECENIE
              </p>
            </motion.div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
              <span
                className="lr-mono"
                style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
              >
                ODPOWIEDZIANO: {selectedConcerns.length > 0 ? 'Q1' : '—'} {time ? '/ Q2' : ''}
              </span>
              <button
                type="submit"
                disabled={!canSubmit}
                className="lr-cta-primary"
                style={{
                  opacity: canSubmit ? 1 : 0.4,
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                }}
              >
                {canSubmit ? 'Pokaż dopasowanie' : 'Odpowiedz na Q.01 i Q.02'}
                {canSubmit && <span aria-hidden>→</span>}
              </button>
            </div>
          </form>

          {/* Wynik */}
          <AnimatePresence>
            {submitted && result && (
              <motion.div
                id="wynik"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-16"
              >
                <div className="lr-tool-panel" style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
                  <div className="mb-8">
                    <span className="lr-eyebrow">Twoje dopasowanie</span>
                    <h2 className="mt-6" style={{ maxWidth: '22ch' }}>
                      Zacznij od{' '}
                      <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                        tego.
                      </span>
                    </h2>
                    <p className="mt-4" style={{ maxWidth: '50ch' }}>
                      Główny kierunek z twoich odpowiedzi: <strong style={{ color: 'var(--lr-ink)' }}>{result.label}</strong>. Oto co mam dla ciebie w tej chwili.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <RecCard
                      tag="ARTYKUŁ · BEZPŁATNY"
                      title={result.recs.article.title}
                      href={result.recs.article.href}
                      accent="rose"
                      cta="Czytaj"
                    />
                    <RecCard
                      tag="EBOOK"
                      title={result.recs.ebook.title}
                      href={result.recs.ebook.href}
                      price={result.recs.ebook.price}
                      accent="lime"
                      cta="Zobacz"
                    />
                    <RecCard
                      tag={result.recs.program.status === 'live' ? 'PROGRAM' : 'PROGRAM · WAITLIST'}
                      title={result.recs.program.title}
                      href={result.recs.program.href}
                      accent="rose"
                      cta={result.recs.program.status === 'live' ? 'Wejdź' : 'Zapisz mnie'}
                    />
                  </div>

                  {result.recs.tool && (
                    <div
                      className="mt-6 p-5"
                      style={{
                        background: 'rgba(201, 242, 79, 0.04)',
                        border: '1px solid var(--lr-rule-strong)',
                        borderLeft: '3px solid var(--lr-accent)',
                      }}
                    >
                      <span
                        className="lr-mono"
                        style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.22em' }}
                      >
                        BONUS · NARZĘDZIE BEZPŁATNE
                      </span>
                      <h4
                        style={{
                          marginTop: '0.5rem',
                          marginBottom: '0.5rem',
                          fontSize: '1.125rem',
                        }}
                      >
                        {result.recs.tool.title}
                      </h4>
                      <Link
                        href={result.recs.tool.href}
                        className="inline-flex items-center gap-2 group mt-2"
                        style={{ textDecoration: 'none' }}
                      >
                        <span
                          className="lr-mono"
                          style={{ color: 'var(--lr-accent)', fontSize: '0.6875rem' }}
                        >
                          Otwórz narzędzie
                        </span>
                        <span
                          style={{
                            color: 'var(--lr-accent)',
                            transition: 'transform 240ms var(--ease-out-strong)',
                          }}
                          className="group-hover:translate-x-1 inline-block"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  )}

                  {/* Konsultacja */}
                  <div
                    className="mt-8 p-5"
                    style={{
                      background: 'rgba(232, 174, 189, 0.05)',
                      border: '1px solid var(--lr-rule-strong)',
                      borderLeft: '3px solid var(--lr-rose)',
                    }}
                  >
                    <span
                      className="lr-mono"
                      style={{ fontSize: '0.625rem', color: 'var(--lr-rose)', letterSpacing: '0.22em' }}
                    >
                      INNA OPCJA
                    </span>
                    <h4 style={{ marginTop: '0.5rem', marginBottom: '0.75rem', fontSize: '1.125rem' }}>
                      Konsultacja 1:1 ze mną
                    </h4>
                    <p style={{ fontSize: '0.9375rem', maxWidth: '54ch', marginBottom: '1rem' }}>
                      30 minut rozmowy o tym, jak konkretnie wprowadzić zmiany u ciebie w domu. Pomogę ułożyć
                      plan i wybrać materiały, ale to nie jest konsultacja medyczna.
                    </p>
                    <p
                      className="lr-mono"
                      style={{
                        fontSize: '0.625rem',
                        color: 'var(--lr-ink-dim)',
                        letterSpacing: '0.18em',
                        marginBottom: '1.25rem',
                        lineHeight: 1.7,
                      }}
                    >
                      NIE JESTEM LEKARZEM ANI DIETETYKIEM. KONSULTACJA DOTYCZY WDROŻENIA STYLU ŻYCIA I DOBORU
                      MATERIAŁÓW, NIE DIAGNOZOWANIA ANI LECZENIA.
                    </p>
                    <Link
                      href="/kontakt?temat=konsultacja"
                      className="lr-cta-ghost"
                    >
                      Napisz w sprawie konsultacji
                      <span aria-hidden>→</span>
                    </Link>
                  </div>

                  {/* Newsletter — dawka wiedzy co tydzień */}
                  <div
                    className="mt-10"
                    style={{ paddingTop: '2rem', borderTop: '1px solid var(--lr-rule)' }}
                  >
                    <span className="lr-eyebrow">Newsletter</span>
                    <h3 className="mt-4 mb-3" style={{ maxWidth: '24ch' }}>
                      Co tydzień{' '}
                      <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                        dawka nowej wiedzy.
                      </span>
                    </h3>
                    <p style={{ maxWidth: '50ch', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
                      Dopisz się i raz w tygodniu dostaniesz jedną konkretną lekcję: o hormonach,
                      śnie, jelitach, kosmetykach, ziołolecznictwie. Tak jak czytasz tu, po ludzku
                      i ze źródłami.
                    </p>

                    {planSent ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          padding: '1.25rem 1.5rem',
                          border: '1px solid var(--lr-accent)',
                          background: 'rgba(201, 242, 79, 0.06)',
                        }}
                      >
                        <span
                          className="lr-mono"
                          style={{
                            fontSize: '0.6875rem',
                            color: 'var(--lr-accent)',
                            letterSpacing: '0.22em',
                            fontWeight: 600,
                          }}
                        >
                          ✓ DODANO DO LISTY
                        </span>
                        <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                          Pierwszy mejl trafi na <strong style={{ color: 'var(--lr-ink)' }}>{planEmail}</strong>{' '}
                          w najbliższy tydzień. Sprawdź też folder spam.
                        </p>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={handlePlanSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-2xl"
                      >
                        <input
                          type="email"
                          required
                          value={planEmail}
                          onChange={(e) => setPlanEmail(e.target.value)}
                          placeholder="twoj@email.pl"
                          className="lr-mono"
                          style={{
                            flex: 1,
                            padding: '1rem 1.25rem',
                            background: 'var(--lr-bg)',
                            border: '1px solid var(--lr-rule-strong)',
                            color: 'var(--lr-ink)',
                            fontSize: '0.875rem',
                            letterSpacing: '0.04em',
                            outline: 'none',
                            borderRadius: '2px',
                          }}
                        />
                        <button type="submit" className="lr-cta-primary">
                          Dopisz mnie
                          <span aria-hidden>→</span>
                        </button>
                      </form>
                    )}

                    <p
                      className="lr-mono mt-4"
                      style={{
                        fontSize: '0.625rem',
                        letterSpacing: '0.18em',
                        lineHeight: 1.7,
                      }}
                    >
                      BEZ SPAMU · WYPISZ JEDNYM KLIKNIĘCIEM
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button type="button" onClick={handleReset} className="lr-cta-ghost">
                      Zrób audyt jeszcze raz
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer */}
          <div className="mt-14 pt-8 text-center" style={{ borderTop: '1px solid var(--lr-rule)' }}>
            <p
              className="lr-mono"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.22em',
                lineHeight: 1.8,
                maxWidth: '70ch',
                margin: '0 auto',
              }}
            >
              Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady
              medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu
              życia, skonsultuj się z lekarzem.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

function RecCard({
  tag,
  title,
  href,
  price,
  accent,
  cta,
}: {
  tag: string
  title: string
  href: string
  price?: number
  accent: 'lime' | 'rose'
  cta: string
}) {
  const color = accent === 'lime' ? 'var(--lr-accent)' : 'var(--lr-rose)'
  return (
    <Link
      href={href}
      className="group block"
      style={{
        padding: '1.25rem 1.25rem 1.5rem',
        background: 'var(--lr-bg)',
        border: '1px solid var(--lr-rule)',
        textDecoration: 'none',
        transition: 'border-color 240ms var(--ease-out-strong)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="lr-mono"
          style={{ fontSize: '0.5625rem', color, letterSpacing: '0.22em' }}
        >
          {tag}
        </span>
        {price !== undefined && (
          <span
            className="lr-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--lr-accent)',
              letterSpacing: '0.18em',
            }}
          >
            {price} zł
          </span>
        )}
      </div>
      <h3
        style={{
          fontSize: '1rem',
          lineHeight: 1.25,
          color: 'var(--lr-ink)',
          marginBottom: '1rem',
          minHeight: '2.5em',
        }}
      >
        {title}
      </h3>
      <span
        className="lr-mono inline-flex items-center gap-2"
        style={{ fontSize: '0.625rem', color, letterSpacing: '0.22em' }}
      >
        {cta}
        <span
          className="group-hover:translate-x-1 inline-block"
          style={{ transition: 'transform 240ms var(--ease-out-strong)' }}
        >
          →
        </span>
      </span>
    </Link>
  )
}
