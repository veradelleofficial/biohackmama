'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { getArticles } from '@/lib/sanity/queries'

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

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filtered, setFiltered] = useState<Article[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles()
        setArticles(data || [])
        setFiltered(data || [])
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  useEffect(() => {
    let result = articles

    if (category !== 'all') {
      result = result.filter((a) => a.category === category)
    }

    if (search) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(result)
  }, [search, category, articles])

  const categories = ['all', ...new Set(articles.map((a) => a.category))]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-normal mb-4 md:mb-5 tracking-heading uppercase">Blog</h1>
          <p className="text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Artykuły, porady i przepisy na twoje zdrowie
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mb-10 p-4 md:p-5 bg-secondary/8 border border-border/40 rounded-2xl text-center">
          <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
            Treści, którymi się dzielę, mają charakter wyłącznie edukacyjny i nie zastępują porady lekarskiej. Pamiętaj, że każdy organizm jest inny – przed wdrożeniem nowych protokołów, suplementacji czy zmian w diecie, skonsultuj się ze swoim lekarzem lub wykwalifikowanym specjalistą.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coastal-ocean w-5 h-5" />
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
                className={`px-5 py-2.5 rounded-2xl transition-all duration-300 ${
                  category === cat
                    ? 'bg-coastal-gold text-white shadow-coastal-sm text-cta'
                    : 'bg-card border border-border/60 text-coastal-slate hover:border-coastal-ocean/40 text-cta'
                }`}
              >
                {cat === 'all' ? 'Wszystkie' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ładowanie artykułów...</p>
          </div>
        ) : filtered.length === 0 ? (
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
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime} min
                    </span>
                  </div>

                  <Link href={`/blog/${article.slug.current}`}>
                    <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2 tracking-heading group-hover:text-coastal-gold transition-colors duration-300">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                    </span>
                    <Link
                      href={`/blog/${article.slug.current}`}
                      className="text-coastal-gold hover:text-coastal-gold/80 transition-colors duration-300 text-sm font-medium"
                    >
                      Czytaj →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
        {/* Bottom disclaimer */}
        <div className="mt-14 md:mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-xs font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </div>
    </main>
  )
}
