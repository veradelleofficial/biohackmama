'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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

const TAG_LIST: { slug: string; label: string }[] = [
  { slug: 'ziololecznictwo', label: 'Ziołolecznictwo' },
  { slug: 'naturopatia', label: 'Naturopatia' },
  { slug: 'medycyna-chinska', label: 'Medycyna Chińska' },
  { slug: 'biohacking', label: 'Biohacking' },
  { slug: 'longevity', label: 'Longevity' },
  { slug: 'biochemia', label: 'Biochemia' },
  { slug: 'nootropiki', label: 'Nootropiki' },
  { slug: 'hormony', label: 'Hormony' },
  { slug: 'cykl-i-kobiecosc', label: 'Cykl i Kobiecość' },
  { slug: 'rytm-dobowy', label: 'Rytm Dobowy' },
  { slug: 'sen', label: 'Sen' },
  { slug: 'post-przerywany', label: 'Post Przerywany' },
  { slug: 'odzywianie', label: 'Odżywianie' },
  { slug: 'suplementacja', label: 'Suplementacja' },
  { slug: 'detoks-i-dom', label: 'Detoks i Dom' },
  { slug: 'mental-wellness', label: 'Mental Wellness' },
  { slug: 'stres-i-kortyzol', label: 'Stres i Kortyzol' },
]

const TAG_LABEL_BY_SLUG = Object.fromEntries(TAG_LIST.map((t) => [t.slug, t.label]))

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt?: string
  readTime?: number
  category?: string
  tags?: string[]
}

export default function TopicLandingContent({
  slug,
  label,
  description,
  articles,
}: {
  slug: string
  label: string
  description: string
  articles: Article[]
}) {
  const relatedTags = TAG_LIST.filter((t) => t.slug !== slug).slice(0, 8)

  return (
    <>
      <PageHeader
        eyebrow={`Temat · #${label}`}
        meta={`${articles.length} ARTYKUŁÓW`}
        title={
          <>
            Wszystko o{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              {label.toLowerCase()}
            </span>
            .
          </>
        }
        description={description}
      />

      {/* Breadcrumb */}
      <section style={{ padding: '0 0 1.5rem' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div
            className="lr-mono"
            style={{
              fontSize: '0.625rem',
              color: 'var(--lr-ink-dim)',
              letterSpacing: '0.22em',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/blog" style={{ color: 'var(--lr-ink-dim)', textDecoration: 'none' }}>
              ← BLOG
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--lr-rose)' }}>#{label.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* Articles grid or empty state */}
      <section style={{ padding: '0 0 clamp(5rem, 9vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          {articles.length === 0 ? (
            <div
              style={{
                padding: 'clamp(3rem, 6vw, 5rem) 2rem',
                border: '1px solid var(--lr-rule)',
                background: 'var(--lr-surface)',
                textAlign: 'center',
              }}
            >
              <p
                className="lr-mono"
                style={{
                  color: 'var(--lr-ink-dim)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.18em',
                  marginBottom: '1.5rem',
                }}
              >
                · jeszcze brak artykułów w tym temacie ·
              </p>
              <Link href="/blog" className="lr-cta-ghost">
                Wróć do bloga
                <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: 'var(--lr-rule)' }}
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {articles.map((article) => (
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
                    {article.readTime && <span>{article.readTime}min</span>}
                  </div>

                  <Link
                    href={`/blog/${article.slug.current}`}
                    style={{ textDecoration: 'none', display: 'block', flexGrow: 1 }}
                    className="group"
                  >
                    <h3
                      className="transition-colors duration-300 group-hover:text-[#E8AEBD]"
                      style={{
                        marginBottom: '0.875rem',
                        fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)',
                        lineHeight: 1.2,
                      }}
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

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {article.tags
                        .filter((t) => t !== slug)
                        .slice(0, 3)
                        .map((t) => (
                          <Link
                            key={t}
                            href={`/temat/${t}`}
                            className="lr-mono"
                            style={{
                              fontSize: '0.5625rem',
                              color: 'var(--lr-ink-dim)',
                              letterSpacing: '0.12em',
                              padding: '0.25rem 0.5rem',
                              border: '1px solid var(--lr-rule)',
                              borderRadius: '999px',
                              textDecoration: 'none',
                            }}
                          >
                            #{TAG_LABEL_BY_SLUG[t] || t}
                          </Link>
                        ))}
                    </div>
                  )}

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
        </div>
      </section>

      {/* Inne tematy */}
      <section
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) 0',
          borderTop: '1px solid var(--lr-rule)',
          background: 'var(--lr-surface)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div
            className="lr-mono"
            style={{
              fontSize: '0.625rem',
              color: 'var(--lr-ink-dim)',
              letterSpacing: '0.22em',
              marginBottom: '1.25rem',
            }}
          >
            // ZOBACZ INNE TEMATY
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map((t) => (
              <Link
                key={t.slug}
                href={`/temat/${t.slug}`}
                className="lr-mono"
                style={{
                  padding: '0.5rem 0.875rem',
                  border: '1px solid var(--lr-rule-strong)',
                  color: 'var(--lr-ink-soft)',
                  background: 'transparent',
                  fontSize: '0.625rem',
                  letterSpacing: '0.12em',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 200ms var(--ease-out-strong)',
                }}
              >
                #{t.label}
              </Link>
            ))}
            <Link
              href="/blog"
              className="lr-mono"
              style={{
                padding: '0.5rem 0.875rem',
                border: '1px solid var(--lr-accent)',
                color: 'var(--lr-accent)',
                background: 'transparent',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                borderRadius: '999px',
                textDecoration: 'none',
              }}
            >
              Wszystkie artykuły →
            </Link>
          </div>
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
