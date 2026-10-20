'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * PROPOZYCJA A · "Konstelacja"
 * Lewa kolumna: jasny komunikat czym jest strona + rotujące słowo w nagłówku.
 * Prawa kolumna: unoszące się "orbity" tematów (grafiki g1-g8) z parallaxem pod kursor.
 * Dół: indeks "Co tu znajdziesz" + ticker tematów.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const ROTATING = ['snu', 'hormonów', 'dziecka', 'domu', 'talerza', 'głowy']

const ORBS = [
  { img: '/images/g1.png', label: 'Energia', href: '/blog?pilar=energia', x: 58, y: 8, size: 190, delay: 0, depth: 1.0 },
  { img: '/images/g2.png', label: 'Hormony', href: '/blog?pilar=hormony', x: 8, y: 22, size: 150, delay: 0.6, depth: 0.55 },
  { img: '/images/g5.png', label: 'Dzieci', href: '/blog?pilar=dzieci', x: 66, y: 50, size: 160, delay: 1.1, depth: 0.75 },
  { img: '/images/g4.png', label: 'Czysty dom', href: '/blog?temat=detoks-i-dom', x: 14, y: 60, size: 175, delay: 1.7, depth: 0.9 },
  { img: '/images/g8.png', label: 'Układ nerwowy', href: '/blog?temat=stres-i-kortyzol', x: 40, y: 34, size: 120, delay: 2.3, depth: 0.4 },
]

const INDEX = [
  { num: '01', title: 'Artykuły', desc: 'Gęsto, bez wody, co tydzień', href: '/blog' },
  { num: '02', title: 'Programy', desc: '8 ścieżek krok po kroku', href: '/kursy' },
  { num: '03', title: 'Darmowe PDF', desc: 'Listy marek, checklisty, przewodniki', href: '/darmowe-materialy' },
  { num: '04', title: 'Narzędzia', desc: 'Kalkulatory snu, cyklu, kortyzolu', href: '/narzedzia' },
  { num: '05', title: 'Pigułki Wiedzy', desc: 'Krótkie audio i wideo', href: '/premium/pigulki' },
]

const TICKER = [
  'sen', 'kortyzol', 'tarczyca', 'bisfenole', 'mikrobiom', 'poliester', 'woda', 'EMF',
  'suplementacja', 'dzieci', 'cykl', 'mitochondria', 'detoks domu', 'merino', 'post', 'wątroba',
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

function RotatingWord() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2300)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <span
      className="lr-rose"
      style={{
        display: 'grid',
        fontStyle: 'italic',
        fontWeight: 300,
        overflow: 'hidden',
        paddingBottom: '0.08em',
        lineHeight: 1.02,
      }}
    >
      {/* niewidoczne słowa rezerwują szerokość, żeby layout nie skakał */}
      {ROTATING.map((w) => (
        <span key={w} aria-hidden style={{ gridArea: '1 / 1', visibility: 'hidden' }}>
          {w}.
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={ROTATING[i]}
          style={{ gridArea: '1 / 1' }}
          initial={{ y: '105%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-105%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {ROTATING[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Constellation() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 })
  const sy = useSpring(my, { stiffness: 40, damping: 18 })

  useEffect(() => {
    if (reduce) return
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduce])

  const ringRotate = useTransform(sx, [-1, 1], [-8, 8])

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: '1 / 1.05', maxWidth: 560, margin: '0 auto' }}>
      {/* orbita: dwa cienkie pierścienie */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ rotate: ringRotate }}
        aria-hidden
      >
        <motion.circle
          cx="50" cy="50" r="44"
          fill="none" stroke="var(--lr-rule-strong)" strokeWidth="0.25" strokeDasharray="1.2 2.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut', delay: 0.4 }}
          className={reduce ? '' : 'lr-dna-bg'}
          style={{ transformOrigin: '50% 50%' }}
        />
        <motion.circle
          cx="50" cy="50" r="30"
          fill="none" stroke="rgba(232,174,189,0.35)" strokeWidth="0.2" strokeDasharray="0.6 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: 'easeOut', delay: 0.7 }}
          className={reduce ? '' : 'lr-dna-bg--counter lr-dna-bg'}
          style={{ transformOrigin: '50% 50%' }}
        />
        <circle cx="50" cy="50" r="1.1" fill="var(--lr-accent)">
          {!reduce && <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite" />}
        </circle>
      </motion.svg>

      {/* glow w środku */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: '50%', width: '70%', height: '70%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(201,242,79,0.10) 0%, rgba(232,174,189,0.06) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {ORBS.map((o, idx) => (
        <Orb key={o.label} {...o} idx={idx} sx={sx} sy={sy} reduce={!!reduce} />
      ))}
    </div>
  )
}

