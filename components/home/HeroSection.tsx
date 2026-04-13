'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CaretDown } from '@phosphor-icons/react'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const scrollVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20 pb-10 px-0">
      {/* Background image — no parallax on mobile (causes issues on iOS) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/pexels-fbyf-studio-1601304170-29705714.webp"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-coastal-sand/70" />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-coastal-sand/80 via-coastal-sand/60 to-transparent" />
      </div>


      {/* Content */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 md:px-5 md:py-2.5 bg-primary/10 text-primary rounded-full text-[10px] md:text-xs tracking-cta font-medium mb-4 md:mb-6 border border-primary/20 uppercase">
                PROTOKOŁY ZDROWIA I WYDAJNOŚCI
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-normal mb-5 md:mb-8 tracking-heading uppercase"
              style={{ lineHeight: '1.05' }}
              variants={itemVariants}
            >
              Oczyść,{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-coastal-gold via-coastal-ocean to-coastal-gold">
                BIOHACKUJ
              </span>
              , optymalizuj
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 font-light"
              style={{ lineHeight: '1.6', color: 'rgba(72, 89, 107, 0.8)' }}
              variants={itemVariants}
            >
              Twój przewodnik po świadomym życiu w świecie pełnym chemii. Łączymy rzetelny biohacking z filozofią non-toxic. Wybierz kursy i e-booki, które pomogą Ci oczyścić Twoją codzienność ze zbędnych toksyn i wejść na najwyższy poziom własnych możliwości.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start" variants={itemVariants}>
              <Link
                href="/kursy"
                className="px-6 py-3 md:px-8 md:py-4 bg-coastal-gold text-white rounded-3xl hover:brightness-110 hover:shadow-coastal-lg transition-all duration-300 text-cta text-sm text-center"
              >
                Odkryj rozwiązania
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3 md:px-8 md:py-4 border border-coastal-ocean/40 text-coastal-slate rounded-3xl hover:bg-secondary/10 hover:border-coastal-ocean/60 transition-all duration-300 text-cta text-sm text-center"
              >
                Przeczytaj blog
              </Link>
            </motion.div>
          </motion.div>

          {/* Image — visible on tablet+ */}
          <motion.div
            className="relative hidden md:block mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <figure className="relative max-w-md mx-auto lg:max-w-none">
              <div className="relative w-full aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-coastal-xl">
                <Image
                  src="/images/pexels-fbyf-studio-1601304170-29705721.webp"
                  alt="Kobieta na plaży w porannym słońcu — wellness i biohacking"
                  fill
                  className="object-cover hover:scale-[1.03] transition-transform duration-700"
                  style={{ filter: 'sepia(8%) saturate(90%)' }}
                  sizes="(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 45vw"
                  priority
                />
                <div className="absolute inset-0 bg-coastal-sand/10 pointer-events-none rounded-3xl" />
              </div>
            </figure>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        variants={scrollVariants}
        animate="animate"
      >
        <CaretDown className="w-5 h-5 md:w-6 md:h-6 text-coastal-ocean" />
      </motion.div>
    </section>
  )
}
