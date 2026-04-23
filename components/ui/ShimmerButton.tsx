'use client'

/**
 * ShimmerButton
 *
 * A premium CTA button with a sweeping metallic light shimmer.
 * The shimmer is a semi-transparent diagonal bar that slides across
 * the button every `repeatDelay` seconds — attention-capturing but
 * never aggressive.
 *
 * On hover: shimmer accelerates + button lifts with gold glow.
 * On press: physical scale snap.
 *
 * Usage:
 *   <ShimmerButton onClick={handlePurchase}>
 *     <Download size={18} /> Kup i pobierz — 49 zł
 *   </ShimmerButton>
 */

import { motion } from 'framer-motion'

interface ShimmerButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  variant?: 'gold' | 'navy'
}

const gradients = {
  gold:  'linear-gradient(135deg, #A68A69 0%, #c4a882 50%, #8a7058 100%)',
  navy:  'linear-gradient(135deg, #213a50 0%, #3a5f7a 50%, #213a50 100%)',
}

const glows = {
  gold: '0 8px 28px rgba(166,138,105,0.40)',
  navy: '0 8px 28px rgba(33,58,80,0.35)',
}

export function ShimmerButton({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'gold',
}: ShimmerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden w-full py-4 rounded-2xl font-semibold text-white text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      style={{ background: gradients[variant] }}
      whileHover={disabled ? {} : {
        scale: 1.02,
        boxShadow: glows[variant],
      }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.20, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Shimmer bar — slides left → right on repeat ──────────────── */}
      <motion.div
        className="absolute inset-y-0 pointer-events-none"
        style={{
          width: '35%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.26) 50%, transparent 100%)',
          skewX: '-12deg',
        }}
        initial={{ left: '-40%' }}
        animate={{ left: '140%' }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 3.5,
          ease: 'easeInOut',
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {children}
      </span>
    </motion.button>
  )
}
