'use client'

/**
 * Strona sprzedażowa programu "Zdrowe zamienniki" (od 2026-11-26).
 * Układ wzorowany na thestartupmom.com/community-join: jasne tło, pigułka nad
 * nagłówkiem, mikrotekst pod każdym przyciskiem, pasek z hasłami, "Dla kogo",
 * "Co dostajesz", FAQ i zapis na końcu.
 * Na start przycisk zapisuje na listę oczekujących (Brevo, tag program:zdrowe-zamienniki).
 * TEKSTY TO WERSJA ROBOCZA do poprawki przez Weronikę.
 */

import { useState } from 'react'
import { ArrowRight, Check, X, HelpCircle, Home, ListChecks, MapPin, Sparkles, Leaf, RefreshCw, Clock, Search } from 'lucide-react'
import { SWAPS, CATEGORY_LABEL } from '@/lib/zamienniki'

const MICRO = 'Płacisz raz · program zostaje u Ciebie'

function Waitlist({ id, compact = false }: { id: string; compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'program:zdrowe-zamienniki' }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="ps-done" role="status">
        <Check size={16} strokeWidth={2.2} aria-hidden="true" /> Jesteś na liście. Napiszę do Ciebie, gdy program wystartuje.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className={`ps-form ${compact ? 'ps-form--compact' : ''}`}>
      <label htmlFor={id} className="sr-only">Twój e-mail</label>
      <input
        id={id}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="twoj@email.pl"
        autoComplete="email"
      />
      <button type="submit" className="ps-btn" disabled={status === 'loading'}>
        {status === 'loading' ? 'Zapisuję…' : 'Zapisz mnie'} <ArrowRight size={15} aria-hidden="true" />
      </button>
      {status === 'error' && <span className="ps-err">Nie udało się zapisać. Sprawdź adres i spróbuj jeszcze raz.</span>}
    </form>
  )
}

/** Kod kreskowy o zróżnicowanej szerokości pasków (stały wzór, bez losowania przy renderze) */
const BAR_PATTERN = [3,1,1,2,1,3,2,1,1,1,3,1,2,2,1,1,3,1,1,2,2,1,1,3,1,1,2,1,3,1,1,2,1,1,2,3,1,1,1,2,1,3,2,1,1,2,1,1,3,1,2,1,1,2,1,3,1,1,2,1]
function Barcode() {
  let x = 0
  const bars: { x: number; w: number }[] = []
  BAR_PATTERN.forEach((w, i) => {
    if (i % 2 === 0) bars.push({ x, w })
    x += w
  })
  return (
    <div className="ps-receipt__code" aria-hidden="true">
      <svg viewBox={`0 0 ${x} 30`} preserveAspectRatio="none">
        {bars.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height="30" fill="currentColor" />)}
      </svg>
      <span>5 902811 640273</span>
    </div>
  )
}

function Micro() {
  return <span className="ps-micro">Lista oczekujących · {MICRO}</span>
}

const FOR_WHO = [
  { icon: Search, text: <>Kupujesz rzeczy z napisem <em>„naturalne”</em> i nie masz pewności, czy coś za tym stoi.</> },
  { icon: Clock, text: <>Słyszysz o teflonie, plastiku i parabenach, ale nie wiesz, <em>od czego zacząć</em> w swoim domu.</> },
  { icon: Home, text: <>Masz małe dzieci i chcesz wiedzieć, <em>czym na co dzień</em> je otaczasz.</> },
]

