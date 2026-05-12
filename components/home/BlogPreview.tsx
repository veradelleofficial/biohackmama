'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from '@phosphor-icons/react'
import { TiltCard } from '@/components/ui/TiltCard'
import { staggerContainer, cardReveal, VIEWPORT_ONCE } from '@/lib/animations'
import { getArticles } from '@/lib/sanity/queries'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  category: string
  readTime: number
  publishedAt: string
  coverImageUrl?: string | null
  hasContent?: boolean
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export default function BlogPreview() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    getArticles().then((data: Article[]) => {
      const published = (data || []).filter((a) => a.hasContent)
      setArticles(pickRandom(published, 3))
    })
  }, [])

  if (articles.length === 0) return null

  return (
    <section className="py-14 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-1.5 md:mb-2">
            <Image src="/images/icon.webp" alt="" width={64} height={64} className="h-14 md:h-16 w-auto" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
            Najnowsze artykuły
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-light px-4 md:px-0" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Porady, strategie i przepisy na twoje zdrowie
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {articles.map((article) => (
            <motion.div key={article._id} variants={cardReveal}>
              <TiltCard
                className="group bg-card rounded-3xl overflow-hidden border border-border/60"
                style={{ boxShadow: 'var(--shadow-rest)' }}
                maxTilt={3.5}
                scaleOnHover={1.012}
                hoverShadow="var(--shadow-lift)"
              >
                <div className="relative w-full h-48 bg-gradient-to-br from-secondary/15 via-primary/8 to-secondary/10">
                  {article.coverImageUrl ? (
                    <Image
                      src={article.coverImageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ filter: 'sepia(8%) saturate(92%)' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">📝</div>
                  )}
                </div>

                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime} min czytania</span>
                  </div>

                  <Link href={`/blog/${article.slug.current}`}>
                    <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2 tracking-heading transition-colors duration-200 group-hover:text-coastal-gold">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-sm font-light mb-4 line-clamp-2" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={14} weight="duotone" className="text-coastal-ocean" />
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('pl-PL') : ''}
                    </div>
                    <Link
                      href={`/blog/${article.slug.current}`}
                      className="text-coastal-gold hover:text-coastal-gold/80 transition-colors duration-200 inline-flex items-center gap-1.5"
                    >
                      <span className="text-sm font-medium">Czytaj</span>
                      <ArrowRight size={16} className="transition-transform duration-250 group-hover:translate-x-1" style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }} />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/blog"
            className="inline-block px-8 py-3.5 border border-coastal-ocean/30 text-coastal-slate rounded-3xl hover:bg-secondary/10 hover:border-coastal-ocean/50 transition-all duration-200 active:scale-[0.97] text-cta text-sm"
          >
            Wszystkie artykuły
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
