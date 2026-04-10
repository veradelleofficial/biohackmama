'use client'

import { useState, useEffect } from 'react'
import { getEbookBySlug } from '@/lib/sanity/queries'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, CheckCircle } from 'lucide-react'

interface Ebook {
  _id: string
  title: string
  slug: { current: string }
  description: string
  price: number | string
  pages: number
  author?: string
  content?: string
  downloadUrl?: string
  benefits?: string[]
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function EbookDetailPage({ params }: PageProps) {
  const [ebook, setEbook] = useState<Ebook | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEbook = async () => {
      try {
        const data = await getEbookBySlug(params.slug)
        setEbook(data)
      } catch (error) {
        console.error('Error fetching ebook:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEbook()
  }, [params.slug])

  if (loading) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <p className="text-muted-foreground">Ładowanie ebooka...</p>
        </div>
      </main>
    )
  }

  if (!ebook) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Ebook nie znaleziony</h1>
          <Link href="/ebooki" className="text-primary hover:underline">
            Wróć do ebooków
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/ebooki"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Wróć do ebooków
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center text-9xl shadow-2xl">
              📕
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              {ebook.pages} stron
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-heading font-bold mb-2">
              {ebook.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {ebook.description}
            </p>

            {/* Pricing & CTA */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Cena</p>
              <p className="text-5xl font-bold text-primary mb-4">{ebook.price} zł</p>

              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium mb-3">
                <Download size={20} />
                Kup i pobierz
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Natychmiastowy dostęp do pliku PDF
              </p>
            </div>

            {/* Benefits */}
            {ebook.benefits && ebook.benefits.length > 0 && (
              <div>
                <h3 className="font-heading font-bold mb-4">Co znajdziesz w tym ebooku?</h3>
                <div className="space-y-3">
                  {ebook.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author */}
            {ebook.author && (
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Autor:</strong> {ebook.author}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Description */}
        {ebook.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-12 border-t border-border prose prose-lg max-w-none"
          >
            <h2>O tym ebooku</h2>
            <div className="bg-card border border-border rounded-lg p-8 text-muted-foreground">
              <p>
                Pełna zawartość ebooka będzie wyświetlona tutaj po skonfigurowaniu Sanity CMS.
              </p>
            </div>
          </motion.div>
        )}

        {/* Related Ebooks CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-12 border-t border-border text-center"
        >
          <p className="text-muted-foreground mb-4">Zainteresowany innymi ebookami?</p>
          <Link
            href="/ebooki"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Zobacz wszystkie ebooki
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
