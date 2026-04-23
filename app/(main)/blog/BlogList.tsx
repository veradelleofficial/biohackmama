'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { cardReveal, staggerContainer } from '@/lib/animations'
import { TiltCard } from '@/components/ui/TiltCard'
import { RevealImage } from '@/components/ui/RevealImage'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: number
  category: string
  coverImageUrl?: string | null
  hasContent?: boolean
}

export default function BlogList({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [focused, setFocused] = useState(false)
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setItemsPerPage(mq.matches ? 6 : 4)
    const handler = (e: MediaQueryListEvent) => { setItemsPerPage(e.matches ? 6 : 4); setPage(1) }
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

  // Reset to page 1 when filters change
  const setSearchAndReset = useCallback((v: string) => { setSearch(v); setPage(1) }, [])
  const setCategoryAndReset = useCallback((v: string) => { setCategory(v); setPage(1) }, [])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <>
      {/* ── Search & Filter — bridge card ───────────────────────────────── */}
      {/*   Negative top margin pulls this card up into the hero's fade zone,  */}
      {/*   creating a seamless visual bridge between the photo and the grid.   */}
      <motion.div
        className="mb-10 rounded-3xl border border-border/40 space-y-4 px-5 py-5 md:px-7 md:py-6"
        style={{
          background: 'rgba(239,234,228,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-float)',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Search input with animated focus ring */}
        <motion.div
          animate={
            focused
              ? { boxShadow: '0 0 0 3px rgba(166,138,105,0.18), 0 0 0 1px rgba(166,138,105,0.45)' }
              : { boxShadow: '0 0 0 0px rgba(166,138,105,0)' }
          }
          transition={{ duration: 0.22 }}
          className="relative rounded-2xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coastal-ocean w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Szukaj artykułów..."
            value={search}
            onChange={(e) => setSearchAndReset(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full pl-12 pr-4 py-3.5 bg-card border border-border/60 rounded-2xl focus:outline-none transition-colors duration-300"
            style={{ color: '#213a50' }}
          />
        </motion.div>

        {/* Category pills — staggered drift-in */}
        <motion.div
          className="flex flex-wrap gap-2"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setCategoryAndReset(cat)}
              variants={{
                hidden: { opacity: 0, y: 8, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`px-5 py-2.5 rounded-2xl transition-colors duration-250 text-cta ${
                category === cat
                  ? 'bg-coastal-gold text-white shadow-coastal-sm'
                  : 'bg-card border border-border/60 text-coastal-slate hover:border-coastal-ocean/40'
              }`}
            >
              {cat === 'all' ? 'Wszystkie' : cat}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Article Grid ────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Brak artykułów.</p>
        </div>
      ) : (
        <>
          <motion.div
            key={page}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {paginated.map((article, i) => {
              const coverUrl = article.coverImageUrl || null
              const colOffset = i % 3 === 1 ? 'lg:translate-y-6' : ''
              const isEmpty = !article.hasContent

              return (
                <motion.div
                  key={article._id}
                  variants={cardReveal}
                  className={colOffset}
                >
                  <TiltCard
                    className={`group relative bg-card rounded-3xl overflow-hidden border border-border/60 ${isEmpty ? 'opacity-55 saturate-[0.4]' : ''}`}
                    style={{ boxShadow: 'var(--shadow-rest)' }}
                    maxTilt={isEmpty ? 0 : 3.5}
                    scaleOnHover={isEmpty ? 1 : 1.012}
                    hoverShadow={isEmpty ? 'var(--shadow-rest)' : 'var(--shadow-lift)'}
                  >
                    <motion.div
                      layoutId={`article-cover-${article.slug.current}`}
                      className="relative w-full h-48 bg-gradient-to-br from-secondary/15 via-primary/8 to-secondary/10"
                    >
                      {coverUrl ? (
                        <RevealImage
                          src={coverUrl}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          containerClassName="absolute inset-0"
                          direction="up"
                          duration={0.80}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">
                          📝
                        </div>
                      )}
                      {isEmpty && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase"
                            style={{ background: 'rgba(33,58,80,0.72)', color: '#fff', backdropFilter: 'blur(6px)', letterSpacing: '0.08em' }}>
                            Już wkrótce
                          </span>
                        </div>
                      )}
                    </motion.div>

                    <div className="relative p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                          {article.category || 'Biohacking'}
                        </span>
                        <span className="text-xs text-muted-foreground">{article.readTime} min</span>
                      </div>
                      {isEmpty ? (
                        <h3 className="font-body font-semibold text-lg mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                      ) : (
                        <Link href={`/blog/${article.slug.current}`}>
                          <h3 className="font-body font-semibold text-lg mb-2 line-clamp-2 group-hover:text-coastal-gold transition-colors duration-300">
                            {article.title}
                          </h3>
                        </Link>
                      )}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">
                          {article.publishedAt
                            ? new Date(article.publishedAt).toLocaleDateString('pl-PL')
                            : ''}
                        </span>
                        {isEmpty ? (
                          <span className="text-xs text-muted-foreground italic">Już wkrótce</span>
                        ) : (
                          <Link
                            href={`/blog/${article.slug.current}`}
                            className="text-coastal-gold text-sm font-medium group-hover:translate-x-0.5 transition-transform duration-200"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                          >
                            Czytaj →
                          </Link>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Pagination ──────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center gap-4">
              {/* Page info */}
              <p className="text-xs" style={{ color: 'rgba(33,58,80,0.45)' }}>
                Strona {page} z {totalPages}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {page > 1 && (
                  <button
                    onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border/60 bg-card text-coastal-slate text-sm font-medium hover:border-coastal-ocean/40 active:scale-[0.97] transition-all duration-200"
                    style={{ boxShadow: 'var(--shadow-rest)' }}
                  >
                    <ChevronLeft size={16} />
                    Poprzednia
                  </button>
                )}
                {page < totalPages && (
                  <button
                    onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white text-sm font-semibold active:scale-[0.97] transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #A68A69, #8a7058)',
                      boxShadow: '0 4px 16px rgba(166,138,105,0.30)',
                    }}
                  >
                    Następna strona
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
