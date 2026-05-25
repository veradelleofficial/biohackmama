'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
}

export default function LeadMagnetCard({ m }: { m: LeadMagnet }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !consent || status === 'loading') return
    setStatus('loading')
    const { ok } = await subscribeEmail(email, `lead:${m.slug}`)
    if (ok) {
      setStatus('sent')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
      }}
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

      {status === 'sent' ? (
        <p className="lr-lead-card__success">
          ✓ Gotowe! Sprawdź skrzynkę — materiał już do Ciebie leci.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="lr-lead-card__form">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="twoj@email.pl"
            className="lr-lead-card__input lr-mono"
            aria-label={`Email — ${m.title}`}
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
        </form>
      )}
    </motion.div>
  )
}
