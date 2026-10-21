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

// stara konstelacja: swobodnie unoszące się orby (pozycja w % kontenera)
const ORBS = [
  { img: '/images/g1.png', label: 'Energia', href: '/blog?pilar=energia', x: 58, y: 8, size: 190, delay: 0, depth: 1.0, glow: '#9be35a' },
  { img: '/images/g2.png', label: 'Hormony', href: '/blog?pilar=hormony', x: 8, y: 22, size: 150, delay: 0.6, depth: 0.55, glow: '#e8aebd' },
  { img: '/images/g5.png', label: 'Dzieci', href: '/blog?pilar=dzieci', x: 66, y: 50, size: 160, delay: 1.1, depth: 0.75, glow: '#f0b35a' },
  { img: '/images/g4.png', label: 'Czysty dom', href: '/blog?temat=detoks-i-dom', x: 14, y: 60, size: 175, delay: 1.7, depth: 0.9, glow: '#45d6c4' },
  { img: '/images/g8.png', label: 'Układ nerwowy', href: '/blog?temat=stres-i-kortyzol', x: 40, y: 34, size: 120, delay: 2.3, depth: 0.4, glow: '#6fb7ff' },
]

const INDEX = [
  { num: '01', title: 'Artykuły', desc: 'Gęsto, bez wody, co tydzień nowy', href: '/blog' },
  { num: '02', title: 'Programy', desc: '8 ścieżek krok po kroku', href: '/kursy' },
  { num: '03', title: 'Darmowe PDF', desc: '9 list marek i checklist', href: '/darmowe-materialy' },
  { num: '04', title: 'Narzędzia', desc: '6 kalkulatorów i audytów', href: '/narzedzia' },
  { num: '05', title: 'Pigułki Wiedzy', desc: 'Krótkie audio i wideo', href: '/premium/pigulki' },
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

/* ── Stara konstelacja: dwa cienkie pierścienie + swobodnie unoszące się orby ── */
function Constellation() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = !!useReducedMotion()
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
        <Orb key={o.label} {...o} idx={idx} sx={sx} sy={sy} reduce={reduce} />
      ))}
    </div>
  )
}

function Orb({
  img, label, href, x, y, size, delay, depth, glow, idx, sx, sy, reduce,
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
        <Link href={href} className="group block relative" aria-label={label} style={{ ['--orb-glow' as any]: glow }}>
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              aspectRatio: '1 / 1',
              WebkitMaskImage: 'radial-gradient(circle, black 58%, transparent 72%)',
              maskImage: 'radial-gradient(circle, black 58%, transparent 72%)',
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
            aria-hidden
            className="absolute inset-[8%] rounded-full pointer-events-none lr-orb__ring"
            style={{ border: '1px solid var(--orb-glow)', opacity: 0, transition: 'opacity 400ms, transform 600ms cubic-bezier(0.22,1,0.36,1)', transform: 'scale(0.9)' }}
          />
          <span
            className="lr-mono absolute left-1/2 -translate-x-1/2 whitespace-nowrap lr-orb__label"
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

      <div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative grid lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-6 items-center"
        style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(1rem, 2vw, 2rem)', minHeight: 'calc(100svh - 6rem)' }}
      >
        {/* LEWA */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10" style={{ y: textY }}>
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

          <motion.p variants={fadeUp} className="mt-8" style={{ maxWidth: '52ch' }}>
            Łączę biohacking z holistycznym, low-tox podejściem oraz mądrością ziołolecznictwa i
            naturoterapii. Pokazuję jak świadomie oczyścić codzienność ze zbędnych toksyn i
            holistycznie zadbać o siebie, wchodząc na najwyższy poziom własnych możliwości.
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

      <div style={{ height: 'clamp(3rem, 6vw, 5rem)' }} aria-hidden />
    </section>
  )
}
