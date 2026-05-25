'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { subscribeEmail } from '@/lib/newsletter'

const EASE = [0.22, 1, 0.36, 1] as const
const STORAGE_KEY = 'bhm_exit_popup_seen'

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle')

  const trigger = useCallback(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    sessionStorage.setItem(STORAGE_KEY, '1')
    setOpen(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY)) return

    // Grace period — nic się nie pojawi przez pierwsze 12s na stronie
    let armed = false
    const armTimer = window.setTimeout(() => { armed = true }, 12000)

    // Desktop — realny exit intent: mysz ucieka poza górną krawędź okna
    const onMouseOut = (e: MouseEvent) => {
      if (!armed) return
      if (e.clientY <= 0 && !e.relatedTarget) trigger()
    }

    // Mobile + desktop — czytelnik zaangażowany: przescrollował 60% strony
    const onScroll = () => {
      if (!armed) return
      const el = document.documentElement
      const denom = el.scrollHeight - el.clientHeight
      if (denom <= 0) return
      const progress = el.scrollTop / denom
      if (progress >= 0.6) trigger()
    }

    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(armTimer)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [trigger])

  const close = () => setOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    const { ok } = await subscribeEmail(email, 'exit-intent')
    if (ok) {
      setStatus('sent')
      setEmail('')
      setTimeout(close, 2200)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          style={{ background: 'rgba(8, 8, 8, 0.78)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            className="lab-rose relative w-full max-w-md"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--lr-surface)',
              border: '1px solid var(--lr-rule-strong)',
              borderRadius: '2px',
              padding: 'clamp(2rem, 5vw, 2.75rem)',
              boxShadow: '0 32px 80px -20px rgba(0,0,0,0.7)',
            }}
          >
            <button
              onClick={close}
              aria-label="Zamknij"
              className="absolute top-3 right-3 p-1.5 transition-opacity hover:opacity-70"
              style={{ color: 'var(--lr-ink-dim)' }}
            >
              <X size={18} />
            </button>

            {status === 'sent' ? (
              <div className="text-center py-6">
                <p
                  className="lr-mono"
                  style={{ color: 'var(--lr-accent)', fontSize: '0.9375rem', letterSpacing: '0.04em' }}
                >
                  ✓ Gotowe! Sprawdź skrzynkę.
                </p>
              </div>
            ) : (
              <>
                <span className="lr-eyebrow" style={{ fontSize: '0.625rem' }}>
                  Zaczekaj chwilę
                </span>
                <h3 className="mt-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', lineHeight: 1.15 }}>
                  Zaczekaj! Nie wychodź
                  <br />z{' '}
                  <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                    pustymi rękami.
                  </span>
                </h3>
                <p
                  className="mt-4"
                  style={{ fontSize: '0.9375rem', color: 'var(--lr-ink-soft)', lineHeight: 1.6 }}
                >
                  Odbierz bezpłatny Poranny Protokół: 7 kroków, 8 minut, mierzalna różnica
                  w 14 dni. Do tego cotygodniowa dawka konkretu w Twojej skrzynce.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@email.pl"
                    className="lr-mono"
                    style={{
                      width: '100%',
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
                    style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                  >
                    {status === 'loading' ? 'Zapisuję…' : 'Pobierz protokół'}
                    {status !== 'loading' && <span aria-hidden>→</span>}
                  </button>
                </form>

                <p
                  className="mt-4 lr-mono text-center"
                  style={{ color: 'var(--lr-ink-dim)', fontSize: '0.625rem', letterSpacing: '0.18em' }}
                >
                  Bez spamu · jedno kliknięcie żeby się wypisać
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
