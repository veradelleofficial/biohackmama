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

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {mockEbooks.map((ebook) => (
            <motion.div
              key={ebook.id}
              variants={cardVariants}
              className="group"
            >
              {/* Ebook cover */}
              <figure className="relative mb-5">
                <div
                  className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden
                             border border-border/40 img-zoom
                             transition-[border-color,box-shadow] duration-300
                             hover:border-coastal-ocean/40 hover:shadow-coastal"
                >
                  <Image
                    src={ebook.image}
                    alt={ebook.imageAlt}
                    fill
                    className="object-cover"
                    style={{ filter: 'sepia(10%) saturate(90%)' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-coastal-sand/10 pointer-events-none" />
                  {/* Hover overlay — appears from opacity 0 */}
                  <div className="absolute inset-0 bg-coastal-slate/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300" style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }} />
                  </div>
                </div>
              </figure>

              <h3 className="font-heading font-semibold text-xl mb-1.5 tracking-heading">
                {ebook.title}
              </h3>
              <p className="text-sm font-light mb-3" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
                {ebook.subtitle}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{ebook.pages} stron</p>
                  <p className="text-2xl font-bold text-coastal-gold">{ebook.price}</p>
                </div>
                <Link
                  href={`/ebooki/${ebook.id}`}
                  className="px-5 py-2.5 bg-coastal-gold text-white rounded-2xl text-sm
                             hover:brightness-110 hover:shadow-coastal
                             transition-[transform,filter,box-shadow] duration-200
                             active:scale-[0.97] text-cta"
                >
                  Więcej
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/ebooki"
            className="inline-block px-8 py-3.5 border border-coastal-ocean/30 text-coastal-slate rounded-3xl
                       hover:bg-secondary/10 hover:border-coastal-ocean/50
                       transition-[transform,background-color,border-color] duration-200
                       active:scale-[0.97] text-cta text-sm"
          >
            Wszystkie ebooki
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