const INSIDE = [
  { icon: ListChecks, title: 'Listy „zamień to na to”.', body: 'Osobno kuchnia, łazienka, sypialnia i sprzątanie. Co stoi u Ciebie teraz, czym to zastąpić i dlaczego. Taką listę możesz wziąć ze sobą do sklepu.' },
  { icon: Leaf, title: 'Dwie drogi przy każdej rzeczy.', body: 'Tańsza, jeśli zależy Ci na zmianie, ale nie masz budżetu na najlepsze produkty. I droższa, jeśli chcesz zmienić swoje otoczenie na maksimum i postawić na najwyższą jakość oraz pewny skład.' },
  { icon: Search, title: 'Jak nie dać się nabrać na „eko”.', body: 'Pokazuję opakowania, które tylko udają naturalne, i trzy rzeczy, które sprawdzam w składzie, zanim cokolwiek kupię.' },
  { icon: Home, title: 'Nagrania z mojego domu.', body: 'Moje szafki, moje zakupy i to, co naprawdę u mnie stoi. Także rzeczy, które kupiłam i oddałam, bo się nie sprawdziły.' },
  { icon: MapPin, title: 'Gdzie to kupuję.', body: 'Sklepy i konkretne produkty, z których korzystam. Kiedy znajdę coś lepszego, dopisuję to do programu.' },
  { icon: RefreshCw, title: 'Od czego zacząć.', body: 'Pięć rzeczy, które zmieniłabym jako pierwsze, gdybym zaczynała jeszcze raz. Większość kosztuje mniej, niż się wydaje.' },
]

const FAQ = [
  { q: 'Muszę od razu kupić pół sklepu?', a: 'Nie. Większość zmian robisz wtedy, kiedy coś się kończy. Skończył się płyn do naczyń? Następny będzie inny. Tak przerobiłam swój dom, a portfel to przeżył.' },
  { q: 'Czy to nie wyjdzie drożej?', a: 'Niektóre rzeczy kosztują więcej, to prawda. Sporo wychodzi za to taniej, bo ocet, soda i szare mydło kosztują grosze. Przy każdym zamienniku piszę, gdzie da się zaoszczędzić.' },
  { q: 'Ile kosztuje program?', a: 'Płacisz raz i program zostaje u Ciebie na zawsze, razem z nowymi zamiennikami, które będę dopisywać. Cenę ogłoszę w dniu startu, a osoby z listy dostaną ją w mailu.' },
  { q: 'Co dostanę po zapisaniu się na listę?', a: 'Maila ode mnie, kiedy program ruszy. Nie będę Cię zasypywać wiadomościami.' },
]

