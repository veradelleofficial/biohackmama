'use client'

import { useState, useEffect } from 'react'
import { getArticleBySlug } from '@/lib/sanity/queries'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

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

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleBySlug(params.slug)
        setArticle(data)
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [params.slug])

  if (loading) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <p className="text-muted-foreground">Ładowanie artykułu...</p>
        </div>
      </main>
    )
  }

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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Wróć do bloga
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.readTime} min czytania</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('pl-PL')}</span>
          </div>

          <h1 className="text-5xl font-heading font-bold mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-muted-foreground">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-8xl mb-12"
        >
          📄
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none"
        >
          {/* Placeholder for rich text content from Sanity */}
          <div className="bg-card border border-border rounded-lg p-8 text-muted-foreground">
            <p>
              Zawartość artykułu będzie tutaj wyświetlona po skonfigurowaniu Sanity CMS.
              W Sanity możesz dodawać:
            </p>
            <ul className="mt-4 space-y-2">
              <li>• Tekst sformatowany (Bold, Italic, Headings)</li>
              <li>• Obrazy i galerie</li>
              <li>• Listy i tabele</li>
              <li>• Cytaty i kody</li>
              <li>• Osadzane media</li>
            </ul>
          </div>

          {article.content && (
            <div className="mt-8">
              {/* TODO: Render PortableText from Sanity */}
              {JSON.stringify(article.content, null, 2)}
            </div>
          )}
        </motion.div>

        {/* Author Info */}
        {article.author && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-muted-foreground">
              <strong>Autor:</strong> {article.author}
            </p>
          </motion.div>
        )}

        {/* Related Articles CTA */}
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
      </div>
    </main>
  )
}
