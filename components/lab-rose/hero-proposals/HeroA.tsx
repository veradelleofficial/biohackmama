'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * PROPOZYCJA A · "Konstelacja" (wersja 2)
 * Tło: ruchoma zorza lime/rose + winieta zamiast kropek.
 * Nagłówek: Inter, sentence case, ciasny tracking; rotujące słowo w Fraunces italic rose.
 * Prawa strona: "instrument" z tarczą (tick marks), orby tematów na orbitach,
 * rysujące się linie konstelacji i świetlny punkt wędrujący po liniach.
 * Dół: "Co tu znajdziesz" jako szklane karty + ticker tematów.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const ROTATING = ['snu', 'hormonów', 'dziecka', 'domu', 'talerza', 'głowy']

// pozycje w układzie 0-100 (viewBox), liczone na dwóch orbitach
const ORBS = [
  { img: '/images/g1.png', label: 'Energia', href: '/blog?pilar=energia', cx: 78, cy: 26, r: 15, glow: '#9be35a' },
  { img: '/images/g2.png', label: 'Hormony', href: '/blog?pilar=hormony', cx: 22, cy: 30, r: 13, glow: '#e8aebd' },
  { img: '/images/g5.png', label: 'Dzieci', href: '/blog?pilar=dzieci', cx: 80, cy: 70, r: 14, glow: '#f0b35a' },
  { img: '/images/g4.png', label: 'Czysty dom', href: '/blog?temat=detoks-i-dom', cx: 24, cy: 74, r: 15, glow: '#45d6c4' },
  { img: '/images/g8.png', label: 'Układ nerwowy', href: '/blog?temat=stres-i-kortyzol', cx: 51, cy: 50, r: 11, glow: '#6fb7ff' },
]
// ścieżka konstelacji: hormony → energia → układ nerwowy → dzieci → dom → hormony
const PATH = 'M22,30 L78,26 L51,50 L80,70 L24,74 L22,30 M51,50 L22,30'

const INDEX = [
  { num: '01', title: 'Artykuły', desc: 'Gęsto, bez wody, co tydzień nowy', href: '/blog' },
  { num: '02', title: 'Programy', desc: '8 ścieżek krok po kroku', href: '/kursy' },
  { num: '03', title: 'Darmowe PDF', desc: '9 list marek i checklist', href: '/darmowe-materialy' },
  { num: '04', title: 'Narzędzia', desc: '6 kalkulatorów i audytów', href: '/narzedzia' },
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
        fontFamily: 'var(--font-fraunces), Fraunces, Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 300,
        letterSpacing: '-0.01em',
        overflow: 'hidden',
        paddingBottom: '0.1em',
        lineHeight: 1.02,
      }}
    >
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

/* ── Tarcza instrumentu: 72 kresek, co 6. dłuższa ─────────────────────── */
function Dial({ reduce }: { reduce: boolean }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i)
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <g className={reduce ? '' : 'lr-dna-bg'} style={{ transformOrigin: '50% 50%' }}>
        {ticks.map((t) => {
          const a = (t / 72) * Math.PI * 2
          const long = t % 6 === 0
          const r1 = 47.5
          const r2 = long ? 44.5 : 46.2
          return (
            <line
              key={t}
              x1={50 + Math.cos(a) * r1}
              y1={50 + Math.sin(a) * r1}
              x2={50 + Math.cos(a) * r2}
              y2={50 + Math.sin(a) * r2}
              stroke={long ? 'rgba(244,239,230,0.45)' : 'rgba(244,239,230,0.16)'}
              strokeWidth={long ? 0.35 : 0.22}
            />
          )
        })}
        <circle cx="50" cy="50" r="47.8" fill="none" stroke="rgba(244,239,230,0.12)" strokeWidth="0.25" />
      </g>
      {/* wewnętrzna orbita, obraca się w drugą stronę */}
      <circle
        cx="50" cy="50" r="30"
        fill="none" stroke="rgba(232,174,189,0.28)" strokeWidth="0.22" strokeDasharray="0.5 2.2"
        className={reduce ? '' : 'lr-dna-bg lr-dna-bg--counter'}
        style={{ transformOrigin: '50% 50%' }}
      />
      {/* etykiety na tarczy */}
      <text x="50" y="6.2" textAnchor="middle" fontSize="2.1" fill="rgba(201,242,79,0.8)" fontFamily="var(--font-jetbrains), monospace" letterSpacing="0.4">
        BIOHACK
      </text>
      <text x="50" y="96.4" textAnchor="middle" fontSize="2.1" fill="rgba(232,174,189,0.8)" fontFamily="var(--font-jetbrains), monospace" letterSpacing="0.4">
        MAMA
      </text>
    </svg>
  )
}

