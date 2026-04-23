'use client'

/**
 * RevealImage
 *
 * A reusable scroll-triggered image reveal. A solid colour mask slides off the
 * image while simultaneously the image scales from slightly-zoomed (1.08) to
 * natural (1.0). The result feels editorial and intentional — like a printed
 * page coming to life.
 *
 * Usage — fill mode (inside a container with relative + defined height):
 *   <div className="relative w-full h-64 rounded-2xl overflow-hidden">
 *     <RevealImage src="/photo.webp" alt="..." fill sizes="..." />
 *   </div>
 *
 * Usage — intrinsic size:
 *   <RevealImage src="/photo.webp" alt="..." width={800} height={600}
 *     containerClassName="rounded-2xl overflow-hidden" />
 */

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right'

function getMaskAnimation(dir: Direction, revealed: boolean) {
  const hidden = { y: '0%', x: '0%' }
  const exits: Record<Direction, { y: string; x: string }> = {
    up:    { y: '-101%', x: '0%' },
    down:  { y:  '101%', x: '0%' },
    left:  { y: '0%',   x: '-101%' },
    right: { y: '0%',   x:  '101%' },
  }
  return revealed ? exits[dir] : hidden
}

interface RevealImageBaseProps {
  src: string
  alt: string
  sizes?: string
  quality?: number
  priority?: boolean
  className?: string
  containerClassName?: string
  imageStyle?: React.CSSProperties
  /** Colour the mask slides in. Match your page background. */
  maskColor?: string
  /** Which direction the mask slides away (default: 'up') */
  direction?: Direction
  /** Reveal animation duration in seconds (default 0.88) */
  duration?: number
  /** Delay before the reveal starts in seconds (default 0) */
  delay?: number
  /** Viewport margin that triggers the reveal (default '-8% 0px') */
  margin?: string
}

interface FillProps extends RevealImageBaseProps {
  fill: true
  width?: never
  height?: never
}

interface DimensionProps extends RevealImageBaseProps {
  fill?: false
  width: number
  height: number
}

type RevealImageProps = FillProps | DimensionProps

export function RevealImage({
  src,
  alt,
  sizes,
  quality = 85,
  priority,
  className = '',
  containerClassName = '',
  imageStyle,
  maskColor = 'hsl(33,16%,92%)',
  direction = 'up',
  duration = 0.88,
  delay = 0,
  margin = '-8% 0px',
  ...rest
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: margin as any })

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden vintage-film ${containerClassName}`}
    >
      {/* Image — scales from 1.08 → 1.0 as the mask lifts away */}
      <motion.div
        className="w-full h-full"
        animate={{ scale: isInView ? 1 : 1.08 }}
        transition={{ duration: duration + 0.18, ease: EASE_OUT, delay }}
      >
        {'fill' in rest && rest.fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={quality}
            priority={priority}
            className={`object-cover ${className}`}
            style={imageStyle}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={'width' in rest ? rest.width : 800}
            height={'height' in rest ? rest.height : 600}
            sizes={sizes}
            quality={quality}
            priority={priority}
            className={`w-full h-auto ${className}`}
            style={imageStyle}
          />
        )}
      </motion.div>

      {/* Sliding mask overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: maskColor }}
        animate={getMaskAnimation(direction, isInView)}
        transition={{ duration, ease: EASE_OUT, delay }}
      />
    </div>
  )
}
