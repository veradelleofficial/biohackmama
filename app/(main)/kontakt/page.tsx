'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react'
import PageHeader from '@/components/lab-rose/PageHeader'

const EASE = [0.22, 1, 0.36, 1] as const

const channels = [
  { icon: Instagram, label: '@biohackmama', href: 'https://instagram.com/biohackmama' },
  { icon: Instagram, label: '@veradelleofficial', href: 'https://instagram.com/veradelleofficial' },
  { icon: Facebook, label: 'Facebook · BioHackMama', href: '#' },
  { icon: Youtube, label: 'YouTube · BioHackMama', href: '#' },
  { icon: Mail, label: 'contact@biohackmama.pl', href: 'mailto:contact@biohackmama.pl' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Kontakt · 007"
        meta="ODP. < 48H"
        title={
          <>
            Napisz do mnie.{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              Odpisuję osobiście.
            </span>
          </>
        }
        description="Masz pytanie, propozycję współpracy lub chcesz po prostu się przywitać? Chętnie Cię wysłucham."
      />

      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(5rem, 9vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="lr-eyebrow">Formularz</span>
              {submitted ? (
                <div
                  className="mt-8"
                  style={{
                    padding: '2.5rem',
                    border: '1px solid var(--lr-accent)',
                    background: 'rgba(201, 242, 79, 0.05)',
                  }}
                >
                  <span
                    className="lr-mono lr-accent"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.22em' }}
                  >
                    ✓ ODEBRANE
                  </span>
                  <h3 className="mt-4 mb-3">Wiadomość wysłana.</h3>
                  <p style={{ maxWidth: '40ch' }}>
                    Dziękuję. Odpowiem osobiście w ciągu 48h. Sprawdź też folder spam, na wszelki
                    wypadek.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="lr-cta-ghost mt-6"
                  >
                    Napisz znowu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="lr-mono block mb-2"
                        style={{
                          fontSize: '0.625rem',
                          color: 'var(--lr-ink-dim)',
                          letterSpacing: '0.22em',
                        }}
                      >
                        IMIĘ
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="lr-mono"
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          background: 'var(--lr-bg)',
                          border: '1px solid var(--lr-rule-strong)',
                          color: 'var(--lr-ink)',
                          fontSize: '0.875rem',
                          letterSpacing: '0.04em',
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="lr-mono block mb-2"
                        style={{
                          fontSize: '0.625rem',
                          color: 'var(--lr-ink-dim)',
                          letterSpacing: '0.22em',
                        }}
                      >
                        E-MAIL
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="lr-mono"
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          background: 'var(--lr-bg)',
                          border: '1px solid var(--lr-rule-strong)',
                          color: 'var(--lr-ink)',
                          fontSize: '0.875rem',
                          letterSpacing: '0.04em',
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="lr-mono block mb-2"
                      style={{
                        fontSize: '0.625rem',
                        color: 'var(--lr-ink-dim)',
                        letterSpacing: '0.22em',
                      }}
                    >
                      TEMAT
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="lr-mono"
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        background: 'var(--lr-bg)',
                        border: '1px solid var(--lr-rule-strong)',
                        color: 'var(--lr-ink)',
                        fontSize: '0.875rem',
                        letterSpacing: '0.04em',
                        borderRadius: '2px',
                      }}
                    >
                      <option value="">Wybierz...</option>
                      <option value="pytanie">Pytanie o protokół</option>
                      <option value="wspolpraca">Propozycja współpracy</option>
                      <option value="recenzja">Recenzja / feedback</option>
                      <option value="bug">Błąd na stronie</option>
                      <option value="inne">Inne</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="lr-mono block mb-2"
                      style={{
                        fontSize: '0.625rem',
                        color: 'var(--lr-ink-dim)',
                        letterSpacing: '0.22em',
                      }}
                    >
                      WIADOMOŚĆ
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="lr-mono"
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        background: 'var(--lr-bg)',
                        border: '1px solid var(--lr-rule-strong)',
                        color: 'var(--lr-ink)',
                        fontSize: '0.875rem',
                        letterSpacing: '0.04em',
                        borderRadius: '2px',
                        resize: 'vertical',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="lr-cta-primary lr-cta-primary--rose"
                    style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.6 : 1 }}
                  >
                    {sending ? 'Wysyłam...' : 'Wyślij wiadomość'}
                    <span aria-hidden>→</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Channels */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              <span className="lr-eyebrow">Kanały bezpośrednie</span>
              <h3 className="mt-6">Wolisz krócej?</h3>
              <p className="mt-4" style={{ maxWidth: '38ch' }}>
                Najszybciej znajdziesz mnie na Instagramie. Odpisuję na wiadomości codziennie,
                tak samo szybko jak na maile.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
                {channels.map((ch, i) => {
                  const Icon = ch.icon
                  return (
                    <li
                      key={i}
                      style={{
                        borderTop: i === 0 ? '1px solid var(--lr-rule)' : undefined,
                        borderBottom: '1px solid var(--lr-rule)',
                      }}
                    >
                      <a
                        href={ch.href}
                        target={ch.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="lr-footer-link"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem 0',
                          color: 'var(--lr-ink)',
                          textDecoration: 'none',
                          transition: 'color 200ms var(--ease-out-strong)',
                        }}
                      >
                        <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--lr-rose)' }} />
                        <span
                          style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem' }}
                        >
                          {ch.label}
                        </span>
                        <span style={{ marginLeft: 'auto', color: 'var(--lr-ink-dim)' }}>→</span>
                      </a>
                    </li>
                  )
                })}
              </ul>

            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
