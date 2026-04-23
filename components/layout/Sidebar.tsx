'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Newsletter ───────────────────────────────────────────────────────────────

function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    // TODO: podłączyć do Mailchimp / ConvertKit / własne API
    setTimeout(() => {
      setStatus('sent')
      setEmail('')
    }, 900)
  }

  return (
    <div className="rounded-3xl border border-coastal-gold/25 bg-card shadow-coastal-sm overflow-hidden">
      <div
        className="px-5 pt-5 pb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(166,138,105,0.08) 0%, rgba(174,202,232,0.12) 100%)',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-coastal-gold mb-1">
          Newsletter
        </p>
        <h3 className="font-body font-semibold text-base leading-snug" style={{ color: '#213a50' }}>
          Twój cotygodniowy zastrzyk konkretów.
        </h3>
        <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'rgba(33,58,80,0.65)' }}>
          Dołącz do zamkniętego grona.<br />Raz w tygodniu wysyłam autorskie protokoły, głębsze analizy i przemyślenia, których nie znajdziesz na moich publicznych profilach.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-5 pb-5 pt-4 space-y-2.5">
        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-center py-3"
            >
              <p className="text-sm font-medium text-coastal-gold">Dzięki! Sprawdź skrzynkę.</p>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-2.5">
              {/* Input with animated focus ring */}
              <motion.div
                animate={
                  focused
                    ? { boxShadow: '0 0 0 3px rgba(166,138,105,0.18), 0 0 0 1px rgba(166,138,105,0.50)' }
                    : { boxShadow: '0 0 0 0px rgba(166,138,105,0)' }
                }
                transition={{ duration: 0.22 }}
                className="rounded-2xl"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="twój@email.pl"
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-2xl border border-border/60 bg-background focus:outline-none transition-colors duration-300"
                  style={{ color: '#213a50' }}
                />
              </motion.div>

              {/* Submit button — idle → loading → sent */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 6px 18px rgba(166,138,105,0.30)' } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="w-full py-2.5 rounded-2xl text-sm font-semibold text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #A68A69, #8a7058)' }}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <span
                        className="block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                        style={{ animationDuration: '0.7s' }}
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Zapisuję się
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="text-[10px] text-center" style={{ color: 'rgba(33,58,80,0.45)' }}>
                Zero spamu. Wypiszesz się jednym kliknięciem.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

// ─── Promo Block ──────────────────────────────────────────────────────────────

interface PromoBlock {
  label: string
  sublabel: string
  desc: string
  href: string
  emoji: string
  bg: string
  accent: string
}

const DEFAULT_PROMOS: PromoBlock[] = [
  {
    label: 'Kursy',
    sublabel: 'ONLINE',
    desc: 'Zacznij żyć zdrowiej',
    href: '/kursy',
    emoji: '🎓',
    bg: 'linear-gradient(145deg, #1c3448 0%, #2e5570 60%, #3a6a88 100%)',
    accent: 'rgba(174,202,232,0.18)',
  },
  {
    label: 'Ebooki',
    sublabel: 'PDF',
    desc: 'Wiedza w Twoich rękach',
    href: '/ebooki',
    emoji: '📖',
    bg: 'linear-gradient(145deg, #7a5c3a 0%, #A68A69 60%, #c4a882 100%)',
    accent: 'rgba(255,240,220,0.18)',
  },
  {
    label: 'Narzędzia',
    sublabel: 'GRATIS',
    desc: 'Kalkulatory i quizy',
    href: '/narzedzia',
    emoji: '🔬',
    bg: 'linear-gradient(145deg, #4a6278 0%, #7A90A8 60%, #AECAE8 100%)',
    accent: 'rgba(220,235,250,0.18)',
  },
]

const EASE_OUT = [0.22, 1, 0.36, 1] as const

