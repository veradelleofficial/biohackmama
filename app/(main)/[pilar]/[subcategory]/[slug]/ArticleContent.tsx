'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/client'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  readTime: number
  category: string
  categorySlug: string
  pilarTitle: string
  content: any
  author?: string
  coverImage?: any
}

const CALLOUT_STYLES: Record<string, { border: string; bg: string; icon: string; label: string }> = {
  protip:   { border: 'border-coastal-gold/50',   bg: 'bg-coastal-gold/8',    icon: '💡', label: 'Pro-tip' },
  warning:  { border: 'border-amber-400/50',       bg: 'bg-amber-50/60',       icon: '⚠️', label: 'Uwaga' },
  research: { border: 'border-coastal-ocean/40',   bg: 'bg-coastal-ocean/6',   icon: '🔬', label: 'Badanie' },
  info:     { border: 'border-emerald-400/50',     bg: 'bg-emerald-50/50',     icon: 'ℹ️', label: 'Info' },
  fact:     { border: 'border-indigo-300/50',      bg: 'bg-indigo-50/50',      icon: '✨', label: 'Ciekawostka' },
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={urlFor(value).width(900).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => {
      const style = CALLOUT_STYLES[value.variant] || CALLOUT_STYLES.info
      return (
        <div className={`my-7 rounded-2xl border ${style.border} ${style.bg} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{style.icon}</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-coastal-slate/70">
              {value.title || style.label}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(72,89,107,0.88)' }}>
            {value.body}
          </p>
        </div>
      )
    },
    pullQuote: ({ value }) => (
      <div className="my-10 py-8 px-6 border-y border-coastal-gold/30 text-center">
        <p className="text-xl md:text-2xl font-heading font-normal italic leading-snug text-coastal-slate mb-3">
          &ldquo;{value.text}&rdquo;
        </p>
        {value.attribution && (
          <p className="text-sm text-muted-foreground">&mdash; {value.attribution}</p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-heading font-semibold tracking-heading mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-heading font-semibold tracking-heading mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-heading font-semibold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-coastal-gold pl-6 my-6 italic text-lg" style={{ color: 'rgba(72, 89, 107, 0.8)' }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 space-y-2 pl-5 list-disc" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 space-y-2 pl-5 list-decimal" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-coastal-gold underline underline-offset-2 hover:text-coastal-gold/80 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}

interface Props {
  article: Article
  pilar: string
  subcategory: string
}

export default function ArticleContent({ article, pilar, subcategory }: Props) {
  return (
    <main className="pt-32 pb-20">
      <div className="container max-w-3xl">

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link
            href={`/${pilar}/${subcategory}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Wróć do {article.category}
          </Link>
        </motion.div>

        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-muted-foreground">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-coastal-gold transition-colors">Strona główna</Link></li>
            <li>/</li>
            <li><Link href={`/${pilar}`} className="hover:text-coastal-gold transition-colors">{article.pilarTitle}</Link></li>
            <li>/</li>
            <li><Link href={`/${pilar}/${subcategory}`} className="hover:text-coastal-gold transition-colors">{article.category}</Link></li>
            <li>/</li>
            <li className="text-coastal-slate">{article.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground flex-wrap">
            <Link
              href={`/${pilar}/${subcategory}`}
              className="px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
            >
              {article.category}
            </Link>
            <span>•</span>
            <span>{article.readTime} min czytania</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-heading normal-case">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">{article.excerpt}</p>
        </motion.div>

        {/* Cover */}
        {article.coverImage?.asset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12"
          >
            <Image
              src={urlFor(article.coverImage).width(1200).url()}
              alt={article.coverImage.alt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-none text-base">
          {article.content ? (
            <PortableText value={article.content} components={portableTextComponents} />
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-muted-foreground text-center">
              <p>Treść artykułu pojawi się tutaj po dodaniu w Sanity CMS.</p>
            </div>
          )}
        </motion.div>

        {/* Author */}
        {article.author && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Autorka</p>
                <Link href="/o-mnie" className="font-semibold hover:text-primary transition-colors">
                  {article.author}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">Biohackerka, twórczyni treści o zdrowiu i wellness</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">Więcej na ten temat:</p>
          <Link
            href={`/${pilar}/${subcategory}`}
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Wszystkie artykuły: {article.category}
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-border/40 text-center">
          <p className="text-xs font-light leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Treści prezentowane na tej stronie mają charakter edukacyjny i informacyjny. Nie jestem lekarzem. Przed zmianami w diecie lub suplementacji skonsultuj się ze specjalistą.
          </p>
        </div>
      </div>
    </main>
  )
}
