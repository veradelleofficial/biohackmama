'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { subscribeEmail } from '@/lib/newsletter'

const EASE = [0.22, 1, 0.36, 1] as const

export interface LeadMagnet {
  slug: string
  title: string
  desc: string
  format: string
  img: string | null
  accent: string
  phBg: string
  /** Two-step flow: first show "Odbierz dostęp" button, reveal email form on click */
  twoStep?: boolean
  /** Custom source tag for automation filtering (defaults to `lead:${slug}`) */
  source?: string
  /** Hide form and show only card content */
  hideForm?: boolean
}

export default function LeadMagnetCard({ m }: { m: LeadMagnet }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  // For two-step flow: form is hidden until user clicks "Odbierz dostęp"
  const [revealed, setRevealed] = useState(!m.twoStep)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !consent || status === 'loading') return
    setStatus('loading')
    const source = m.source || `lead:${m.slug}`
    const { ok } = await subscribeEmail(email, source)
    if (ok) {
      setStatus('sent')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  return (
    <div
      className="lr-lead-card"
      style={{ ['--lead-accent' as any]: m.accent }}
    >
      {/* Media */}
      <div className="lr-lead-card__media">
        {m.img ? (
          <Image src={m.img} alt={m.title} width={760} height={460} sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="lr-lead-card__media-ph" style={{ background: m.phBg, color: m.accent }}>
            grafika wkrótce
          </div>
        )}
        <span className="lr-lead-card__format">{m.format}</span>
      </div>

      <h3 className="lr-lead-card__title">{m.title}</h3>
      <p className="lr-lead-card__desc">{m.desc}</p>

      {!m.hideForm && (status === 'sent' ? (
        <p className="lr-lead-card__success">
          ✓ Gotowe! Sprawdź skrzynkę - materiał już do Ciebie leci.
        </p>
      ) : !revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="lr-cta-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Odbierz dostęp
          <span aria-hidden>→</span>
        </button>
      ) : (
        <AnimatePresence mode="wait">
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="lr-lead-card__form"
            initial={m.twoStep ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {m.twoStep && (
              <p
                className="lr-mono"
                style={{
                  fontSize: '0.6875rem',
                  color: 'var(--lead-accent)',
                  letterSpacing: '0.12em',
                  lineHeight: 1.5,
                  marginBottom: '0.25rem',
                }}
              >
                Wpisz email i otrzymasz materiał PDF mailowo.
              </p>
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              className="lr-lead-card__input lr-mono"
              aria-label={`Email — ${m.title}`}
              autoFocus={m.twoStep}
            />
            <label className="lr-lead-card__consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <span>
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
              {status === 'loading' ? 'Wysyłam…' : 'Odbierz materiał'}
              {status !== 'loading' && <span aria-hidden>→</span>}
            </button>
            {status === 'error' && (
              <p className="lr-lead-card__err">Coś poszło nie tak. Spróbuj ponownie.</p>
            )}
          </motion.form>
        </AnimatePresence>
      ))}
    </div>
  )
}
