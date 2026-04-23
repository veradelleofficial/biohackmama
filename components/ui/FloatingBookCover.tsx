'use client'

/**
 * FloatingBookCover
 *
 * A premium ebook mockup with two layered animations:
 *
 *   1. FLOAT  — continuous sinusoidal y oscillation (0 → -14px → 0, 5s loop)
 *               The shadow under the book fades + compresses in sync.
 *   2. TILT   — mouse-tracked 3D perspective tilt (±8°) via spring physics.
 *               Returns to centre on mouse leave.
 *
 * Usage:
 *   <FloatingBookCover title="Tytuł ebooka" pages={120} accentColor="#A68A69" />
 *   <FloatingBookCover title="..." coverImage="/covers/ebook.webp" />
 */

import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

const SPRING = { stiffness: 240, damping: 26, mass: 0.7 }

interface FloatingBookCoverProps {
  title: string
  subtitle?: string
  pages?: number
  /** If provided, used as the cover photo */
  coverImage?: string
  /** Spine + gradient accent colour (default coastal gold) */
  accentColor?: string
  spineColor?: string
}

export function FloatingBookCover({
  title,
  subtitle,
  pages,
  coverImage,
  accentColor = '#A68A69',
  spineColor  = '#213a50',
}: FloatingBookCoverProps) {
  const ref  = useRef<HTMLDivElement>(null)
  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)
  const xSpr = useSpring(xRaw, SPRING)
  const ySpr = useSpring(yRaw, SPRING)

  const rotateX = useTransform(ySpr, [-0.5, 0.5], [ 9, -9])
  const rotateY = useTransform(xSpr, [-0.5, 0.5], [-9,  9])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    xRaw.set((e.clientX - r.left) / r.width  - 0.5)
    yRaw.set((e.clientY - r.top)  / r.height - 0.5)
  }, [xRaw, yRaw])

  const onMouseLeave = useCallback(() => {
    xRaw.set(0)
    yRaw.set(0)
  }, [xRaw, yRaw])

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* ── Float wrapper ─────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* ── Tilt wrapper ──────────────────────────────────────────────── */}
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            transformPerspective: 900,
          }}
          className="cursor-pointer"
        >
          {/* ── Book body ─────────────────────────────────────────────── */}
          <div
            className="relative flex rounded-r-xl overflow-hidden"
            style={{
              width: '200px',
              height: '280px',
              boxShadow: '8px 12px 40px rgba(33,58,80,0.28), 2px 4px 12px rgba(33,58,80,0.18)',
            }}
          >
            {/* Spine — left edge */}
            <div
              className="flex-shrink-0 w-4 h-full"
              style={{ background: spineColor }}
            />

            {/* Front cover */}
            <div className="relative flex-1 h-full">
              {coverImage ? (
                <Image src={coverImage} alt={title} fill className="object-cover" sizes="200px" />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-5 text-center"
                  style={{
                    background: `linear-gradient(145deg, ${accentColor} 0%, #c4a882 40%, ${accentColor} 100%)`,
                  }}
                >
                  {/* Decorative line */}
                  <div className="w-8 h-px bg-white/40 mb-4" />

                  <p className="text-white/55 text-[9px] uppercase tracking-[0.2em] font-semibold mb-3">
                    BioHackMama
                  </p>

                  <h2 className="text-white font-bold text-base leading-snug mb-3">
                    {title}
                  </h2>

                  {subtitle && (
                    <p className="text-white/70 text-[10px] leading-relaxed">{subtitle}</p>
                  )}

                  <div className="w-8 h-px bg-white/40 mt-4 mb-3" />

                  {pages && (
                    <p className="text-white/45 text-[9px] uppercase tracking-widest">{pages} stron</p>
                  )}
                </div>
              )}

              {/* Gloss sheen — static diagonal highlight */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(125deg, rgba(255,255,255,0.15) 0%, transparent 45%)',
                }}
              />
            </div>
          </div>

          {/* Page stack depth illusion — right edge */}
          <div
            className="absolute right-0 top-1 bottom-1 rounded-r-xl"
            style={{
              width: '6px',
              background: 'linear-gradient(90deg, #e8e4df, #f5f3f0)',
              boxShadow: '2px 0 4px rgba(0,0,0,0.12)',
              transform: 'translateX(4px) translateZ(-2px)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Floating shadow — scales + fades in sync with float ───────── */}
      <motion.div
        animate={{
          opacity:  [0.30, 0.10, 0.30],
          scaleX:   [1.00, 0.80, 1.00],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-4 rounded-full blur-xl"
        style={{
          width: '160px',
          height: '16px',
          background: 'rgba(33,58,80,0.35)',
        }}
      />
    </div>
  )
}
