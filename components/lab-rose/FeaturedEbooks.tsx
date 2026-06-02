'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getEbooks } from '@/lib/sanity/queries'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE } },
}

interface Ebook {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  price?: number | string
  pages?: number
}

const fallbackEbooks: Ebook[] = [
  {
    _id: 'fb-1',
    title: 'Protokół Poranny Mamy',
    slug: { current: 'protokol-poranny-mamy' },
    description: '7 kroków, 8 minut, mierzalna różnica w 14 dni. PDF + checklist do druku.',
    price: 39,
    pages: 42,
  },
  {
    _id: 'fb-2',
    title: 'Cykl Hormonalny w Praktyce',
    slug: { current: 'cykl-hormonalny-w-praktyce' },
    description: 'Co jeść, kiedy trenować i jak się regenerować w każdej fazie cyklu.',
    price: 59,
    pages: 78,
  },
  {
    _id: 'fb-3',
    title: 'Świadoma Suplementacja',
    slug: { current: 'swiadoma-suplementacja' },
    description: 'Czy naprawdę musimy tyle suplementować? Naturalna suplementacja, suplementy must-have i konkretne marki z czystym składem. Jakie polecam, a jakich unikać.',
    price: 49,
    pages: 56,
  },
]

export default function FeaturedEbooks() {
  const [ebooks, setEbooks] = useState<Ebook[]>(fallbackEbooks)

  useEffect(() => {
    getEbooks()
      .then((data: Ebook[]) => {
        if (data && data.length > 0) setEbooks(data.slice(0, 3))
      })
      .catch(() => {
        /* keep fallback */
      })
  }, [])

  return (
    <section
      id="ebooki"
      style={{
        padding: 'clamp(4rem, 9vw, 8rem) 0',
        background: 'var(--lr-surface)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <span className="lr-eyebrow">Biblioteka</span>
            <h2 className="mt-6" style={{ maxWidth: '18ch' }}>
              Gotowa wiedza do{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                pobrania.
              </span>
            </h2>
          </div>
          <Link href="/ebooki" className="lr-cta-ghost">
            Cała biblioteka
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {ebooks.map((e, i) => (
            <motion.article
              key={e._id}
              variants={fadeUp}
              style={{
                backgroundImage:
                  'linear-gradient(rgba(12,12,12,0.92), rgba(12,12,12,0.94)), url(/images/bio-bg-2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                border: '1px solid var(--lr-rule)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Number */}
              <div className="flex items-center justify-between mb-8">
                <span
                  className="lr-mono"
                  style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}
                >
                  // ebook · {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="lr-mono"
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--lr-accent)',
                    letterSpacing: '0.18em',
                  }}
                >
                  PDF
                </span>
              </div>

              <h3 style={{ minHeight: '3em' }}>{e.title}</h3>

              <p className="mt-4 mb-8" style={{ fontSize: '0.9375rem', flexGrow: 1 }}>
                {e.description || 'Opis ebooka.'}
              </p>

              {/* Price row */}
              <div
                className="lr-mono"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  paddingTop: '1.25rem',
                  marginBottom: '1.5rem',
                  borderTop: '1px solid var(--lr-rule)',
                }}
              >
                <span style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}>
                  {e.pages || '·'} stron
                </span>
                <span
                  style={{
                    color: 'var(--lr-accent)',
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {typeof e.price === 'number' ? `${e.price} zł` : e.price || '· zł'}
                </span>
              </div>

              <Link
                href={`/ebooki/${e.slug.current}`}
                className="lr-cta-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Kup ebook
                <span aria-hidden>→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
