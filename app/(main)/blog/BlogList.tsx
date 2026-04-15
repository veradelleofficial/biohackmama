'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: number
  category: string
  coverImage?: any
}

export default function BlogList({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <>
      {/* Search & Filter */}
      <div className="mb-12 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coastal-ocean w-5 h-5" />
          <input
            type="text"
            placeholder="Szukaj artykułów..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-card border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all duration-300"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl transition-all duration-300 text-cta ${
                category === cat
                  ? 'bg-coastal-gold text-white shadow-coastal-sm'
                  : 'bg-card border border-border/60 text-coastal-slate hover:border-coastal-ocean/40'
              }`}
            >
              {cat === 'all' ? 'Wszystkie' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Brak artykułów.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((article) => (
            <motion.article
              key={article._id}
              variants={itemVariants}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-full h-40 bg-gradient-to-br from-secondary/15 via-primary/8 to-secondary/10 flex items-center justify-center text-5xl">
                📝
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                    {article.category || 'Biohacking'}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.readTime} min</span>
                </div>
                <Link href={`/blog/${article.slug.current}`}>
                  <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2 tracking-heading group-hover:text-coastal-gold transition-colors duration-300">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString('pl-PL')
                      : ''}
                  </span>
                  <Link
                    href={`/blog/${article.slug.current}`}
                    className="text-coastal-gold hover:text-coastal-gold/80 transition-colors text-sm font-medium"
                  >
                    Czytaj →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </>
  )
}
