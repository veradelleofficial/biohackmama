'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * PROPOZYCJA B · "Manifest"
 * Kinowy, pełnoekranowy hero: czarno-biały portret z maską, ogromny nagłówek
 * ujawniany słowo po słowie, rysująca się limonkowa linia, poświata podążająca
 * za kursorem, ziarno filmowe. Dół: pasek "Co tu znajdziesz" z prawdziwymi liczbami.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const HEADLINE: { text: string; rose?: boolean }[] = [
  { text: 'Zdrowie,' },
  { text: 'którego' },
  { text: 'nie' },
  { text: 'da' },
  { text: 'ci' },
  { text: 'system.', rose: true },
]

const INDEX = [
  { num: '01', big: 'Artykuły', small: 'nowe co tydzień, bez wody', href: '/blog' },
  { num: '02', big: '8 ścieżek', small: 'sen, hormony, dzieci, dom...', href: '/kursy' },
  { num: '03', big: '9 darmowych PDF', small: 'listy marek i checklisty', href: '/darmowe-materialy' },
  { num: '04', big: '6 narzędzi', small: 'kalkulatory i audyty', href: '/narzedzia' },
  { num: '05', big: 'Pigułki Wiedzy', small: 'krótkie audio i wideo', href: '/premium/pigulki' },
]

function Word({ text, rose, i }: { text: string; rose?: boolean; i: number }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.06em', marginRight: '0.22em' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        className={rose ? 'lr-rose' : undefined}
        initial={{ y: '112%', rotate: 2 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 0.95, ease: EASE, delay: 0.25 + i * 0.085 }}
      >
        {rose ? <em style={{ fontWeight: 300 }}>{text}</em> : text}
      </motion.span>
    </span>
  )
}

function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 50, damping: 20 })
  const sy = useSpring(y, { stiffness: 50, damping: 20 })
  useEffect(() => {
    if (reduce) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y, reduce])
  if (reduce) return null
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0"
      style={{
        left: 0, top: 0, x: sx, y: sy, width: 520, height: 520,
        translateX: '-50%', translateY: '-50%',
        background: 'radial-gradient(circle, rgba(232,174,189,0.10) 0%, rgba(201,242,79,0.04) 35%, transparent 65%)',
        filter: 'blur(20px)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

export default function HeroB() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#080808', minHeight: 'calc(100svh - 5rem)' }}
    >
      <CursorGlow />

      {/* PORTRET */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 w-full lg:w-[56%] pointer-events-none"
        style={{ y: imgY, scale: imgScale }}
        initial={{ opacity: 0, scale: 1.12, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)',
          }}
        >
          {/* dolne wygaszenie do czerni (zamiast mask-composite, które bywa kapryśne) */}
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.6) 22%, transparent 50%)' }}
          />
          <Image
            src="/images/vera-portrait.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-[60%_20%] lg:object-[50%_15%]"
            style={{ filter: 'grayscale(1) contrast(1.05) brightness(0.82)', opacity: 0.78 }}
          />
          {/* ciepły duotone: delikatny róż w cieniach, krem w światłach */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, rgba(232,174,189,0.14), rgba(244,239,230,0.04) 50%, rgba(201,242,79,0.05))',
              mixBlendMode: 'soft-light',
            }}
          />
        </div>
        {/* mobile: przyciemnienie pod tekstem */}
        <div className="absolute inset-0 lg:hidden" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.35), rgba(8,8,8,0.92) 70%)' }} />
      </motion.div>

      {/* ziarno filmowe */}
      <div aria-hidden className="lr-grain absolute inset-0 pointer-events-none" />

      {/* pionowa linia-oś */}
      <motion.div
        aria-hidden
        className="hidden lg:block absolute left-16 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--lr-rule-strong) 20%, var(--lr-rule-strong) 80%, transparent)', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
      />

      {/* TREŚĆ */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-between"
        style={{ minHeight: 'calc(100svh - 5rem)', paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(2rem, 3vw, 2.5rem)', y: textY, opacity: fade }}
      >
        <div>
          <motion.div
            className="flex items-center gap-4 mb-10 md:mb-14"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.26em' }}>
              // MANIFEST
            </span>
            <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.2em' }}>
              biohacking po ludzku · dla mam, tatów i dzieci
            </span>
          </motion.div>

          <h1
            style={{
              fontSize: 'clamp(3.1rem, 9.2vw, 8rem)',
              lineHeight: 0.98,
              maxWidth: '11ch',
              letterSpacing: '-0.03em',
              textTransform: 'none',
            }}
          >
            {HEADLINE.map((w, i) => (
              <Word key={i} {...w} i={i} />
            ))}
          </h1>

          {/* limonkowa kreska rysująca się pod nagłówkiem */}
          <motion.div
            aria-hidden
            className="h-px mt-6"
            style={{ background: 'linear-gradient(to right, var(--lr-accent), rgba(201,242,79,0))', width: 'min(360px, 60%)', transformOrigin: 'left' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.95 }}
          />

          <motion.p
            className="mt-8 md:mt-10"
            style={{ maxWidth: '46ch', fontSize: 'clamp(1.0625rem, 1.3vw, 1.2rem)' }}
            initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          >
            Mama, nie lekarz. Dwa razy wyszłam z niedoczynności tarczycy bez leków, poukładałam
            hormony po pięciu latach chaosu i wyrzuciłam chemię z domu. Tu znajdziesz to, co
            zadziałało. Bez big pharmy, bez marketingowego eko, bez obietnic cudów.
          </motion.p>

          <motion.div
            className="mt-9 md:mt-11 flex flex-wrap items-center gap-3 md:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          >
            <Link href="/audyt" className="lr-cta-primary">
              Zacznij tutaj
              <span aria-hidden>→</span>
            </Link>
            <Link href="/o-mnie" className="lr-cta-ghost">
              Moja historia
            </Link>
            <motion.span
              className="lr-script lr-rose ml-2 hidden md:inline"
              style={{ fontSize: '2.2rem', opacity: 0.9 }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.6 }}
            >
              Weronika
            </motion.span>
          </motion.div>
        </div>

        {/* DÓŁ: co tu znajdziesz */}
        <div className="mt-16 lg:mt-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}>
              // CO TU ZNAJDZIESZ
            </span>
            <motion.span
              aria-hidden
              className="h-px flex-1"
              style={{ background: 'var(--lr-rule-strong)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 1.5 }}
            />
            {!reduce && (
              <motion.span
                aria-hidden
                className="lr-mono hidden md:inline"
                style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.2em' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                scroll ↓
              </motion.span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
            {INDEX.map((it, i) => (
              <motion.div
                key={it.num}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 1.55 + i * 0.09 }}
              >
                <Link href={it.href} className="lr-hero-index group block">
                  <span className="lr-mono" style={{ fontSize: '0.625rem', color: 'var(--lr-accent)', letterSpacing: '0.2em' }}>
                    {it.num}
                  </span>
                  <span className="lr-hero-index__title">{it.big}</span>
                  <span className="lr-hero-index__desc">{it.small}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
