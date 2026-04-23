'use client'

/**
 * app/template.tsx
 *
 * Next.js re-mounts this on every navigation (unlike layout.tsx which persists).
 * That makes it the correct place to attach page-level enter/exit animations.
 *
 * Combined with LayoutAnimationProvider (AnimatePresence) in layout.tsx, this
 * also enables cross-route layoutId shared transitions — Framer Motion can
 * animate an image from its thumbnail position to its full-bleed hero position
 * when the user navigates from /blog → /blog/[slug].
 */

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
