'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { subscribeEmail } from '@/lib/newsletter'

const EASE = [0.22, 1, 0.36, 1] as const

interface Props {
  source: string
  eyebrow?: string
  heading?: React.ReactNode
  desc?: string
  cta?: string
  /** 'band' = pełnoszerokościowa sekcja z ramką, 'card' = kompaktowy box */
  variant?: 'band' | 'card'
}

export default function NewsletterInline({
  source,
  eyebrow = 'Bezpłatny start',
  heading,
  desc = 'Cotygodniowe protokoły, analizy i to, co naprawdę działa — prosto do skrzynki.',
  cta = 'Zapisz mnie',
  variant = 'band',
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    const { ok } = await subscribeEmail(email, source)
    if (ok) {
      setStatus('sent')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  const isCard = variant === 'card'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{
        background: isCard
          ? 'var(--lr-surface)'
          : 'linear-gradient(135deg, rgba(201,242,79,0.05) 0%, rgba(232,174,189,0.06) 100%)',
        border: '1px solid var(--lr-rule-strong)',
        borderRadius: '2px',
        padding: isCard ? '1.75rem 1.5rem' : 'clamp(2rem, 4vw, 3rem)',
        textAlign: isCard ? 'left' : 'center',
      }}
    >
      <span className="lr-eyebrow" style={{ fontSize: '0.625rem' }}>
        {eyebrow}
      </span>
      <h3
        className="mt-4"
        style={{
          fontSize: isCard ? '1.25rem' : 'clamp(1.5rem, 3vw, 2.25rem)',
          lineHeight: 1.15,
          maxWidth: isCard ? '22ch' : '24ch',
          margin: isCard ? '1rem 0 0' : '1rem auto 0',
        }}
      >
        {heading || (
          <>
            Poranny{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              Protokół Mamy
            </span>
            . 8 minut, 14 dni.
          </>
        )}
      </h3>
      <p
        className="mt-4"
        style={{
          fontSize: '0.9375rem',
          color: 'var(--lr-ink-soft)',
          maxWidth: isCard ? '34ch' : '46ch',
          margin: isCard ? '1rem 0 0' : '1rem auto 0',
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>

      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.p
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lr-mono mt-6"
            style={{
              color: 'var(--lr-accent)',
              fontSize: '0.8125rem',
              letterSpacing: '0.08em',
            }}
          >
            ✓ Sprawdź skrzynkę — protokół już leci do Ciebie.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className={`mt-6 flex flex-col sm:flex-row gap-3 ${isCard ? '' : 'max-w-xl mx-auto'}`}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              className="lr-mono"
              style={{
                flex: 1,
                padding: '0.95rem 1.1rem',
                background: 'var(--lr-bg)',
                border: '1px solid var(--lr-rule-strong)',
                borderRadius: '2px',
                color: 'var(--lr-ink)',
                fontSize: '0.875rem',
                letterSpacing: '0.04em',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="lr-cta-primary"
              disabled={status === 'loading'}
              style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Zapisuję…' : cta}
              {status !== 'loading' && <span aria-hidden>→</span>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status !== 'sent' && (
        <p
          className="mt-4 lr-mono"
          style={{
            color: 'var(--lr-ink-dim)',
            fontSize: '0.625rem',
            letterSpacing: '0.18em',
          }}
        >
          Bez spamu · jedno kliknięcie żeby się wypisać
        </p>
      )}
    </motion.div>
  )
}