/* ── Linie konstelacji + wędrujący punkt ──────────────────────────────── */
function ConstellationLines({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <filter id="lr-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.path
        d={PATH}
        fill="none"
        stroke="rgba(244,239,230,0.22)"
        strokeWidth="0.28"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: 'easeInOut', delay: 1.0 }}
      />
      {!reduce && (
        <>
          {/* płynący dash po liniach */}
          <motion.path
            d={PATH}
            fill="none"
            stroke="rgba(201,242,79,0.55)"
            strokeWidth="0.3"
            strokeDasharray="1.5 6"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1 }}
            className="lr-dash-flow"
          />
          {/* punkt świetlny */}
          <circle r="0.9" fill="#C9F24F" filter="url(#lr-glow)" opacity="0">
            <animate attributeName="opacity" from="0" to="1" begin="3.4s" dur="0.6s" fill="freeze" />
            <animateMotion dur="14s" repeatCount="indefinite" begin="3.4s" path={PATH} />
          </circle>
        </>
      )}
      {/* węzły */}
      {ORBS.map((o, i) => (
        <motion.circle
          key={o.label}
          cx={o.cx} cy={o.cy} r="0.7"
          fill={o.glow}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.2, duration: 0.5 }}
          style={{ transformOrigin: `${o.cx}% ${o.cy}%` }}
        />
      ))}
    </svg>
  )
}

