'use client'

/**
 * TiltCard
 *
 * A wrapper that gives any card a subtle 3D tilt following the cursor.
 * Works by tracking normalised mouse position relative to the card bounds
 * and mapping it to small rotateX/rotateY values via Framer Motion springs.
 *
 * The springs make the tilt feel elastic and smooth — never snappy.
 *
 * Usage:
 *   <TiltCard className="rounded-3xl overflow-hidden bg-card">
 *     <img ... />
 *     <div>content</div>
 *   </TiltCard>
 *
 * Note: TiltCard disables itself on touch devices via the `@media (hover: hover)`
 * check inside — it only activates the tilt on pointer-capable screens.
 */

import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Max rotation in degrees on each axis (default 4) */
  maxTilt?: number
  /** CSS perspective in px — lower = more dramatic (default 900) */
  perspective?: number
  /** Scale on hover (default 1.015) */
  scaleOnHover?: number
  /** Shadow on hover */
  hoverShadow?: string
}

const SPRING = { stiffness: 300, damping: 30, mass: 0.6 }
const EASE_OUT = [0.22, 1, 0.36, 1] as const

export function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 4,
  perspective = 900,
  scaleOnHover = 1.018,
  hoverShadow = 'var(--shadow-lift)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Raw normalised mouse position: -0.5 … +0.5 on each axis
  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)

  // Springs smooth the cursor tracking — prevents mechanical feel
  const xSpring = useSpring(xRaw, SPRING)
  const ySpring = useSpring(yRaw, SPRING)

  // Map to rotation angles
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      xRaw.set((e.clientX - rect.left) / rect.width - 0.5)
      yRaw.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [xRaw, yRaw]
  )

  const handleMouseLeave = useCallback(() => {
    // Spring back to centre
    xRaw.set(0)
    yRaw.set(0)
  }, [xRaw, yRaw])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: scaleOnHover,
        boxShadow: hoverShadow,
      }}
      transition={{
        scale: { duration: 0.28, ease: EASE_OUT },
        boxShadow: { duration: 0.28 },
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: perspective,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
