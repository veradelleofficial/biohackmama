'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  meta?: string
}

export default function PageHeader({ eyebrow, title, description, meta }: PageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)' }}
    >
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          right: '-10%',
          width: '50%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(232,174,189,0.12) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute left-8 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--lr-rule), transparent)' }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute right-8 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--lr-rule), transparent)' }}
      />

      <motion.div
        className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative"
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="lr-eyebrow">{eyebrow}</span>
          {meta && (
            <span className="lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}>
              {meta}
            </span>
          )}
        </div>
        <h1 style={{ maxWidth: '24ch' }}>{title}</h1>
        {description && (
          <p className="mt-8" style={{ maxWidth: '56ch', fontSize: '1.0625rem' }}>
            {description}
          </p>
        )}
      </motion.div>
    </section>
  )
}
