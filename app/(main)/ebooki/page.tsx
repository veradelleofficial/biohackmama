'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getEbooks } from '@/lib/sanity/queries'
import { EbookiCoverHero } from '@/components/ebooki/EbookiCoverHero'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

interface Ebook {
  _id: string
  title: string
  slug: { current: string }
  description: string
  price: number | string
  pages: number
  author?: string
}

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const data = await getEbooks()
        setEbooks(data || [])
      } catch (error) {
        console.error('Error fetching ebooks:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEbooks()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <main className="pb-14 md:pb-20">

      {/* Full-bleed cover hero */}
      <EbookiCoverHero />

      {/* Content — -mt overlaps the hero's bottom fade zone */}
      <div className="container -mt-8 md:-mt-14 relative z-40">

        {/* Bridge card — visual anchor between hero and grid */}
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

        {/* Ebooks grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ładowanie ebooków...</p>
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Brak dostępnych ebooków.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {ebooks.map((ebook) => (
              <motion.div
                key={ebook._id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/ebooki/${ebook.slug.current}`}>
                  <div className="relative mb-5 h-64 bg-gradient-to-br from-secondary/20 via-primary/8 to-secondary/15 rounded-3xl overflow-hidden flex items-center justify-center text-7xl border border-border/40 hover:border-coastal-ocean/40 hover:shadow-coastal-blue transition-all duration-500 cursor-pointer">
                    📖
                  </div>
                </Link>

                <h3 className="font-heading font-semibold text-xl mb-1.5 tracking-heading group-hover:text-coastal-gold transition-colors duration-300">
                  {ebook.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {ebook.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{ebook.pages} stron</p>
                    <p className="text-2xl font-bold text-coastal-gold">{ebook.price} zł</p>
                  </div>
                  <Link
                    href={`/ebooki/${ebook.slug.current}`}
                    className="px-5 py-2.5 bg-coastal-gold text-white rounded-2xl text-sm hover:brightness-110 hover:shadow-coastal transition-all duration-300 text-cta"
                  >
                    Więcej
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-14 md:mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.75)' }}>
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </div>

    </main>
  )
}
