'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    let videoId: string | null = null
    if (u.hostname === 'youtu.be') {
      videoId = u.pathname.slice(1)
    } else if (u.hostname.includes('youtube.com')) {
      videoId = u.searchParams.get('v')
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  } catch {
    return null
  }
}

interface Pigulka {
  title: string
  slug: { current: string }
  sciezka: string
  description: string
  duration: number
  audioUrl?: string
  videoUrl?: string
  pdfUrl?: string
}

export default function PigulkaPlayer({ pigulka }: { pigulka: Pigulka }) {
  const embedUrl = pigulka.videoUrl ? getYouTubeEmbedUrl(pigulka.videoUrl) : null

  return (
    <main className="pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="container max-w-3xl">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 mb-7 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/premium" className="text-coastal-gold hover:text-coastal-gold/70 transition-colors font-medium">
            Premium
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/premium/pigulki" className="text-coastal-gold hover:text-coastal-gold/70 transition-colors font-medium">
            Biblioteka
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground line-clamp-1">{pigulka.title}</span>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(166,138,105,0.12)', color: 'rgba(166,138,105,0.90)' }}>
            {pigulka.sciezka}
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-normal tracking-heading mb-3" style={{ color: '#213a50' }}>
            {pigulka.title}
          </h1>
          <div className="flex items-center gap-3 text-sm font-light" style={{ color: 'rgba(33,58,80,0.55)' }}>
            {pigulka.duration && <span>⏱ {pigulka.duration} min</span>}
            {pigulka.audioUrl && <span>🎧 Audio</span>}
            {pigulka.videoUrl && <span>📹 Wideo</span>}
            {pigulka.pdfUrl && <span>📄 PDF</span>}
          </div>
        </motion.div>

        {/* Video embed */}
        {embedUrl && (
          <motion.div
            className="mb-7 rounded-2xl overflow-hidden border border-border/40"
            style={{ boxShadow: 'var(--shadow-float)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={pigulka.title}
              />
            </div>
          </motion.div>
        )}

        {/* Audio player */}
        {pigulka.audioUrl && (
          <motion.div
            className="mb-7 rounded-2xl border border-border/40 p-4 md:p-5"
            style={{ background: 'rgba(239,234,228,0.85)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: embedUrl ? 0.2 : 0.1, ease: EASE_OUT }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(166,138,105,0.80)' }}>
              Nagranie audio
            </p>
            <audio
              controls
              src={pigulka.audioUrl}
              className="w-full"
              style={{ borderRadius: 8 }}
            />
          </motion.div>
        )}

        {/* PDF download */}
        {pigulka.pdfUrl && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT }}
          >
            <a
              href={pigulka.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white text-sm font-semibold transition-all duration-200 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #A68A69, #8a7058)', boxShadow: '0 4px 16px rgba(166,138,105,0.28)' }}
            >
              <span>📄</span>
              Pobierz cheat sheet PDF
            </a>
          </motion.div>
        )}

        {/* Description */}
        {pigulka.description && (
          <motion.div
            className="rounded-2xl border border-border/40 p-5 md:p-6"
            style={{ background: 'rgba(239,234,228,0.70)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(33,58,80,0.40)' }}>
              O tej pigułce
            </p>
            <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'rgba(72,89,107,0.80)' }}>
              {pigulka.description}
            </p>
          </motion.div>
        )}

        {/* Back to library */}
        <div className="mt-10 pt-6 border-t border-border/40">
          <Link
            href="/premium/pigulki"
            className="text-sm text-coastal-gold hover:text-coastal-gold/70 transition-colors font-medium inline-flex items-center gap-1.5"
          >
            ← Wróć do biblioteki
          </Link>
        </div>
      </div>
    </main>
  )
}