function PromoBlocks() {
  return (
    <div className="space-y-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] px-1 mb-3" style={{ color: 'rgba(33,58,80,0.40)' }}>
        Sprawdź też
      </p>
      {DEFAULT_PROMOS.map((promo, i) => (
        <motion.div
          key={promo.href}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
        >
          <motion.div
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(20,40,60,0.14)' }}
          >
            <Link
              href={promo.href}
              className="group relative flex items-center gap-0 overflow-hidden"
              style={{ background: promo.bg, minHeight: 80 }}
            >
              {/* Grain overlay */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '80px 80px',
                  opacity: 0.12,
                  mixBlendMode: 'overlay',
                  zIndex: 1,
                }}
              />
              {/* Shimmer on hover */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.13) 50%, transparent 65%)',
                  zIndex: 2,
                }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              />

              {/* Left accent bar */}
              <span
                className="w-1 self-stretch flex-shrink-0"
                style={{ background: promo.accent, opacity: 0.7 }}
              />

              {/* Emoji bubble */}
              <span
                className="flex-shrink-0 flex items-center justify-center mx-4"
                style={{
                  width: 44, height: 44,
                  background: promo.accent,
                  borderRadius: 12,
                  fontSize: '1.35rem',
                  backdropFilter: 'blur(4px)',
                  position: 'relative', zIndex: 3,
                }}
              >
                {promo.emoji}
              </span>

              {/* Text */}
              <div className="flex-1 py-4 pr-3 relative z-10">
                <div className="flex items-baseline gap-2">
                  <p className="text-white font-bold text-lg leading-none tracking-tight">
                    {promo.label}
                  </p>
                  <span
                    className="text-[9px] font-bold tracking-[0.10em] px-1.5 py-0.5 rounded-full"
                    style={{ background: promo.accent, color: 'rgba(255,255,255,0.85)' }}
                  >
                    {promo.sublabel}
                  </span>
                </div>
                <p className="text-white/65 text-xs mt-1 leading-none">{promo.desc}</p>
              </div>

              {/* Arrow */}
              <motion.span
                className="pr-4 text-white/50 text-xl relative z-10 flex-shrink-0"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.20 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Ad Slots 300×250 ─────────────────────────────────────────────────────────

const AD1_HREF = 'https://czarneznatury.pl/produkt/alcalina-kwas-humusowy/'
const AD2_HREF = '#'  // ← podmień na link drugiej reklamy

function SidebarAdSlot({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <motion.div
      className="rounded-2xl border border-border/60 overflow-hidden"
      style={{ boxShadow: 'inset 0 1px 3px rgba(33,58,80,0.06)' }}
      animate={{ scale: [1, 1.008, 1] }}
      transition={{ delay: 3, duration: 2.0, ease: 'easeInOut', repeat: Infinity, repeatDelay: 14 }}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer sponsored">
        <Image
          src={src}
          alt={alt}
          width={300}
          height={250}
          className="block w-full"
        />
      </Link>
    </motion.div>
  )
}

function SidebarAdSlot2() {
  return (
    <div
      className="rounded-2xl border border-border/60 overflow-hidden flex items-center justify-center"
      style={{ width: '300px', height: '250px', background: 'rgba(33,58,80,0.02)' }}
    >
      <p className="text-xs text-muted-foreground">Miejsce na reklamę 300×250</p>
    </div>
  )
}

// ─── Main Sidebar (desktop — xl+) ────────────────────────────────────────────

export default function Sidebar() {
  return (
    <div className="sticky top-28 space-y-6">
      <NewsletterBox />
      <PromoBlocks />
      <SidebarAdSlot href={AD1_HREF} src="/images/alcalina-ad.jpg.png" alt="Alcalina -10% kod: WERONIKA" />
      <SidebarAdSlot2 />
    </div>
  )
}

// ─── Mobile Sidebar (visible below xl) ───────────────────────────────────────

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 },
  },
}

