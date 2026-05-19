'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: 'clamp(6rem, 12vw, 10rem) 0 clamp(4rem, 8vw, 7rem)' }}
    >
      {/* Lab notebook dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(184, 176, 163, 0.18) 1.4px, transparent 1.4px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0',
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 35%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 35%, transparent 90%)',
        }}
      />
      {/* Ambient rose glow — top right */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          right: '-15%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(232,174,189,0.09) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Ambient lime glow — bottom left */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: '-20%',
          left: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(201,242,79,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Vertical hairlines */}
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
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Top row — eyebrow */}
        <motion.div variants={fadeUp} className="mb-12 md:mb-16">
          <span className="lr-eyebrow">Niezależnie od systemu</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp} style={{ maxWidth: '22ch' }}>
          Twój przewodnik po{' '}
          <span className="lr-rose" style={{ fontStyle: 'italic', fontWeight: 300 }}>
            świadomym życiu
          </span>{' '}
          w świecie pełnym chemii.
        </motion.h1>

        {/* Body */}
        <motion.p variants={fadeUp} className="mt-10 md:mt-12" style={{ maxWidth: '56ch' }}>
          Łączę rzetelny biohacking z filozofią non-toxic i mądrością ziołolecznictwa i
          naturoterapii. Pokazuję kobietom, mężczyznom i całym rodzinom, jak oczyścić
          codzienność ze zbędnych toksyn i wejść na najwyższy poziom własnych możliwości, bez
          perfekcji od zaraz.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 md:mt-14 flex flex-wrap gap-3 md:gap-4 items-center"
        >
          <Link href="/kursy" className="lr-cta-primary">
            Poznaj rozwiązania
            <span aria-hidden>→</span>
          </Link>
          <Link href="/audyt" className="lr-cta-ghost">
            Zrób audyt (3 min)
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
