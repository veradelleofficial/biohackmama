'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const SCIEZKI = [
  {
    emoji: '🆘',
    title: 'SOS: Przebodźcowanie',
    desc: 'Szybkie techniki na reset układu nerwowego — oddech, nerw błędny, protokół 60 sekund.',
    color: 'from-rose-100/60 to-rose-50/40',
    border: 'border-rose-200/50',
  },
  {
    emoji: '⚡',
    title: 'Energia Mimo Braku Snu',
    desc: 'Protokół poranny, NSDR, światło słoneczne i dlaczego okulary przeciwsłoneczne rano to błąd.',
    color: 'from-amber-100/60 to-amber-50/40',
    border: 'border-amber-200/50',
  },
  {
    emoji: '🥑',
    title: 'Paliwo: Odżywianie',
    desc: 'Glukozowy rollercoaster, śniadanie wysokobiałkowe i jak jeść żeby mieć energię do wieczora.',
    color: 'from-emerald-100/60 to-emerald-50/40',
    border: 'border-emerald-200/50',
  },
  {
    emoji: '🌙',
    title: 'Sen i Regeneracja',
    desc: 'Protokoły snu, temperatura sypialni, suplementy i jak zregenerować się w 20 minut.',
    color: 'from-indigo-100/60 to-indigo-50/40',
    border: 'border-indigo-200/50',
  },
  {
    emoji: '⚖️',
    title: 'Hormony',
    desc: 'Cykl intradiański, kortyzol poranny, estrogen i progesteron — jak pracować z cyklem.',
    color: 'from-purple-100/60 to-purple-50/40',
    border: 'border-purple-200/50',
  },
]

const FAQ = [
  {
    q: 'Co to są Pigułki Wiedzy?',
    a: 'Krótkie materiały 3-5 minut w formacie audio i wideo, do każdego dołączony jednostronicowy cheat sheet PDF. Zero teorii — tylko konkretny krok do zrobienia dziś.',
  },
  {
    q: 'Jak mogę słuchać nagrań audio?',
    a: 'Każdą pigułkę odsłuchasz bezpośrednio na stronie. W przyszłości planuję też prywatny feed podcastu do Spotify i Apple Podcasts — idealny do słuchania na spacerze lub gotując obiad.',
  },
  {
    q: 'Kiedy mogę anulować subskrypcję?',
    a: 'W dowolnym momencie — bez zobowiązań i ukrytych opłat. Dostęp masz do końca opłaconego okresu.',
  },
  {
    q: 'Jak często pojawiają się nowe pigułki?',
    a: 'Plan to minimum 2 nowe pigułki tygodniowo. Batching — nagrywam blok treści co miesiąc, żeby zachować jakość i spójność.',
  },
  {
    q: 'Czy treści są dostosowane do mam?',
    a: 'Tak — każda pigułka jest projektowana z myślą o zapracowanych mamach. Format 3-5 min pasuje na spacer z wózkiem, gotowanie obiadu czy przejazd autem.',
  },
]

function SubscribeButton() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!isSignedIn) {
      router.push('/sign-up?redirect=/premium')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Coś poszło nie tak. Spróbuj ponownie.')
        setLoading(false)
      }
    } catch {
      alert('Błąd połączenia. Spróbuj ponownie.')
      setLoading(false)
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={loading}
      whileHover={!loading ? { scale: 1.03, boxShadow: '0 8px 28px rgba(166,138,105,0.38)' } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      transition={{ duration: 0.18 }}
      className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all duration-200 disabled:opacity-60"
      style={{ background: 'linear-gradient(135deg, #A68A69, #8a7058)' }}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Przekierowuję...
        </span>
      ) : isSignedIn ? (
        'Subskrybuj teraz'
      ) : (
        'Zarejestruj się i subskrybuj'
      )}
    </motion.button>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm md:text-base pr-4" style={{ color: '#213a50' }}>{q}</span>
        <span className="text-coastal-gold flex-shrink-0 text-lg leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="text-sm font-light pb-4 leading-relaxed" style={{ color: 'rgba(72,89,107,0.75)' }}>
          {a}
        </p>
      )}
    </div>
  )
}

