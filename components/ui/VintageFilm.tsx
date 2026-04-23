'use client'

/**
 * VintageFilm
 *
 * A wrapper that adds an analog film look to any image via CSS overlays.
 * Nothing touches the source image — the effect is built from three layers:
 *
 *   1. Image filter:  contrast(0.82) saturate(0.88) sepia(0.18) brightness(1.03)
 *                     Lowers punch, warms tones, lifts blacks — like Portra 400.
 *
 *   2. ::before       Warm colour grading gradient (sepia → amber → transparent)
 *                     mix-blend-mode: multiply — tints shadows warm, leaves highlights.
 *
 *   3. ::after         Procedural film grain via inline SVG feTurbulence + overlay blend.
 *                     Animated subtly so it "lives" like real film stock.
 *
 * Usage:
 *   <VintageFilm>
 *     <Image src="..." alt="..." fill className="object-cover" />
 *   </VintageFilm>
 *
 *   <VintageFilm className="rounded-2xl" intensity="strong">
 *     <img src="..." alt="..." />
 *   </VintageFilm>
 *
 * Customisation via CSS vars on the container:
 *   --vf-grain-opacity:   grain intensity  (default 0.28)
 *   --vf-sepia:           sepia amount     (default 0.18)
 *   --vf-contrast:        contrast level   (default 0.82)
 *   --vf-warmth-opacity:  grading strength (default 0.14)
 */

import type { ReactNode } from 'react'

interface VintageFilmProps {
  children: ReactNode
  className?: string
  /** Preset intensity: subtle, normal, strong */
  intensity?: 'subtle' | 'normal' | 'strong'
  style?: React.CSSProperties
}

const presets = {
  subtle: {
    '--vf-grain-opacity': '0.25',
    '--vf-sepia': '0.18',
    '--vf-contrast': '0.82',
    '--vf-warmth-opacity': '0.12',
  },
  normal: {
    '--vf-grain-opacity': '0.42',
    '--vf-sepia': '0.28',
    '--vf-contrast': '0.75',
    '--vf-warmth-opacity': '0.22',
  },
  strong: {
    '--vf-grain-opacity': '0.55',
    '--vf-sepia': '0.38',
    '--vf-contrast': '0.68',
    '--vf-warmth-opacity': '0.30',
  },
} as const

export function VintageFilm({
  children,
  className = '',
  intensity = 'normal',
  style,
}: VintageFilmProps) {
  return (
    <div
      className={`vintage-film ${className}`}
      style={{ ...presets[intensity], ...style } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
