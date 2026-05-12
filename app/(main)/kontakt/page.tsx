'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Facebook, Youtube, Clock, Send } from 'lucide-react'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/biohackmama', handle: '@biohackmama' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/veradelleofficial', handle: '@veradelleofficial' },
  { icon: Facebook, label: 'Facebook', href: '#', handle: 'BioHackMama' },
  { icon: Youtube, label: 'YouTube', href: '#', handle: 'BioHackMama' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // TODO: integrate with email service (Resend, SendGrid, etc.)
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs tracking-cta font-medium mb-4 md:mb-6 border border-primary/20 uppercase">
            KONTAKT
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal tracking-heading mb-4 md:mb-5">
            Napisz do mnie
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Masz pytanie, propozycję współpracy lub chcesz po prostu się przywitać? Chętnie Cię wysłucham.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/60 text-center shadow-coastal-sm">
                <div className="inline-block p-4 bg-coastal-gold/10 rounded-full mb-5">
                  <Send className="w-8 h-8 text-coastal-gold" />
                </div>
                <h3 className="text-2xl font-heading font-normal tracking-heading mb-3">
                  Wiadomość wysłana!
                </h3>
                <p className="font-light mb-6" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                  Dziękuję za kontakt. Odpowiem najszybciej jak to możliwe.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-coastal-ocean/30 text-coastal-slate rounded-2xl hover:bg-secondary/10 transition-all duration-300 text-cta text-sm"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl p-6 md:p-8 border border-border/60 shadow-coastal-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'rgba(72, 89, 107, 0.8)' }}>
                      Imię
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Twoje imię"
                      className="w-full px-4 py-3 bg-background border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'rgba(72, 89, 107, 0.8)' }}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="twoj@email.pl"
                      className="w-full px-4 py-3 bg-background border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'rgba(72, 89, 107, 0.8)' }}>
                    Temat
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all duration-300 text-sm"
                  >
                    <option value="">Wybierz temat...</option>
                    <option value="general">Pytanie ogólne</option>
                    <option value="courses">Kursy i ebooki</option>
                    <option value="collab">Współpraca</option>
                    <option value="support">Pomoc techniczna</option>
                    <option value="other">Inne</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'rgba(72, 89, 107, 0.8)' }}>
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Twoja wiadomość..."
                    className="w-full px-4 py-3 bg-background border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all duration-300 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-6 py-3.5 bg-coastal-gold text-white rounded-2xl hover:brightness-110 hover:shadow-coastal transition-all duration-300 text-cta text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Email */}
            <div className="bg-card rounded-3xl p-6 border border-border/60 shadow-coastal-sm">
              <div className="inline-block p-3 bg-secondary/15 rounded-2xl mb-3">
                <Mail className="w-5 h-5 text-coastal-ocean" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1 tracking-heading">Email</h3>
              <a
                href="mailto:contact@biohackmama.pl"
                className="text-sm text-coastal-gold hover:text-coastal-gold/80 transition-colors"
              >
                contact@biohackmama.pl
              </a>
            </div>

            {/* Response time */}
            <div className="bg-card rounded-3xl p-6 border border-border/60 shadow-coastal-sm">
              <div className="inline-block p-3 bg-secondary/15 rounded-2xl mb-3">
                <Clock className="w-5 h-5 text-coastal-ocean" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1 tracking-heading">Czas odpowiedzi</h3>
              <p className="text-sm font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                Staram się odpowiadać w ciągu 24-48 godzin
              </p>
            </div>

            {/* Social */}
            <div className="bg-card rounded-3xl p-6 border border-border/60 shadow-coastal-sm">
              <h3 className="font-heading font-semibold text-lg mb-4 tracking-heading">Social media</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-3 text-sm text-coastal-slate hover:text-coastal-gold transition-colors duration-300 group"
                  >
                    <div className="p-2 bg-secondary/15 rounded-xl group-hover:bg-secondary/25 transition-colors duration-300">
                      <social.icon className="w-4 h-4 text-coastal-ocean" />
                    </div>
                    <div>
                      <p className="font-medium">{social.label}</p>
                      <p className="text-xs text-muted-foreground">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
