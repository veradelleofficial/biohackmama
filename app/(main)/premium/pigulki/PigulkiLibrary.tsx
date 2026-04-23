'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const SCIEZKI_ORDER = [
  'Wszystkie',
  'SOS: Przebodźcowanie',
  'Energia Mimo Braku Snu',
  'Paliwo: Odżywianie',
  'Sen i Regeneracja',
  'Hormony',
]

interface Pigulka {
  _id: string
  title: string
  slug: { current: string }
  sciezka: string
  description: string
  duration: number
  audioUrl?: string
  videoUrl?: string
  pdfUrl?: string
}

export default function PigulkiLibrary({ pigulki }: { pigulki: Pigulka[] }) {
  const [activeSciezka, setActiveSciezka] = useState('Wszystkie')

  const filtered = activeSciezka === 'Wszystkie'
    ? pigulki
    : pigulki.filter((p) => p.sciezka === activeSciezka)

  const availableSciezki = ['Wszystkie', ...Array.from(new Set(pigulki.map((p) => p.sciezka))).sort(
    (a, b) => SCIEZKI_ORDER.indexOf(a) - SCIEZKI_ORDER.indexOf(b)
  )]

  return (
    <main className="pt-10 md:pt-14 pb-16 md:pb-24">
      <div className="container max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Link href="/premium" className="text-xs font-medium text-coastal-gold hover:text-coastal-gold/70 transition-colors">
              Premium
            </Link>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs text-muted-foreground">Biblioteka</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-3" style={{ color: '#213a50' }}>
            Pigułki Wiedzy
          </h1>
          <p className="text-base font-light" style={{ color: 'rgba(72,89,107,0.75)' }}>
            {pigulki.length} {pigulki.length === 1 ? 'pigułka' : pigulki.length < 5 ? 'pigułki' : 'pigułek'} — audio, wideo i PDF cheat sheet
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {availableSciezki.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSciezka(s)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeSciezka === s
                  ? 'bg-coastal-gold text-white shadow-coastal-sm'
                  : 'border border-border/50 text-coastal-slate hover:border-coastal-ocean/40 hover:bg-secondary/10'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-light" style={{ color: 'rgba(72,89,107,0.65)' }}>
              Treści w tej ścieżce pojawią się wkrótce.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((pigulka, i) => (
              <motion.div
                key={pigulka._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE_OUT }}
              >
                <Link href={`/premium/pigulki/${pigulka.slug.current}`}>
                  <div className="group bg-card rounded-3xl border border-border/60 p-5 hover:border-coastal-gold/40 hover:shadow-card-hover transition-all duration-300 cursor-pointer h-full flex flex-col">
                    {/* Path badge */}
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 self-start"
                      style={{ background: 'rgba(166,138,105,0.12)', color: 'rgba(166,138,105,0.90)' }}>
                      {pigulka.sciezka}
                    </span>

                    <h3 className="font-heading font-semibold text-lg tracking-heading mb-2 group-hover:text-coastal-gold transition-colors duration-200 flex-1" style={{ color: '#213a50' }}>
                      {pigulka.title}
                    </h3>

                    {pigulka.description && (
                      <p className="text-xs font-light leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(72,89,107,0.70)' }}>
                        {pigulka.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                      <div className="flex items-center gap-2">
                        {pigulka.audioUrl && <span title="Audio" className="text-xs">🎧</span>}
                        {pigulka.videoUrl && <span title="Wideo" className="text-xs">📹</span>}
                        {pigulka.pdfUrl && <span title="PDF" className="text-xs">📄</span>}
                      </div>
                      {pigulka.duration && (
                        <span className="text-xs font-light" style={{ color: 'rgba(33,58,80,0.45)' }}>
                          {pigulka.duration} min
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
