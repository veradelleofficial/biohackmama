import type { Variants } from 'framer-motion'

// Shared easing curves
export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const

// ─── Reveal Variants ──────────────────────────────────────────────────────────

// Standard content reveal — text, body elements
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

// Cards with subtle scale — tiles, article cards
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.70, ease: EASE_OUT },
  },
}

// Fade only — overlays, background elements
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

// Slide in from left
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

// Line-by-line heading reveal — the premium signature move
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.75, ease: EASE_OUT },
  },
}

// ─── Container Variants ───────────────────────────────────────────────────────

// Stagger wrapper for card grids
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
}

// Faster stagger for lists
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

// ─── Viewport config defaults ─────────────────────────────────────────────────

export const VIEWPORT_ONCE = { once: true, margin: '-60px' } as const
export const VIEWPORT_NEAR = { once: true, margin: '-30px' } as const
