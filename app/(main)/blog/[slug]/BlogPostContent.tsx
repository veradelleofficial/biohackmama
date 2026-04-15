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
  content: any
  author?: string
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
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-heading font-semibold tracking-heading mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-heading font-semibold tracking-heading mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-heading font-semibold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-coastal-gold pl-6 my-6 italic text-lg"
        style={{ color: 'rgba(72, 89, 107, 0.8)' }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 space-y-2 pl-5 list-disc" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 space-y-2 pl-5 list-decimal" style={{ color: 'rgba(72, 89, 107, 0.9)' }}>
        {children}
      </ol>
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

export default function BlogPostContent({ article }: { article: Article | null }) {
  if (!article) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Artykuł nie znaleziony</h1>
          <Link href="/blog" className="text-primary hover:underline">
            Wróć do bloga
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-20">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Wróć do bloga
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded">{article.category}</span>
            <span>•</span>
            <span>{article.readTime} min czytania</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
            </time>
          </div>

          <h1 className="text-5xl font-heading font-bold mb-4">{article.title}</h1>

          <p className="text-xl text-muted-foreground">{article.excerpt}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-8xl mb-12"
        >
          📄
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-none text-base"
        >
          {article.content ? (
            <PortableText value={article.content} components={portableTextComponents} />
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-muted-foreground text-center">
              <p>Treść artykułu pojawi się tutaj po dodaniu w Sanity CMS.</p>
            </div>
          )}
        </motion.div>

        {article.author && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Autorka</p>
                <Link href="/o-mnie" className="font-semibold hover:text-primary transition-colors">
                  {article.author}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Biohackerka, twórczyni treści o zdrowiu i wellness
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground mb-4">Chcesz przeczytać więcej?</p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Zobacz wszystkie artykuły
          </Link>
        </motion.div>

        <div className="mt-10 pt-6 border-t border-border/40 text-center">
          <p className="text-xs font-light leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Treści prezentowane na tej stronie mają charakter edukacyjny i informacyjny. Nie jestem lekarzem – dzielę się własnym doświadczeniem. Przed zmianami w diecie lub suplementacji skonsultuj się ze specjalistą.
          </p>
        </div>
      </div>
    </main>
  )
}
