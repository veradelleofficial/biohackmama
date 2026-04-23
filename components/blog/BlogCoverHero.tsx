'use client'

/**
 * BlogCoverHero
 *
 * Three-layer parallax cover for the blog landing page:
 *
 *   Layer 0 (z-0)  — Ken Burns background photo, moves at 32% scroll speed
 *                     (lag = depth illusion of far distance)
 *   Layer 1 (z-10) — gradient overlays: top vignette, bottom page-blend, left contrast
 *   Layer 2 (z-20) — glassmorphism "BLOG" text card, 18% scroll speed (mid-plane)
 *   Layer 3 (z-30) — floating authority photo card, 10% scroll speed (closest)
 *
 * The authority card also has a looped "breathe" animation (y ±8px, 5.5s) and
 * TiltCard 3D hover interaction.
 *
 * Scroll tracking uses { target: heroRef, offset: ['start start', 'end start'] }
 * so scrollYProgress = 0 at load, 1 when the hero is fully scrolled past.
 * Positive Y transforms = elements lag behind = spatial depth.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { KenBurnsImage } from '@/components/ui/KenBurnsImage'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

// Background page color — must match globals.css --background for the bottom blend
const PAGE_BG = '#EFEAE4'

export function BlogCoverHero() {
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: larger value = element moves down more = lags = appears farther
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const glassY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88svh] md:min-h-[80vh] overflow-hidden"
      aria-label="Blog — okładka"
    >

      {/* ── Layer 0: Ken Burns background ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <KenBurnsImage
          src="/images/pexels-daria-liudnaya-8187444.webp"
          alt="Naturalne, zdrowe życie — biohacking dla kobiet"
          priority
          duration={22}
          peakScale={1.06}
          imageStyle={{ filter: 'sepia(8%) saturate(88%) brightness(0.93)' }}
        />
      </motion.div>

      {/* ── Layer 1: Gradient overlays ──────────────────────────────────── */}

      {/* Top vignette — softens navbar edge */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(33,58,80,0.40) 0%, transparent 100%)',
        }}
      />

      {/* Bottom fade — blends photo into page background */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: '55%',
          background: `linear-gradient(to top, ${PAGE_BG} 0%, ${PAGE_BG}99 12%, rgba(239,234,228,0.82) 28%, rgba(239,234,228,0.40) 50%, transparent 100%)`,
        }}
      />

      {/* Left contrast gradient — improves glass card readability on desktop */}
      <div
        className="absolute inset-y-0 left-0 z-10 w-3/5 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(to right, rgba(33,58,80,0.24) 0%, transparent 100%)',
        }}
      />

      {/* ── Layer 2: Glass "BLOG" text card ─────────────────────────────── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 flex items-end pb-16 md:pb-20 pointer-events-none"
        style={{ y: glassY }}
      >
        <div className="container max-w-5xl">
          <motion.div
            className="max-w-[20rem] md:max-w-md rounded-3xl px-7 py-6 md:px-8 md:py-7 pointer-events-auto"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.20)',
              boxShadow:
                '0 8px 40px rgba(33,58,80,0.18), inset 0 1px 0 rgba(255,255,255,0.16)',
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: EASE_OUT }}
          >
            {/* Overline label */}
            <motion.p
              className="text-[9px] font-bold uppercase tracking-[0.24em] mb-3"
              style={{ color: 'rgba(255,255,255,0.55)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.38 }}
            >
              Wiedza · Protokoły · Wyniki
            </motion.p>

            {/* "BLOG" — clipped line reveal */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                className="font-heading font-normal uppercase leading-none tracking-heading"
                style={{
                  fontSize: 'clamp(2.8rem, 8vw, 5rem)',
                  color: '#FFFFFF',
                  letterSpacing: '-0.015em',
                  textShadow: '0 2px 24px rgba(33,58,80,0.28)',
                }}
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.80, delay: 0.28, ease: EASE_OUT }}
              >
                Blog
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              className="text-sm md:text-base font-light leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.80)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52, ease: EASE_OUT }}
            >
              Artykuły, porady i protokoły na twoje zdrowie
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}
