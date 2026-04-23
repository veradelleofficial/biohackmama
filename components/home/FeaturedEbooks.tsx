'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const mockEbooks = [
  {
    id: 1,
    title: 'Kompletny przewodnik po mitochondriach',
    subtitle: 'Jak zadbać o energię swoich komórek',
    price: '49 zł',
    pages: 89,
    image: '/images/pexels-daria-liudnaya-8187444.webp',
    imageAlt: 'Kobieta w dynamicznej pozie z jabłkiem — energia komórkowa',
  },
  {
    id: 2,
    title: 'Biohacking skóry',
    subtitle: 'Naturalny przepis na piękną cerę',
    price: '39 zł',
    pages: 64,
    image: '/images/pexels-daria-liudnaya-8187467.webp',
    imageAlt: 'Kobieta z jabłkiem — naturalna pielęgnacja i odżywanie skóry',
  },
  {
    id: 3,
    title: 'Intermittent fasting dla kobiet',
    subtitle: 'Wszystko co musisz wiedzieć',
    price: '44 zł',
    pages: 76,
    image: '/images/pexels-daria-liudnaya-8187460.webp',
    imageAlt: 'Kobiety z owocami — post przerywany i zdrowe odżywianie',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

export default function FeaturedEbooks() {
  return (
    <section className="py-14 md:py-20 lg:py-24 relative">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-1.5 md:mb-2">
            <Image src="/images/icon.webp" alt="" width={64} height={64} className="h-14 md:h-16 w-auto" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
            Nasze ebooki
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-light px-4 md:px-0" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Praktyczne przewodniki do pobrania i czytania o każdej porze
          </p>
        </motion.div>

        {/* Coming soon */}
        <motion.div
          className="text-center py-10 md:py-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(166,138,105,0.85)' }}>
            Już wkrótce
          </p>
          <p className="text-base font-light max-w-md mx-auto leading-relaxed mb-8" style={{ color: 'rgba(72,89,107,0.70)' }}>
            Pracuję nad ebookami, które pomogą Ci wziąć zdrowie w swoje ręce. Obserwuj mnie na Instagramie, żeby być pierwsza.
          </p>
          <Link
            href="/ebooki"
            className="inline-block px-8 py-3.5 border border-coastal-ocean/30 text-coastal-slate rounded-3xl hover:bg-secondary/10 hover:border-coastal-ocean/50 transition-all duration-200 active:scale-[0.97] text-cta text-sm"
          >
            Dowiedz się więcej
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