function Orb({
  img, label, href, x, y, size, delay, depth, idx, sx, sy, reduce,
}: (typeof ORBS)[number] & {
  idx: number
  sx: ReturnType<typeof useSpring>
  sy: ReturnType<typeof useSpring>
  reduce: boolean
}) {
  const px = useTransform(sx, (v) => v * 18 * depth)
  const py = useTransform(sy, (v) => v * 18 * depth)

  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, x: px, y: py, width: `clamp(96px, ${size / 5.6}vw, ${size}px)` }}
      initial={{ opacity: 0, scale: 0.6, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.5 + idx * 0.16 }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0, 8, 0] }}
        transition={{ duration: 7 + idx * 1.3, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <Link href={href} className="group block relative" aria-label={label}>
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              aspectRatio: '1 / 1',
              WebkitMaskImage: 'radial-gradient(circle, black 58%, transparent 72%)',
              maskImage: 'radial-gradient(circle, black 58%, transparent 72%)',
              transition: 'transform 500ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="200px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <span
            className="lr-mono absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{
              bottom: '6%',
              fontSize: '0.5625rem',
              letterSpacing: '0.2em',
              color: 'var(--lr-ink)',
              padding: '0.3rem 0.6rem',
              background: 'rgba(12,12,12,0.72)',
              border: '1px solid var(--lr-rule-strong)',
              borderRadius: 2,
              backdropFilter: 'blur(6px)',
              transition: 'border-color 300ms, color 300ms',
            }}
          >
            {label}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default function HeroA() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--lr-bg)' }}>
      {/* tło: siatka lab + poświaty */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(184,176,163,0.16) 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 20%, transparent 80%)',
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-20%', left: '-10%', width: '55%', height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(232,174,189,0.10) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      <div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center"
        style={{ paddingTop: 'clamp(3.5rem, 7vw, 6rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)', minHeight: 'calc(100svh - 6rem)' }}
      >
        {/* LEWA: komunikat */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10">
          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="lr-eyebrow">BioHackMama</span>
            <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.18em' }}>
              biohacking + życie bez chemii · dla całych rodzin
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.6rem, 6.4vw, 5.2rem)' }}>
            <span style={{ display: 'block' }}>Mniej chemii,</span>
            <span style={{ display: 'block' }}>więcej energii.</span>
            <span style={{ display: 'block', marginTop: '0.18em', color: 'var(--lr-ink-soft)' }}>Zacznij od</span>
            <RotatingWord />
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8 md:mt-10" style={{ maxWidth: '52ch' }}>
            Jestem Weronika. Mama, nie lekarz. Przerobiłam na sobie tarczycę, hormony i dom bez
            chemii. Tutaj zbieram to, co zadziałało: artykuły, programy, narzędzia i darmowe PDF-y.
            Krok po kroku, bez perfekcji od zaraz.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 md:mt-11 flex flex-wrap gap-3 md:gap-4 items-center">
            <Link href="/audyt" className="lr-cta-primary">
              Zrób audyt (3 min)
              <span aria-hidden>→</span>
            </Link>
            <Link href="/darmowe-materialy" className="lr-cta-ghost">
              Darmowe materiały
            </Link>
          </motion.div>

          {/* mini-dowód */}
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden" style={{ border: '1px solid var(--lr-rule-strong)' }}>
              <Image src="/images/vera-portrait.jpg" alt="Weronika" fill sizes="44px" className="object-cover" />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.5, maxWidth: '34ch' }}>
              Dwa razy wyszłam z niedoczynności tarczycy bez leków.{' '}
              <Link href="/o-mnie" className="lr-rose" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>
                Moja historia
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* PRAWA: konstelacja */}
        <div className="relative z-0 lg:-mr-6">
          <Constellation />
        </div>
      </div>

      {/* INDEKS: co tu znajdziesz */}
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
      >
        <div className="flex items-center gap-4 mb-5">
          <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}>
            // CO TU ZNAJDZIESZ
          </span>
          <motion.span
            aria-hidden
            className="h-px flex-1"
            style={{ background: 'var(--lr-rule-strong)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 1.3 }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6">
          {INDEX.map((it, i) => (
            <motion.div
              key={it.num}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.35 + i * 0.09 }}
            >
              <Link href={it.href} className="lr-hero-index group block">
                <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.2em' }}>
                  {it.num}
                </span>
                <span className="lr-hero-index__title">{it.title}</span>
                <span className="lr-hero-index__desc">{it.desc}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TICKER tematów */}
      <div
        className="lr-ticker mt-12 md:mt-16"
        style={{ borderTop: '1px solid var(--lr-rule)', borderBottom: '1px solid var(--lr-rule)' }}
        aria-hidden
      >
        <div className="lr-ticker__track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="lr-ticker__item lr-mono">
              <span className="lr-ticker__dot" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
