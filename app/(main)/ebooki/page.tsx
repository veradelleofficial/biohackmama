'use client'

import { motion } from 'framer-motion'
import { EbookiCoverHero } from '@/components/ebooki/EbookiCoverHero'

export const dynamic = 'force-dynamic'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

export default function EbooksPage() {
  return (
    <main className="pb-14 md:pb-20">

      <EbookiCoverHero />

      <div className="container -mt-8 md:-mt-14 relative z-40">

        <motion.div
          className="mb-10 rounded-3xl border border-border/40 px-5 py-5 md:px-7 md:py-6"
          style={{
            background: 'rgba(239,234,228,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: 'var(--shadow-float)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(33,58,80,0.45)' }}>
            Wszystkie publikacje
          </p>
        </motion.div>

        <motion.div
          className="text-center py-16 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-5xl mb-6">📖</p>
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-heading mb-4" style={{ color: '#213a50' }}>
            Już wkrótce
          </h2>
          <p className="text-base font-light max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(72,89,107,0.70)' }}>
            Pracuję nad ebookami, które pomogą Ci wziąć zdrowie w swoje ręce. Obserwuj mnie na Instagramie, żeby być pierwsza.
          </p>
          <a
            href="https://www.instagram.com/veradelleofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-7 py-3.5 rounded-2xl text-white text-sm font-semibold transition-all duration-300 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #A68A69, #8a7058)', boxShadow: '0 4px 16px rgba(166,138,105,0.30)' }}
          >
            Obserwuj na Instagramie →
          </a>
        </motion.div>

        <div className="mt-14 md:mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.75)' }}>
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </div>

    </main>
  )
}
