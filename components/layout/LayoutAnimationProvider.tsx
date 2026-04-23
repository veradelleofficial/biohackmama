'use client'

/**
 * LayoutAnimationProvider
 *
 * Wraps the app with AnimatePresence in `popLayout` mode.
 * This is what powers two things:
 *
 *   1. Page exit animations — the template.tsx motion.div plays its exit
 *      variant before the new page enters.
 *
 *   2. Cross-route layoutId transitions — with `mode="popLayout"`, the
 *      exiting page is briefly kept in the DOM (but removed from layout flow)
 *      while the new page mounts. During that overlap, Framer Motion can
 *      animate a shared layoutId between an article thumbnail and its hero.
 *
 * Placed in layout.tsx wrapping {children} (above Navbar so the exit layer
 * doesn't occlude the persistent navigation).
 */

import { AnimatePresence } from 'framer-motion'

export function LayoutAnimationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <AnimatePresence mode="popLayout">{children}</AnimatePresence>
}
