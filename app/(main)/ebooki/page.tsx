'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getEbooks } from '@/lib/sanity/queries'
import PageHeader from '@/components/lab-rose/PageHeader'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
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
    title: 'Poranny Protokół',
    slug: { current: 'poranny-protokol' },
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
    description: '12 suplementów, które warto mieć. I 12, które są wyrzucaniem pieniędzy.',
    price: 49,
    pages: 56,
  },
]

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEbooks()
      .then((data) => setEbooks(data && data.length > 0 ? data : fallbackEbooks))
      .catch(() => setEbooks(fallbackEbooks))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Biblioteka · Ebooki"
        title={
          <>
            Konkretna wiedza dla{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              osób,
            </span>{' '}
            które chcą wziąć zdrowie w swoje ręce.
          </>
        }
        description="Lata zagłębiania się w temacie, sprawdzania na sobie. Skondensowane do ebooka, który przeczytasz w jeden wieczór."
      />

      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(5rem, 9vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          {loading ? (
            <p className="lr-mono" style={{ fontSize: '0.75rem', color: 'var(--lr-ink-dim)' }}>
              · ładowanie biblioteki ·
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {ebooks.map((e, i) => (
                <motion.article
                  key={e._id}
                  variants={fadeUp}
                  style={{
                    background: 'var(--lr-surface)',
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    border: '1px solid var(--lr-rule)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
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
          )}
        </div>
      </section>

      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--lr-rule)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p
            className="lr-mono"
            style={{
              color: 'var(--lr-ink-dim)',
              fontSize: '0.625rem',
              letterSpacing: '0.22em',
              lineHeight: 1.8,
            }}
          >
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady
            medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu
            życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </section>
    </main>
  )
}
