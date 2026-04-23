'use client'

import { motion } from 'framer-motion'
import { lineReveal } from '@/lib/animations'

interface AnimatedHeadingProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  className?: string
  delay?: number
  once?: boolean
}

export function AnimatedHeading({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  once = true,
}: AnimatedHeadingProps) {
  const lines = text.split('\n')

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.11,
        delayChildren: delay,
      },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-50px' }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              variants={lineReveal}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
