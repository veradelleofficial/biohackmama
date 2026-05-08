'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CaretDown } from '@phosphor-icons/react'
import { KenBurnsImage } from '@/components/ui/KenBurnsImage'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  // Scroll-linked parallax — tracked from section start to end
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Background image drifts upward at 35% of scroll speed — creates depth
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  // Content layer moves slightly faster — enhances separation
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  // Subtle opacity fade as user scrolls away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] md:min-h-screen flex items-start md:items-center overflow-hidden pt-[22vh] md:pt-20 pb-10 md:pb-10 px-0"
    >
      {/* ── Background layer (parallax at 0.35x) ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: bgY }}
      >
        {/* KenBurns breathe — desktop only */}
        <div className="hidden md:block absolute inset-0">
          <KenBurnsImage
            src="/images/pexels-fbyf-studio-1601304170-29705714.webp"
            alt=""
            priority
            sizes="100vw"
            duration={16}
            peakScale={1.06}
          />
        </div>

        {/* Mobile background — DNA woman PNG */}
        <div className="md:hidden absolute inset-0">
          <Image
            src="/images/dna-woman-hero.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="100vw"
            priority
          />
        </div>

        {/* Colour overlays */}
        <div className="absolute inset-0" style={{ background: 'rgba(245,241,236,0.72)' }} />
        {/* Mobile: stronger overlay at top so text is readable, fades to transparent at bottom */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-coastal-sand/90 via-coastal-sand/60 to-transparent" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-coastal-sand/80 via-coastal-sand/60 to-transparent" />
      </motion.div>

      {/* ── Content layer (parallax at 0.12x) ────────────────────────────── */}
      <motion.div
        className="container relative z-10 w-full"
        style={{ y: textY, opacity: contentOpacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow label */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-block text-[11px] md:text-xs uppercase font-mono mb-5 md:mb-6"
                style={{ color: '#8B6F47', letterSpacing: '0.25em' }}
              >
                Protokoły zdrowia i wydajności
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-normal mb-5 md:mb-8 tracking-heading uppercase"
              style={{ lineHeight: '1.05', color: '#2D3A2D' }}
              variants={itemVariants}
            >
              Oczyść,{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-coastal-gold via-coastal-ocean to-coastal-gold">
                BIOHACKUJ
              </span>
              , optymalizuj
            </motion.h1>

            {/* Body */}
            <motion.p
              className="text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 font-light"
              style={{ lineHeight: '1.6', color: '#3F4D3D' }}
              variants={itemVariants}
            >
              Twój przewodnik po świadomym życiu w świecie pełnym chemii. Łączymy rzetelny biohacking
              z filozofią non-toxic. Wybierz kursy i e-booki, które pomogą Ci oczyścić Twoją codzienność
              ze zbędnych toksyn i wejść na najwyższy poziom własnych możliwości.
            </motion.p>

            {/* CTAs — primary sage solid, secondary forest outline */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
                <Link
                  href="/kursy"
                  className="block px-7 py-3.5 rounded-full font-medium text-sm uppercase text-center transition-colors"
                  style={{
                    backgroundColor: '#4F5E44',
                    color: '#FBF7EE',
                    letterSpacing: '0.05em',
                  }}
                >
                  Odkryj rozwiązania
                </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
                <Link
                  href="/blog"
                  className="block px-7 py-3.5 rounded-full font-medium text-sm uppercase text-center border-2 transition-colors"
                  style={{
                    borderColor: '#2D3A2D',
                    color: '#2D3A2D',
                    backgroundColor: 'transparent',
                    letterSpacing: '0.05em',
                  }}
                >
                  Przeczytaj blog
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero portrait image — enters from right, no parallax (keeps composition) */}
          <motion.div
            className="relative hidden md:block mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
          >
            <figure className="relative max-w-md mx-auto lg:max-w-none">
              {/* Ambient glow — soft warm bloom behind the image */}
              <div
                className="absolute inset-0 -z-10 blur-3xl scale-110"
                style={{
                  background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(79, 94, 68,0.28) 0%, rgba(184, 150, 104,0.18) 55%, transparent 80%)',
                }}
              />
              {/* Glow ring behind card */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(79, 94, 68,0.4) 0%, transparent 70%)',
                }}
              />
              <motion.div
                className="relative w-full aspect-[2/3] rounded-3xl overflow-hidden img-zoom vintage-film"
                style={{ boxShadow: 'var(--shadow-float)' }}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <Image
                  src="/images/dna-woman-hero.png"
                  alt="Sylwetka kobiety z DNA — biohacking i wellness"
                  fill
                  className="object-contain object-bottom transition-transform duration-700"
                  sizes="(max-width: 768px) 0vw, (max-width: 1024px) 40vw, 35vw"
                  quality={90}
                  priority
                />
              </motion.div>
            </figure>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.7, 0.7, 0],
          y: [4, 0, 6, 4],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      >
        <CaretDown className="w-5 h-5 md:w-6 md:h-6 text-coastal-ocean" />
      </motion.div>
    </section>
  )
}
