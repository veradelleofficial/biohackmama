'use client'

import { useState } from 'react'
import Link from 'next/link'
import { subscribeEmail } from '@/lib/newsletter'
import LeadMagnetCard, { type LeadMagnet } from './LeadMagnetCard'

const MATERIALS: LeadMagnet[] = [
  {
    slug: 'poranny-protokol',
    title: 'Poranny Protokół Mamy',
    desc: '7 kroków, 8 minut, mierzalna różnica w 14 dni. PDF z protokołem i checklistą do druku.',
    format: 'PDF',
    img: '/images/mat-poranny-protokol.jpg',
    accent: '#C9F24F',
    phBg: 'linear-gradient(135deg, #14180a, #2c3d11)',
    source: 'lead:pozostale-darmowe-materialy',
    hideForm: true,
  },
  {
    slug: 'lista-zbednikow',
    title: 'Lista zbędników z drogerii',
    desc: '12 produktów z chemią, które warto wyrzucić, i czym je zastąpić. Low-tox start w jeden wieczór.',
    format: 'Checklist',
    img: '/images/mat-lista-zbednikow.jpg',
    accent: '#E8AEBD',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
    source: 'lead:pozostale-darmowe-materialy',
    hideForm: true,
  },
  {
    slug: 'dziennik-snu',
    title: 'Dziennik snu - 14 dni',
    desc: 'Prosty tracker do śledzenia jakości snu, energii i nawyków. Zobacz wzorce, zanim zmienisz cokolwiek.',
    format: 'PDF',
    img: '/images/mat-dziennik-snu.jpg',
    accent: '#4cc9f0',
    phBg: 'linear-gradient(135deg, #09131a, #112a3d)',
    source: 'lead:pozostale-darmowe-materialy',
    hideForm: true,
  },
  {
    slug: 'audyt-sypialni-dziecka',
    title: 'Audyt sypialni dziecka',
    desc: 'Checklista czystego, bezpiecznego snu malucha: światło, powietrze, materiały, EMF. Punkt po punkcie.',
    format: 'Checklist',
    img: '/images/mat-audyt-sypialni.jpg?v=2',
    accent: '#9be35a',
    phBg: 'linear-gradient(135deg, #111a09, #253d11)',
    source: 'lead:pozostale-darmowe-materialy',
    hideForm: true,
  },
  {
    slug: 'cykl-w-praktyce',
    title: 'Cykl w praktyce',
    desc: 'Co jeść, kiedy trenować i jak się regenerować w każdej fazie cyklu. Ściąga na lodówkę.',
    format: 'PDF',
    img: '/images/mat-cykl-w-praktyce.jpg',
    accent: '#E8AEBD',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
    source: 'lead:pozostale-darmowe-materialy',
    hideForm: true,
  },
  {
    slug: 'suplementacja-bez-bzdur',
    title: 'Suplementacja bez bzdur',
    desc: 'Czy naprawdę musimy tyle suplementować? Naturalna suplementacja, suplementy must-have i konkretne marki z czystym składem. Jakie polecam, a jakich unikać.',
    format: 'eBook',
    img: '/images/mat-suplementacja.jpg',
    accent: '#45d6c4',
    phBg: 'linear-gradient(135deg, #09181a, #11383d)',
    source: 'lead:pozostale-darmowe-materialy',
    hideForm: true,
  },
]

export default function RemainingMaterialsSection() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !consent || status === 'loading') return
    setStatus('loading')
    const { ok } = await subscribeEmail(email, 'lead:pozostale-darmowe-materialy')
    if (ok) {
      setStatus('sent')
      setEmail('')
      setConsent(false)
    } else {
      setStatus('error')
    }
  }

  return (
    <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(4rem, 9vw, 8rem)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-10">
          <span className="lr-eyebrow">// POZOSTAŁE MATERIAŁY</span>
          <h3 style={{ marginTop: '0.75rem', fontSize: '1.125rem', fontWeight: 500 }}>
            Jeden email - 6 materiałów do pobrania
          </h3>
        </div>

        {/* Grid of materials */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {MATERIALS.map((m) => (
            <LeadMagnetCard key={m.slug} m={m} />
          ))}
        </div>

        {/* Shared form */}
        <div
          style={{
            maxWidth: '560px',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            border: '1px solid var(--lr-rule)',
            background: 'var(--lr-bg)',
          }}
        >
  
          {/* Form or success state */}
          {status === 'sent' ? (
            <div
              style={{
                padding: '1rem',
                background: 'rgba(201, 242, 79, 0.08)',
                border: '1px solid var(--lr-lime)',
                borderRadius: '4px',
                color: 'var(--lr-lime)',
              }}
            >
              ✓ Gotowe! Sprawdź skrzynkę - wszystkie materiały już do Ciebie lecą.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.pl"
                className="lr-lead-card__input lr-mono"
                aria-label="Email — wszystkie materiały"
                style={{ width: '100%' }}
              />
              <label className="lr-lead-card__consent" style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  style={{ marginTop: '2px', minWidth: '20px' }}
                />
                <span style={{ fontSize: '0.875rem' }}>
                  Zapisując się akceptuję{' '}
                  <Link href="/polityka-prywatnosci" target="_blank" className="lr-lead-card__link">
                    politykę prywatności
                  </Link>{' '}
                  i zgadzam się na otrzymywanie newslettera.
                </span>
              </label>
              <button
                type="submit"
                className="lr-cta-primary"
                disabled={status === 'loading' || !consent}
                style={{ width: '100%', justifyContent: 'center', opacity: !consent || status === 'loading' ? 0.6 : 1 }}
              >
                {status === 'loading' ? 'Wysyłam…' : 'Odbierz 6 materiałów'}
                {status !== 'loading' && <span aria-hidden>→</span>}
              </button>
              {status === 'error' && (
                <p className="lr-lead-card__err">Coś poszło nie tak. Spróbuj ponownie.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
