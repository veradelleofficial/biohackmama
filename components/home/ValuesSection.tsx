'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
export default function ValuesSection() {

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div className="container">
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
