'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { X, Check, ExternalLink, Instagram } from 'lucide-react'
import { INSTAGRAM_LABEL, type Swap } from '@/lib/zamienniki'

const EASE = [0.22, 1, 0.36, 1] as const

function Photo({ src, alt, kind }: { src: string; alt: string; kind: 'no' | 'yes' }) {
  return (
    <div className="lr-swap__photo">
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 45vw, 200px" className="object-cover" />
      <span className={`lr-swap__stamp lr-swap__stamp--${kind}`}>
        {kind === 'no' ? <X size={16} strokeWidth={3} /> : <Check size={16} strokeWidth={3} />}
      </span>
    </div>
  )
}

export default function SwapCard({ s, index = 0 }: { s: Swap; index?: number }) {
  const hasPhotos = !!(s.instead.img || s.choose.img)
  return (
    <motion.article
      className={`lr-swap group ${hasPhotos ? 'has-photos' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.1 }}
      layout
    >
      <h3 className="lr-swap__title">{s.title}</h3>

      <div className="lr-swap__pair">
        {/* ZAMIAST */}
        <div className="lr-swap__side lr-swap__side--instead">
          {s.instead.img && <Photo src={s.instead.img} alt={s.instead.name} kind="no" />}
          <span className="lr-swap__tag">
            {!s.instead.img && <span className="lr-swap__dot lr-swap__dot--no"><X size={10} strokeWidth={3.5} /></span>}
            Zamiast
          </span>
          <p className="lr-swap__name">{s.instead.name}</p>
          <p className="lr-swap__why">{s.instead.why}</p>
        </div>

        <span className="lr-swap__vs" aria-hidden>vs</span>

        {/* WYBIERZ */}
        <div className="lr-swap__side lr-swap__side--choose">
          {s.choose.img && <Photo src={s.choose.img} alt={s.choose.name} kind="yes" />}
          <span className="lr-swap__tag">
            {!s.choose.img && <span className="lr-swap__dot lr-swap__dot--yes"><Check size={10} strokeWidth={3.5} /></span>}
            Wybierz
          </span>
          <p className="lr-swap__name">
            {s.choose.name}
            {s.choose.brand && <span className="lr-swap__brand">{s.choose.brand}</span>}
          </p>
          <p className="lr-swap__why">{s.choose.why}</p>
          {s.choose.link && (
            <a href={s.choose.link} target="_blank" rel="noopener noreferrer sponsored" className="lr-swap__buy">
              Gdzie kupić <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {s.instagram && (
        <a href={s.instagram.url} target="_blank" rel="noopener noreferrer" className="lr-swap__ig">
          <Instagram size={16} strokeWidth={2} />
          {INSTAGRAM_LABEL[s.instagram.type]}
          <span aria-hidden>→</span>
        </a>
      )}
    </motion.article>
  )
}
