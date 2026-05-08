'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

export default function FeaturedEbooks() {
  return (
    <section className="py-14 md:py-20 lg:py-24 relative">
      <div className="container">
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
          <span
            className="inline-block text-[11px] md:text-xs uppercase font-mono mb-3"
            style={{ color: '#8B6F47', letterSpacing: '0.25em' }}
          >
            Wiedza w PDF
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
            Nasze ebooki
          </h2>
          <div className="flex justify-center mb-5">
            <span className="inline-block w-12 h-[2px] rounded-full" style={{ backgroundColor: '#4F5E44' }} />
          </div>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-light px-4 md:px-0" style={{ color: 'rgba(45, 58, 45, 0.78)' }}>
            Praktyczne przewodniki do pobrania i czytania o każdej porze
          </p>
        </motion.div>

        <motion.div
          className="text-center py-10 md:py-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block text-xs px-4 py-1.5 rounded-full font-medium uppercase tracking-widest mb-5"
            style={{ backgroundColor: '#B89668', color: '#2D3A2D' }}
          >
            Już wkrótce
          </span>
          <p className="text-base font-light max-w-md mx-auto leading-relaxed mb-8" style={{ color: 'rgba(45, 58, 45,0.70)' }}>
            Pracuję nad ebookami, które pomogą Ci wziąć zdrowie w swoje ręce. Obserwuj mnie na Instagramie, żeby być pierwsza.
          </p>
          <Link
            href="/ebooki"
            className="inline-block px-8 py-3.5 rounded-full text-cta text-sm border-2 transition-colors active:scale-[0.97]"
            style={{ borderColor: '#2D3A2D', color: '#2D3A2D' }}
          >
            Dowiedz się więcej
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
