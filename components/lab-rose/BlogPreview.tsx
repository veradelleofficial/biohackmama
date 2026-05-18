'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getArticles } from '@/lib/sanity/queries'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  category: string
  readTime: number
  publishedAt: string
  hasContent?: boolean
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export default function BlogPreview() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    getArticles()
      .then((data: Article[]) => {
        const published = (data || []).filter((a) => a.hasContent !== false)
        setArticles(pickRandom(published, 3))
      })
      .catch(() => setArticles([]))
  }, [])

  if (articles.length === 0) return null

  return (
    <section
      id="blog"
      style={{
        padding: 'clamp(4rem, 9vw, 8rem) 0',
        borderTop: '1px solid var(--lr-rule)',
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
            <span className="lr-eyebrow">Artykuły</span>
            <h2 className="mt-6" style={{ maxWidth: '18ch' }}>
              Bezpłatne{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                badania w terenie.
              </span>
            </h2>
          </div>
          <Link href="/blog" className="lr-cta-ghost">
            Cały dziennik
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--lr-rule)' }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {articles.map((article) => (
            <motion.article
              key={article._id}
              variants={fadeUp}
              style={{
                background: 'var(--lr-bg)',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Meta */}
              <div
                className="lr-mono"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.625rem',
                  color: 'var(--lr-ink-dim)',
                  letterSpacing: '0.18em',
                  marginBottom: '1.75rem',
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
                  style={{ marginBottom: '1rem', fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)' }}
                >
                  {article.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
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
                className="mt-8 inline-flex items-center gap-2 group"
                style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
              >
                <span
                  className="lr-mono"
                  style={{ color: 'var(--lr-accent)', fontSize: '0.6875rem' }}
                >
                  Czytaj badanie
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
      </div>
    </section>
  )
}
