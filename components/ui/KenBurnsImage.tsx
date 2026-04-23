'use client'

/**
 * KenBurnsImage
 *
 * Wraps next/image with a continuous, very slow scale oscillation (1 → scale → 1).
 * Makes hero and background images feel "alive" without being distracting.
 *
 * Usage:
 *   <div className="relative w-full h-[500px] overflow-hidden">
 *     <KenBurnsImage src="/hero.webp" alt="..." fill priority />
 *   </div>
 *
 * The parent MUST have:
 *   - position: relative  (or absolute)
 *   - overflow: hidden    (so the scale doesn't bleed)
 */

import { motion } from 'framer-motion'
import Image from 'next/image'

interface KenBurnsImageProps {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  quality?: number
  /** Duration of one full breathe cycle in seconds (default 14) */
  duration?: number
  /** Peak scale — keep between 1.03 and 1.07 for subtlety (default 1.05) */
  peakScale?: number
  /** CSS filter applied to the image */
  imageStyle?: React.CSSProperties
  className?: string
}

export function KenBurnsImage({
  src,
  alt,
  priority,
  sizes,
  quality = 85,
  duration = 14,
  peakScale = 1.05,
  imageStyle,
  className = '',
}: KenBurnsImageProps) {
  return (
    <motion.div
      className="absolute inset-0 vintage-film"
      // Slightly oversized so the zoom never reveals edges
      style={{ inset: '-4%', willChange: 'transform' }}
      animate={{ scale: [1, peakScale, 1] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        // Prevent jarring restart: ease both in and out of each cycle
        times: [0, 0.5, 1],
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? '100vw'}
        quality={quality}
        className={`object-cover ${className}`}
        style={imageStyle}
      />
    </motion.div>
  )
}