const heroVariants = {
  hidden:   { opacity: 0, y: 28, scale: 0.95 },
  visible:  { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const tileVariants = {
  hidden:   { opacity: 0, y: 22, scale: 0.93 },
  visible:  { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.50, ease: [0.22, 1, 0.36, 1] } },
}

export function MobileSidebar() {
  const [hero, ...tiles] = DEFAULT_PROMOS

  return (
    <div className="xl:hidden mt-14 space-y-8">

      {/* ── Thin section divider ── */}
      <div className="h-px" style={{ background: 'rgba(33,58,80,0.10)' }} />

      {/* ── Bento promo section ── */}
      <div>
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-5 px-0.5"
          style={{ color: 'rgba(33,58,80,0.38)' }}
        >
          Sprawdź też
        </p>

        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >

          {/* ── HERO CARD (full-width, tall) ── */}
          <motion.div variants={heroVariants} whileTap={{ scale: 0.975 }} style={{ borderRadius: 22, overflow: 'hidden' }}>
            <Link
              href={hero.href}
              className="relative flex items-center overflow-hidden"
              style={{ background: hero.bg, minHeight: 130, boxShadow: '0 6px 28px rgba(20,40,60,0.22)' }}
            >
              {/* Grain */}
              <span className="absolute inset-0 pointer-events-none z-0"
                style={{ backgroundImage: GRAIN, backgroundSize: '80px 80px', opacity: 0.13, mixBlendMode: 'overlay' }} />

              {/* Oversized decorative label — background watermark */}
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 font-bold leading-none"
                style={{
                  fontSize: 'clamp(72px, 22vw, 96px)',
                  color: 'rgba(255,255,255,0.07)',
                  letterSpacing: '-0.04em',
                  transform: 'translateY(-50%) translateX(8%)',
                }}
                aria-hidden
              >
                {hero.label.toUpperCase()}
              </span>

              {/* Shimmer sweep */}
              <span className="absolute inset-0 pointer-events-none z-0"
                style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.06) 50%,transparent 70%)' }} />

              {/* Emoji bubble — left */}
              <span
                className="flex-shrink-0 flex items-center justify-center ml-5 z-10"
                style={{ width: 64, height: 64, background: hero.accent, borderRadius: 18, fontSize: '2rem' }}
              >
                {hero.emoji}
              </span>

              {/* Text — center */}
              <div className="flex-1 px-5 py-5 z-10">
                <span
                  className="inline-block text-[9px] font-bold tracking-[0.12em] px-2 py-0.5 rounded-full mb-2"
                  style={{ background: hero.accent, color: 'rgba(255,255,255,0.90)' }}
                >
                  {hero.sublabel}
                </span>
                <p className="text-white font-bold leading-tight mb-1" style={{ fontSize: 26 }}>
                  {hero.label}
                </p>
                <p className="text-white/60 text-sm leading-snug">{hero.desc}</p>
              </div>

              {/* Arrow — right */}
              <motion.span
                className="pr-5 text-white/40 text-2xl z-10 flex-shrink-0"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          {/* ── TWO TILE CARDS (side-by-side) ── */}
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((promo) => (
              <motion.div
                key={promo.href}
                variants={tileVariants}
                whileTap={{ scale: 0.96 }}
                style={{ borderRadius: 20, overflow: 'hidden' }}
              >
                <Link
                  href={promo.href}
                  className="relative flex flex-col items-start overflow-hidden"
                  style={{ background: promo.bg, minHeight: 148, boxShadow: '0 4px 20px rgba(20,40,60,0.18)' }}
                >
                  {/* Grain */}
                  <span className="absolute inset-0 pointer-events-none z-0"
                    style={{ backgroundImage: GRAIN, backgroundSize: '80px 80px', opacity: 0.13, mixBlendMode: 'overlay' }} />

                  {/* Oversized label watermark */}
                  <span
                    className="absolute -bottom-2 -right-1 pointer-events-none select-none z-0 font-bold leading-none"
                    style={{ fontSize: '4.5rem', color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.04em' }}
                    aria-hidden
                  >
                    {promo.emoji}
                  </span>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-4 pt-5">
                    {/* Emoji bubble */}
                    <span
                      className="flex items-center justify-center mb-auto"
                      style={{ width: 48, height: 48, background: promo.accent, borderRadius: 14, fontSize: '1.5rem' }}
                    >
                      {promo.emoji}
                    </span>

                    {/* Label + sublabel */}
                    <div className="mt-4">
                      <p className="text-white font-bold text-xl leading-none tracking-tight mb-1">
                        {promo.label}
                      </p>
                      <p className="text-white/55 text-xs leading-snug mb-3">{promo.desc}</p>
                      <span
                        className="inline-block text-[9px] font-bold tracking-[0.10em] px-2 py-0.5 rounded-full"
                        style={{ background: promo.accent, color: 'rgba(255,255,255,0.88)' }}
                      >
                        {promo.sublabel}
                      </span>
                    </div>
                  </div>

                  {/* Corner arrow */}
                  <span className="absolute top-4 right-4 text-white/30 text-sm z-10">↗</span>
                </Link>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

      {/* ── Newsletter ── */}
      <NewsletterBox />

      {/* ── Ad slot ── */}
      <div className="flex justify-center">
        <SidebarAdSlot />
      </div>
    </div>
  )
}
