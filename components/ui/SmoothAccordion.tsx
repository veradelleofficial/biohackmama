'use client'

/**
 * SmoothAccordion
 *
 * A buttery-smooth expand/collapse accordion using Framer Motion's
 * AnimatePresence with `height: 0 → 'auto'` animation.
 *
 * Key technique: `overflow: 'hidden'` on the motion.div clips content
 * during animation. `height: 'auto'` works natively in Framer Motion v11
 * without needing useMeasure — no jitter, no snap.
 *
 * Supports:
 *   - allowMultiple: multiple panels open simultaneously
 *   - defaultOpen: indices open by default
 *   - Custom header and content slots via render props
 *
 * Usage (course curriculum):
 *   <SmoothAccordion items={curriculum.map(module => ({
 *     header: module.title,
 *     lessonCount: module.lessons.length,
 *     content: <LessonList lessons={module.lessons} />
 *   }))} />
 */

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

export interface AccordionItem {
  /** Header label shown always */
  header: string
  /** Optional meta shown in header right side (e.g. "6 lekcji") */
  meta?: string
  /** Content to reveal — any React node */
  content: React.ReactNode
}

interface SmoothAccordionProps {
  items: AccordionItem[]
  /** Allow multiple panels open at once (default: false) */
  allowMultiple?: boolean
  /** Indices open by default */
  defaultOpen?: number[]
  className?: string
}

export function SmoothAccordion({
  items,
  allowMultiple = false,
  defaultOpen   = [0],
  className     = '',
}: SmoothAccordionProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set(defaultOpen))

  const toggle = useCallback((idx: number) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      if (next.has(idx)) {
        next.delete(idx)
      } else {
        if (!allowMultiple) next.clear()
        next.add(idx)
      }
      return next
    })
  }, [allowMultiple])

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openSet.has(idx)
        return (
          <div
            key={idx}
            className="rounded-2xl border border-border/60 overflow-hidden bg-card"
            style={{ boxShadow: isOpen ? 'var(--shadow-rest)' : 'none' }}
          >
            {/* ── Header / toggle ──────────────────────────────────────── */}
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
              aria-expanded={isOpen}
            >
              <span
                className="font-body font-semibold text-sm md:text-base transition-colors duration-200 group-hover:text-coastal-gold"
                style={{ color: '#213a50' }}
              >
                {item.header}
              </span>

              <div className="flex items-center gap-3 flex-shrink-0">
                {item.meta && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary/15 text-coastal-ocean font-medium"
                  >
                    {item.meta}
                  </span>
                )}

                {/* Rotating plus → minus */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="flex-shrink-0"
                >
                  <Plus
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: isOpen ? '#A68A69' : 'rgba(33,58,80,0.45)' }}
                  />
                </motion.div>
              </div>
            </button>

            {/* ── Animated content panel ───────────────────────────────── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height:  { duration: 0.38, ease: EASE_OUT },
                    opacity: { duration: 0.22 },
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  {/* Divider */}
                  <div className="mx-5 h-px bg-border/50" />
                  <div className="px-5 py-4">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
