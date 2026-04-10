'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Brain, Sparkles, Zap, Leaf, Users } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Holizm', description: 'Patrzę na ciebie jako całość' },
  { icon: Brain, title: 'Nauka', description: 'Wszystko oparte na badaniach' },
  { icon: Sparkles, title: 'Transformacja', description: 'Rzeczywiste zmiany w życiu' },
  { icon: Zap, title: 'Energia', description: 'Power up dla twojego ciała' },
  { icon: Leaf, title: 'Naturalność', description: 'Naturalne podejście zawsze' },
  { icon: Users, title: 'Społeczność', description: 'Razem jesteśmy silniejsze' },
]

export default function ValuesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div className="container">
        {/* Editorial split: Image left, heading right — Z-pattern reversal */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Left: Community image */}
          <figure className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-coastal-lg">
              <Image
                src="/images/pexels-daria-liudnaya-8187450.webp"
                alt="Kobiety wspierające się wzajemnie — siła społeczności"
                fill
                className="object-cover"
                style={{ filter: 'sepia(8%) saturate(92%)' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-coastal-sand/12 pointer-events-none" />
            </div>
          </figure>

          {/* Right: Heading + description */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
              Nasze wartości
            </h2>
            <p className="text-lg font-light mb-6" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
              Zasady, którymi kieruję się w każdym kursie, artykule i poradzie. Każda decyzja opiera się na nauce, holistycznym podejściu i głębokim szacunku do kobiecego ciała.
            </p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group relative bg-card rounded-3xl p-5 md:p-8 border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:border-coastal-ocean/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

                <div className="relative">
                  <div className="inline-block p-3.5 bg-secondary/15 rounded-2xl mb-5 group-hover:bg-secondary/25 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-coastal-ocean" />
                  </div>

                  <h3 className="font-heading font-semibold text-xl mb-2 tracking-heading">
                    {value.title}
                  </h3>

                  <p className="font-light" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* About CTA — with parallax background image */}
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-coastal-ocean/15 shadow-coastal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Background image with parallax */}
          <div className="absolute inset-0">
            <Image
              src="/images/pexels-fbyf-studio-1601304170-29705714.webp"
              alt="Kobieta na plaży — aktywny styl życia"
              fill
              className="object-cover"
              style={{ filter: 'sepia(10%) saturate(85%)' }}
              sizes="100vw"
            />
            {/* Strong overlay for text readability */}
            <div className="absolute inset-0 bg-coastal-sand/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-coastal-sand/90 via-coastal-sand/75 to-coastal-sand/60" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-14 text-center">
            <h3 className="text-3xl md:text-4xl font-heading font-normal mb-4 tracking-heading">
              Poznaj moją historię
            </h3>
            <p className="text-lg max-w-2xl mx-auto mb-8 font-light" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
              Dowiedz się, kim jestem, jak zaczęła się moja przygoda z biohackingiem i czemu to robię.
            </p>
            <Link
              href="/o-mnie"
              className="inline-block px-8 py-3.5 bg-coastal-gold text-white rounded-3xl hover:brightness-110 hover:shadow-coastal-lg transition-all duration-300 text-cta text-sm"
            >
              O mnie
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