export default function ProgramPage() {
  // Po jednej parze z każdej kategorii do podglądu w hero
  const preview = (['kuchnia', 'lazienka', 'sypialnia', 'dom'] as const)
    .map((c) => SWAPS.find((s) => s.category === c))
    .filter(Boolean)
    .slice(0, 3) as typeof SWAPS

  const bandWords = ['Szafka pod zlewem', 'Patelnia', 'Pudełka na jedzenie', 'Pościel', 'Odświeżacz do kontaktu', 'Kranówka', 'Materac', 'Deska do krojenia']

  return (
    <main className="bhm-sales">
      {/* ── HERO ── */}
      <section className="ps-hero">
        <div className="ps-wrap ps-hero__grid">
          <div className="ps-hero__text">
            <span className="ps-pill">Testowane w moim domu</span>
            <h1>
              Zdrowe <span className="ps-mark">zamienniki.</span>
            </h1>
            <p className="ps-lead">
              Otwórz szafkę pod zlewem. Od niej zaczniemy. Pokazuję, co stoi u mnie zamiast rzeczy z marketowej półki i gdzie to kupuję.
            </p>
            <a href="#zapis" className="ps-btn ps-btn--big">Zapisz mnie na start <ArrowRight size={16} aria-hidden="true" /></a>
            <Micro />
          </div>

          {/* Paragon z przykładowymi zamianami (wersja uproszczona, wybrana 2026-11-26) */}
          <aside className="ps-receipt" aria-label="Przykładowe zamienniki z programu">
            <div className="ps-receipt__paper">
              {preview.map((s, i) => (
                <div className="ps-receipt__item" key={s.id}>
                  <span className="ps-receipt__cat">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>{CATEGORY_LABEL[s.category]}</span>
                  </span>
                  <span className="ps-receipt__row ps-receipt__row--out">
                    <span className="ps-receipt__icon ps-receipt__icon--x" aria-label="zamiast">
                      <X size={11} strokeWidth={2.6} aria-hidden="true" />
                    </span>
                    <span className="ps-receipt__out">{s.instead.name}</span>
                  </span>
                  <span className="ps-receipt__row">
                    <span className="ps-receipt__icon ps-receipt__icon--ok" aria-label="wybierz">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="ps-receipt__in">{s.choose.name}</span>
                  </span>
                </div>
              ))}
              <div className="ps-receipt__total">
                <span>Zamieniono</span>
                <span>{preview.length}/{preview.length}</span>
              </div>
              <Barcode />
            </div>
          </aside>
        </div>
      </section>

      {/* ── PASEK Z HASŁAMI ── */}
      <div className="ps-band" aria-hidden="true">
        <div className="ps-band__track">
          {[...bandWords, ...bandWords].map((w, i) => (
            <span key={i}>{w}<i>·</i></span>
          ))}
        </div>
      </div>

      {/* ── DLA KOGO ── */}
      <section className="ps-section ps-section--tint">
        <div className="ps-wrap ps-center">
          <span className="ps-eyebrow">Dla kogo to jest</span>
          <h2>Dla tych, którzy googlują skład szamponu <span className="ps-mark">w&nbsp;kolejce do kasy.</span></h2>
          <p className="ps-sub">
            Wszystko zaczęło się u mnie po narodzinach syna. Program jest jednak dla każdego: dla mamy, dla taty i dla osoby, która właśnie urządza pierwsze mieszkanie i ma dość zgadywania.
          </p>
          <div className="ps-cards">
            {FOR_WHO.map(({ icon: Icon, text }, i) => (
              <div className="ps-card" key={i}>
                <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                <p>{text}</p>
              </div>
            ))}
          </div>
          <a href="#zapis" className="ps-btn">To o mnie <ArrowRight size={15} aria-hidden="true" /></a>
          <Micro />
        </div>
      </section>

      {/* ── CO DOSTAJESZ ── */}
      <section className="ps-section">
        <div className="ps-wrap ps-split">
          <div className="ps-split__head">
            <span className="ps-eyebrow">Program</span>
            <h2>Co znajdziesz <span className="ps-mark">w środku.</span></h2>
          </div>
          <ul className="ps-list">
            {INSIDE.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
            <li className="ps-list__extra">
              <Sparkles size={20} strokeWidth={1.6} aria-hidden="true" />
              <p>Co chwilę okazuje się, że coś, czego używamy na co dzień, jest szkodliwe, a ta lista nie ma końca. Znam to uczucie. Od lat przerabiam swój dom, żeby było w nim jak najzdrowiej, i w programie pokazuję wszystko, co już sprawdziłam.</p>
            </li>
          </ul>
        </div>
        <div className="ps-wrap ps-center ps-after-list">
          <a href="#zapis" className="ps-btn">Zapisz mnie na start <ArrowRight size={15} aria-hidden="true" /></a>
          <Micro />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ps-section ps-section--tint">
        <div className="ps-wrap ps-faq">
          <span className="ps-eyebrow">Pytania</span>
          <h2>O to pytacie najczęściej</h2>
          <div className="ps-faq__list">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary><HelpCircle size={18} strokeWidth={1.6} aria-hidden="true" />{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZAPIS ── */}
      <section className="ps-section ps-final" id="zapis">
        <div className="ps-wrap ps-center">
          <span className="ps-pill">Lista oczekujących</span>
          <h2>Zostaw maila, a napiszę, <span className="ps-mark">kiedy ruszamy.</span></h2>
          <p className="ps-sub">Zapisz się teraz i bądź w środku od pierwszego dnia. Wiadomość o starcie dostaniesz, zanim program pojawi się na Instagramie.</p>
          <Waitlist id="ps-email-final" />
          <span className="ps-micro">{MICRO}</span>
        </div>
      </section>
    </main>
  )
}
