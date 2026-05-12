'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, CheckCircle, BookOpen, Shield } from 'lucide-react'
import { FloatingBookCover } from '@/components/ui/FloatingBookCover'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { staggerContainer, fadeUp, VIEWPORT_ONCE } from '@/lib/animations'

interface Ebook {
  _id: string
  title: string
  slug: { current: string }
  description: string
  price: number | string
  pages: number
  author?: string
  content?: string
  downloadUrl?: string
  coverImage?: string
  benefits?: string[]
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

export default function EbookContent({ ebook }: { ebook: Ebook | null }) {
  if (!ebook) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <h1 className="text-2xl font-heading font-semibold mb-4">Ebook nie znaleziony</h1>
          <Link href="/ebooki" className="text-coastal-gold hover:underline">
            Wróć do ebooków
          </Link>
        </div>
      </main>
    )
  }

  const fallbackBenefits = [
    'Praktyczne protokoły oparte na nauce',
    'Autorskie analizy i przemyślenia Very Delle',
    'Natychmiastowy dostęp do pliku PDF',
    'Wiedza gotowa do wdrożenia od pierwszej strony',
  ]

  const displayBenefits = ebook.benefits && ebook.benefits.length > 0
    ? ebook.benefits
    : fallbackBenefits

  return (
    <main className="pt-24 md:pt-32 pb-20">
      <div className="container max-w-5xl">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <Link
            href="/ebooki"
            className="inline-flex items-center gap-1.5 text-sm hover:text-coastal-gold transition-colors duration-200"
            style={{ color: 'rgba(72,89,107,0.6)' }}
          >
            <ArrowLeft size={15} />
            Ebooki
          </Link>
        </motion.div>

        {/* ── Hero grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — floating book cover */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <FloatingBookCover
              title={ebook.title}
              pages={ebook.pages}
              coverImage={ebook.coverImage}
              accentColor="#A68A69"
              spineColor="#213a50"
            />
            <p
              className="text-center text-xs mt-6 font-medium"
              style={{ color: 'rgba(33,58,80,0.45)' }}
            >
              <BookOpen size={12} className="inline mr-1.5 -mt-px" />
              {ebook.pages} stron · Format PDF
            </p>
          </motion.div>

          {/* Right — info + purchase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
          >
            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl font-body font-bold leading-tight mb-4"
              style={{ color: '#213a50', letterSpacing: '-0.02em' }}
            >
              {ebook.title}
            </h1>

            {/* Description */}
            <p
              className="text-base leading-relaxed mb-8 font-light"
              style={{ color: 'rgba(72,89,107,0.80)' }}
            >
              {ebook.description}
            </p>

            {/* Purchase card */}
            <div
              className="rounded-3xl border border-coastal-gold/25 overflow-hidden mb-8"
              style={{ boxShadow: 'var(--shadow-rest)' }}
            >
              <div
                className="px-6 pt-6 pb-5"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(166,138,105,0.08) 0%, rgba(174,202,232,0.10) 100%)',
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'rgba(33,58,80,0.45)' }}
                >
                  Cena
                </p>
                <p
                  className="text-5xl font-bold leading-none mb-1"
                  style={{ color: '#213a50' }}
                >
                  {ebook.price}{' '}
                  <span className="text-2xl font-medium" style={{ color: 'rgba(33,58,80,0.55)' }}>
                    zł
                  </span>
                </p>
                <p className="text-xs" style={{ color: 'rgba(33,58,80,0.45)' }}>
                  Jednorazowa płatność · Dostęp na zawsze
                </p>
              </div>

              <div className="px-6 pb-6 pt-5 space-y-3 bg-card">
                <ShimmerButton>
                  <Download size={17} />
                  Kup i pobierz
                </ShimmerButton>

                <div className="flex items-center justify-center gap-1.5 text-xs" style={{ color: 'rgba(33,58,80,0.45)' }}>
                  <Shield size={11} />
                  Bezpieczna płatność · Natychmiastowe pobranie
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(33,58,80,0.45)' }}
              >
                Co znajdziesz w środku
              </p>
              <motion.ul
                className="space-y-2.5"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {displayBenefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: '#A68A69' }}
                    />
                    <span className="text-sm" style={{ color: 'rgba(33,58,80,0.80)' }}>
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Author */}
            {ebook.author && (
              <div
                className="mt-8 pt-6 border-t"
                style={{ borderColor: 'rgba(33,58,80,0.10)' }}
              >
                <p className="text-xs" style={{ color: 'rgba(33,58,80,0.50)' }}>
                  Autorka:{' '}
                  <Link
                    href="/o-mnie"
                    className="font-medium hover:text-coastal-gold transition-colors duration-200"
                    style={{ color: 'rgba(33,58,80,0.70)' }}
                  >
                    {ebook.author}
                  </Link>
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Extended description ───────────────────────────────────── */}
        {ebook.content && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mt-16 pt-14 border-t"
            style={{ borderColor: 'rgba(33,58,80,0.10)' }}
          >
            <h2
              className="font-accent font-semibold text-2xl md:text-3xl normal-case mb-6"
              style={{ color: '#213a50' }}
            >
              O tym ebooku
            </h2>
            <div
              className="bg-card border border-border/60 rounded-3xl p-8"
              style={{ boxShadow: 'var(--shadow-rest)' }}
            >
              <p className="text-muted-foreground">
                Pełna zawartość pojawi się po skonfigurowaniu Sanity CMS.
              </p>
            </div>
          </motion.div>
        )}

        {/* ── CTA bottom ────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 text-center"
        >
          <p className="text-sm mb-5" style={{ color: 'rgba(33,58,80,0.55)' }}>
            Zainteresowana innymi ebookami?
          </p>
          <Link
            href="/ebooki"
            className="inline-block px-8 py-3.5 border border-coastal-ocean/30 text-coastal-slate rounded-3xl hover:bg-secondary/10 transition-all duration-200 text-cta text-sm active:scale-[0.97]"
          >
            Zobacz wszystkie ebooki
          </Link>
        </motion.div>

      </div>
    </main>
  )
}
