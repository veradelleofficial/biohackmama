'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import PageHeader from '@/components/lab-rose/PageHeader'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: number
  category: string
  hasContent?: boolean
}

export default function BlogListLabRose({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setItemsPerPage(mq.matches ? 9 : 6)
    const handler = (e: MediaQueryListEvent) => {
      setItemsPerPage(e.matches ? 9 : 6)
      setPage(1)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))],
    [articles]
  )

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = category === 'all' || a.category === category
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt?.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [articles, search, category])

  const setSearchReset = useCallback((v: string) => {
    setSearch(v)
    setPage(1)
  }, [])
  const setCatReset = useCallback((v: string) => {
    setCategory(v)
    setPage(1)
  }, [])

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <>
      <PageHeader
        eyebrow="Blog · Artykuły"
        meta={`${articles.length} ARTYKUŁÓW`}
        title={
          <>
            Porady, strategie i{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              przepisy
            </span>{' '}
            na Twoje zdrowie.
          </>
        }
        description="Hormony, sen, żywienie, longevity, ziołolecznictwo, kosmetyki non-toxic. Wszystko, co przerobiłam na własnej skórze zanim zaczęłam o tym pisać."
      />

      <section style={{ padding: '0 0 clamp(5rem, 9vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Search + filter bar */}
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid var(--lr-rule)',
              background: 'var(--lr-surface)',
              marginBottom: '3rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--lr-ink-dim)',
                }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearchReset(e.target.value)}
                placeholder="Szukaj w dzienniku..."
                className="lr-mono"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.75rem',
                  background: 'var(--lr-bg)',
                  border: '1px solid var(--lr-rule-strong)',
                  color: 'var(--lr-ink)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.04em',
                  borderRadius: '2px',
                  outline: 'none',
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCatReset(cat)}
                  className="lr-mono"
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid',
                    borderColor: category === cat ? 'var(--lr-accent)' : 'var(--lr-rule-strong)',
                    color: category === cat ? 'var(--lr-accent)' : 'var(--lr-ink-soft)',
                    background: 'transparent',
                    fontSize: '0.625rem',
                    cursor: 'pointer',
                    borderRadius: '999px',
                    transition: 'all 200ms var(--ease-out-strong)',
                  }}
                >
                  {cat === 'all' ? 'Wszystkie' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          {paginated.length === 0 ? (
            <p
              className="lr-mono"
              style={{ color: 'var(--lr-ink-dim)', fontSize: '0.75rem', textAlign: 'center', padding: '4rem 0' }}
            >
              · brak artykułów dla tego filtra ·
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: 'var(--lr-rule)' }}
              variants={stagger}
              initial="hidden"
              animate="visible"
              key={`${category}-${search}-${page}`}
            >
              {paginated.map((article) => (
                <motion.article
                  key={article._id}
                  variants={fadeUp}
                  style={{
                    background: 'var(--lr-bg)',
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    className="lr-mono"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.625rem',
                      color: 'var(--lr-ink-dim)',
                      letterSpacing: '0.18em',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span style={{ color: 'var(--lr-rose)' }}>· {article.category}</span>
                    <span>{article.readTime}min</span>
                  </div>

                  <Link
                    href={`/blog/${article.slug.current}`}
                    style={{ textDecoration: 'none', display: 'block', flexGrow: 1 }}
                    className="group"
                  >
                    <h3
                      className="transition-colors duration-300 group-hover:text-[#E8AEBD]"
                      style={{ marginBottom: '0.875rem', fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', lineHeight: 1.2 }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--lr-ink-soft)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {article.excerpt}
                    </p>
                  </Link>

                  <Link
                    href={`/blog/${article.slug.current}`}
                    className="mt-6 inline-flex items-center gap-2 group"
                    style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
                  >
                    <span
                      className="lr-mono"
                      style={{ color: 'var(--lr-accent)', fontSize: '0.625rem' }}
                    >
                      Czytaj
                    </span>
                    <span
                      style={{
                        color: 'var(--lr-accent)',
                        transition: 'transform 240ms var(--ease-out-strong)',
                        display: 'inline-block',
                      }}
                      className="group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-between flex-wrap gap-4">
              <span
                className="lr-mono"
                style={{ color: 'var(--lr-ink-dim)', fontSize: '0.625rem' }}
              >
                STR. {page} / {totalPages} · {filtered.length} ARTYKUŁÓW
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="lr-cta-ghost"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.625rem', opacity: page === 1 ? 0.4 : 1 }}
                >
                  ← Wstecz
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="lr-cta-ghost"
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.625rem', opacity: page === totalPages ? 0.4 : 1 }}
                >
                  Dalej →
                </button>
              </div>
            </div>
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
    </>
  )
}