function Constellation() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = !!useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 18 })
  const sy = useSpring(my, { stiffness: 40, damping: 18 })
  const px = useTransform(sx, (v) => v * 14)
  const py = useTransform(sy, (v) => v * 14)
  const rx = useTransform(sy, (v) => v * -4)
  const ry = useTransform(sx, (v) => v * 6)

  useEffect(() => {
    if (reduce) return
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduce])

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      style={{
        aspectRatio: '1 / 1',
        maxWidth: 620,
        margin: '0 auto',
        x: px, y: py, rotateX: rx, rotateY: ry,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
    >
      {/* pulsujące pierścienie ze środka */}
      {!reduce && [0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{ left: '50%', top: '50%', width: '12%', height: '12%', border: '1px solid rgba(201,242,79,0.5)', x: '-50%', y: '-50%' }}
          animate={{ scale: [1, 7.5], opacity: [0.55, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', delay: i * 2 }}
        />
      ))}

      {/* poświata centralna */}
      <div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          left: '50%', top: '50%', width: '80%', height: '80%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(201,242,79,0.12) 0%, rgba(232,174,189,0.08) 35%, transparent 68%)',
          filter: 'blur(28px)',
        }}
      />

      <Dial reduce={reduce} />
      <ConstellationLines reduce={reduce} />

      {ORBS.map((o, i) => (
        <motion.div
          key={o.label}
          className="absolute"
          style={{
            left: `${o.cx}%`, top: `${o.cy}%`,
            width: `${o.r * 2}%`,
            x: '-50%', y: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 + i * 0.16 }}
        >
          <Link href={o.href} className="group block relative" aria-label={o.label} style={{ ['--orb-glow' as any]: o.glow }}>
            <div
              className="relative rounded-full overflow-hidden lr-orb"
              style={{
                aspectRatio: '1 / 1',
                WebkitMaskImage: 'radial-gradient(circle, black 56%, transparent 71%)',
                maskImage: 'radial-gradient(circle, black 56%, transparent 71%)',
              }}
            >
              <Image src={o.img} alt="" fill sizes="220px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            {/* pierścień hover w kolorze orba */}
            <span
              aria-hidden
              className="absolute inset-[8%] rounded-full pointer-events-none lr-orb__ring"
              style={{ border: '1px solid var(--orb-glow)', opacity: 0, transition: 'opacity 400ms, transform 600ms cubic-bezier(0.22,1,0.36,1)', transform: 'scale(0.9)' }}
            />
            <span
              className="lr-mono absolute left-1/2 -translate-x-1/2 whitespace-nowrap lr-orb__label"
              style={{
                bottom: '-4%',
                fontSize: '0.5625rem',
                letterSpacing: '0.2em',
                color: 'var(--lr-ink)',
                padding: '0.3rem 0.65rem',
                background: 'rgba(12,12,12,0.78)',
                border: '1px solid var(--lr-rule-strong)',
                borderRadius: 2,
                backdropFilter: 'blur(6px)',
              }}
            >
              {o.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function HeroA() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const constY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-10%'])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* ZORZA: trzy wolno dryfujące plamy */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="lr-aurora lr-aurora--lime" />
        <div className="lr-aurora lr-aurora--rose" />
        <div className="lr-aurora lr-aurora--teal" />
      </div>
      {/* winieta + delikatny grid poziomy */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(10,10,10,0.75) 100%), repeating-linear-gradient(to bottom, transparent 0 95px, rgba(244,239,230,0.016) 95px 96px)',
        }}
      />
      <div aria-hidden className="lr-grain absolute inset-0 pointer-events-none" style={{ opacity: 0.05 }} />

      {/* HUD: górna linia z mono-etykietami */}
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative flex items-center justify-between gap-4"
        style={{ paddingTop: '1.4rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="lr-mono flex items-center gap-3" style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.24em' }}>
          <span className="lr-blink" aria-hidden />
          LAB · 01
        </span>
        <span className="lr-mono hidden sm:inline" style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.24em' }}>
          biohacking + życie bez chemii · dla całych rodzin
        </span>
        <span className="lr-mono" style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.24em' }}>
          PL · 2026
        </span>
      </motion.div>

      <div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative grid lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-6 items-center"
        style={{ paddingTop: 'clamp(1rem, 2.5vw, 2rem)', paddingBottom: 'clamp(1rem, 2vw, 2rem)', minHeight: 'calc(100svh - 7.5rem)' }}
      >
        {/* LEWA */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10" style={{ y: textY }}>
          <motion.div variants={fadeUp} className="mb-7">
            <span className="lr-eyebrow">BioHackMama</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              letterSpacing: '-0.045em',
              lineHeight: 0.98,
              fontSize: 'clamp(2.7rem, 6.2vw, 5.1rem)',
              fontFeatureSettings: '"ss01", "cv11"',
            }}
          >
            <span style={{ display: 'block' }}>Mniej chemii,</span>
            <span style={{ display: 'block' }}>
              więcej{' '}
              <span style={{ background: 'linear-gradient(90deg, #C9F24F, #E8AEBD)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                energii.
              </span>
            </span>
            <span style={{ display: 'block', marginTop: '0.3em', fontWeight: 400, color: 'var(--lr-ink-soft)', fontSize: '0.62em', letterSpacing: '-0.03em' }}>
              Zacznij od
            </span>
            <RotatingWord />
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8" style={{ maxWidth: '50ch' }}>
            Jestem Weronika. Mama, nie lekarz. Przerobiłam na sobie tarczycę, hormony i dom bez
            chemii. Tutaj zbieram to, co zadziałało: artykuły, programy, narzędzia i darmowe PDF-y.
            Krok po kroku, bez perfekcji od zaraz.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3 md:gap-4 items-center">
            <Link href="/audyt" className="lr-cta-primary">
              Zrób audyt (3 min)
              <span aria-hidden>→</span>
            </Link>
            <Link href="/darmowe-materialy" className="lr-cta-ghost">
              Darmowe materiały
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="lr-mono mt-9 flex flex-wrap items-center gap-x-5 gap-y-2"
            style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
          >
            <span><b style={{ color: 'var(--lr-accent)', fontWeight: 600 }}>8</b> ścieżek</span>
            <span aria-hidden style={{ color: 'var(--lr-rule-strong)' }}>/</span>
            <span><b style={{ color: 'var(--lr-accent)', fontWeight: 600 }}>9</b> darmowych PDF</span>
            <span aria-hidden style={{ color: 'var(--lr-rule-strong)' }}>/</span>
            <span><b style={{ color: 'var(--lr-accent)', fontWeight: 600 }}>6</b> narzędzi</span>
          </motion.div>
        </motion.div>

        {/* PRAWA */}
        <motion.div className="relative z-0" style={{ y: constY }}>
          <Constellation />
        </motion.div>
      </div>

      {/* INDEKS: szklane karty */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative" style={{ paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="lr-mono" style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.24em' }}>
            // CO TU ZNAJDZIESZ
          </span>
          <motion.span
            aria-hidden
            className="h-px flex-1"
            style={{ background: 'linear-gradient(to right, var(--lr-rule-strong), transparent)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 1.3 }}
          />
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {INDEX.map((it, i) => (
            <motion.div
              key={it.num}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 1.35 + i * 0.09 }}
            >
              <Link href={it.href} className="lr-glass-card group">
                <span className="lr-mono lr-glass-card__num">{it.num}</span>
                <span className="lr-glass-card__title">{it.title}</span>
                <span className="lr-glass-card__desc">{it.desc}</span>
                <span className="lr-glass-card__arrow" aria-hidden>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TICKER */}
      <div
        className="lr-ticker mt-10 md:mt-12"
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