export default function PremiumPage() {
  return (
    <main className="pb-16 md:pb-24">
      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-14 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-coastal-sand via-background to-background" />
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="flex justify-center mb-3">
              <Image src="/images/icon.webp" alt="" width={64} height={64} className="h-14 md:h-16 w-auto" />
            </div>
            <span className="inline-block px-4 py-1.5 bg-coastal-gold/10 text-coastal-gold border border-coastal-gold/25 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-5">
              Premium
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-normal tracking-heading mb-5" style={{ color: '#213a50' }}>
              Pigułki Wiedzy
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed mb-8" style={{ color: 'rgba(72,89,107,0.78)' }}>
              Protokoły biohackingu w 3-5 minut. Audio i wideo do słuchania w biegu, plus jednostronicowy cheat sheet do każdej pigułki. Zero teorii — tylko konkretny krok na dziś.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium" style={{ color: 'rgba(33,58,80,0.65)' }}>
              <span className="flex items-center gap-1.5">🎧 Audio do Spotify</span>
              <span className="flex items-center gap-1.5">📹 Krótkie wideo</span>
              <span className="flex items-center gap-1.5">📄 PDF cheat sheet</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ścieżki */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(166,138,105,0.85)' }}>
              5 ścieżek ratunkowych
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-normal tracking-heading" style={{ color: '#213a50' }}>
              Znajdź to, czego potrzebujesz teraz
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SCIEZKI.map((s, i) => (
              <motion.div
                key={s.title}
                className={`rounded-3xl border p-5 md:p-6 bg-gradient-to-br ${s.color} ${s.border}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mb-3 block">{s.emoji}</span>
                <h3 className="font-heading font-semibold text-lg tracking-heading mb-2" style={{ color: '#213a50' }}>
                  {s.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(72,89,107,0.75)' }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16">
        <div className="container max-w-md mx-auto">
          <motion.div
            className="rounded-3xl border border-coastal-gold/30 overflow-hidden"
            style={{
              background: 'rgba(239,234,228,0.95)',
              boxShadow: 'var(--shadow-float)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            viewport={{ once: true }}
          >
            <div className="px-6 pt-6 pb-4 border-b border-border/40" style={{ background: 'linear-gradient(135deg, rgba(166,138,105,0.10) 0%, rgba(174,202,232,0.10) 100%)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-coastal-gold mb-1">BioHackMama Premium</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold" style={{ color: '#213a50' }}>79 zł</span>
                <span className="text-sm font-light mb-1.5" style={{ color: 'rgba(33,58,80,0.55)' }}>/miesiąc</span>
              </div>
              <p className="text-xs font-light" style={{ color: 'rgba(33,58,80,0.50)' }}>Bez zobowiązań. Anuluj kiedy chcesz.</p>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                'Dostęp do wszystkich Pigułek Wiedzy',
                'Nowe treści co tydzień (audio + wideo)',
                'Jednostronicowe cheat sheet PDF do każdej pigułki',
                '5 ścieżek tematycznych',
                'Prywatny feed podcastu (wkrótce)',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm font-light" style={{ color: 'rgba(33,58,80,0.75)' }}>
                  <span className="text-coastal-gold mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
              <div className="pt-3">
                <SubscribeButton />
              </div>
              <p className="text-center text-xs font-light" style={{ color: 'rgba(33,58,80,0.40)' }}>
                Bezpieczna płatność przez Stripe
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-normal tracking-heading mb-8 text-center" style={{ color: '#213a50' }}>
            Pytania i odpowiedzi
          </h2>
          <div className="bg-card rounded-3xl border border-border/50 px-5 md:px-7">
            {FAQ.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Already subscribed CTA */}
      <div className="container text-center">
        <Link
          href="/premium/pigulki"
          className="inline-block px-6 py-3 border border-coastal-ocean/30 text-coastal-slate rounded-3xl hover:bg-secondary/10 transition-all duration-200 text-sm"
        >
          Mam już subskrypcję — przejdź do biblioteki →
        </Link>
      </div>
    </main>
  )
}
