'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Topic {
  slug: string
  label: string
}

interface Region {
  id: string
  label: string
  eyebrow: string
  desc: string
  x: number
  y: number
  r: number
  color: string
  glow: string
  topics: Topic[]
}

const REGIONS: Region[] = [
  {
    id: 'brain',
    eyebrow: '// 01',
    label: 'Mózg & Umysł',
    desc: 'Sen, koncentracja, regulacja nastroju, neuroprzekaźniki i jak żyć w zgodzie z rytmem dobowym.',
    x: 73,
    y: 8,
    r: 42,
    color: '#E8AEBD',
    glow: 'rgba(232, 174, 189, 0.35)',
    topics: [
      { slug: 'sen', label: 'Sen' },
      { slug: 'nootropiki', label: 'Nootropiki' },
      { slug: 'mental-wellness', label: 'Mental Wellness' },
      { slug: 'rytm-dobowy', label: 'Rytm Dobowy' },
    ],
  },
  {
    id: 'thyroid',
    eyebrow: '// 02',
    label: 'Tarczyca & Hormony',
    desc: 'Twój wewnętrzny dyrygent: tarczyca, kortyzol, estrogen, progesteron. Co czytać, jak wspierać.',
    x: 73,
    y: 13,
    r: 28,
    color: '#C9F24F',
    glow: 'rgba(201, 242, 79, 0.35)',
    topics: [
      { slug: 'hormony', label: 'Hormony' },
      { slug: 'stres-i-kortyzol', label: 'Stres i Kortyzol' },
      { slug: 'biochemia', label: 'Biochemia' },
    ],
  },
  {
    id: 'heart',
    eyebrow: '// 03',
    label: 'Serce & Witalność',
    desc: 'Długowieczność, energia, biohacking codzienny. Strategia długiego życia w dobrej formie.',
    x: 73,
    y: 19,
    r: 44,
    color: '#E8AEBD',
    glow: 'rgba(232, 174, 189, 0.30)',
    topics: [
      { slug: 'longevity', label: 'Longevity' },
      { slug: 'biohacking', label: 'Biohacking' },
    ],
  },
  {
    id: 'gut',
    eyebrow: '// 04',
    label: 'Jelita & Odżywianie',
    desc: 'Drugi mózg. Co jeść, kiedy jeść, czego unikać. Post przerywany, suplementacja, detoks.',
    x: 73,
    y: 27,
    r: 46,
    color: '#C9F24F',
    glow: 'rgba(201, 242, 79, 0.30)',
    topics: [
      { slug: 'odzywianie', label: 'Odżywianie' },
      { slug: 'post-przerywany', label: 'Post Przerywany' },
      { slug: 'suplementacja', label: 'Suplementacja' },
      { slug: 'detoks-i-dom', label: 'Detoks i Dom' },
    ],
  },
  {
    id: 'womb',
    eyebrow: '// 05',
    label: 'Macica & Cykl',
    desc: 'Cykl jako kompas. Co jeść, jak trenować i jak żyć w zgodzie z każdą fazą.',
    x: 73,
    y: 36,
    r: 42,
    color: '#E8AEBD',
    glow: 'rgba(232, 174, 189, 0.35)',
    topics: [{ slug: 'cykl-i-kobiecosc', label: 'Cykl i Kobiecość' }],
  },
]

const HOLISTIC_TOPICS: Topic[] = [
  { slug: 'ziololecznictwo', label: 'Ziołolecznictwo' },
  { slug: 'naturopatia', label: 'Naturopatia' },
  { slug: 'medycyna-chinska', label: 'Medycyna Chińska' },
]

export default function BodyDiagram() {
  const [activeId, setActiveId] = useState<string>('brain')
  const active = REGIONS.find((r) => r.id === activeId) || REGIONS[0]

  return (
    <section
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        borderTop: '1px solid var(--lr-rule)',
        borderBottom: '1px solid var(--lr-rule)',
        background: 'var(--lr-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(232,174,189,0.06) 0%, transparent 60%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative">
        <div className="mb-10 md:mb-14">
          <span className="lr-eyebrow">// PRZEWODNIK PO CIELE</span>
          <h2 className="mt-6" style={{ maxWidth: '22ch' }}>
            Kliknij, żeby zobaczyć{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              co Cię ciekawi.
            </span>
          </h2>
          <p
            className="mt-5"
            style={{ maxWidth: '52ch', fontSize: '1rem', color: 'var(--lr-ink-soft)' }}
          >
            Każdy obszar ciała to inny zestaw protokołów, badań i hacków. Wybierz strefę, którą
            chcesz dziś zoptymalizować.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: 3D feminine figure + hotspot overlays */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              style={{
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '2 / 3',
                position: 'relative',
              }}
            >
              {/* 3D rendered figure */}
              <Image
                src="/images/dna-woman-hero.png"
                alt="Sylwetka kobiety — interaktywny przewodnik po tematach"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                style={{
                  objectFit: 'contain',
                }}
              />

              {/* Hotspots — clickable overlays positioned on body regions */}
              {REGIONS.map((region) => {
                const isActive = region.id === activeId
                return (
                  <button
                    key={region.id}
                    onClick={() => setActiveId(region.id)}
                    aria-label={region.label}
                    style={{
                      position: 'absolute',
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: `${region.r * 2}px`,
                      height: `${region.r * 2}px`,
                      borderRadius: '50%',
                      border: `${isActive ? 2 : 1.2}px solid ${region.color}`,
                      background: isActive
                        ? `radial-gradient(circle, ${region.glow} 0%, transparent 70%)`
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 200ms var(--ease-out-strong)',
                      opacity: isActive ? 1 : 0.55,
                      padding: 0,
                      outline: 'none',
                      boxShadow: isActive ? `0 0 24px ${region.glow}` : 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = isActive ? '1' : '0.55'
                      e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
                    }}
                  >
                    {/* Pulsing center dot */}
                    <motion.span
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: region.color,
                        boxShadow: `0 0 10px ${region.color}`,
                        display: 'block',
                      }}
                      animate={
                        isActive
                          ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }
                          : { scale: 1, opacity: 0.85 }
                      }
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        ease: 'easeInOut',
                      }}
                    />
                    {/* Label number */}
                    <span
                      className="lr-mono"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translate(-50%, 6px)',
                        fontSize: '0.5625rem',
                        letterSpacing: '0.18em',
                        color: isActive ? region.color : 'rgba(184,176,163,0.55)',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        pointerEvents: 'none',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {region.eyebrow.replace('// ', '')} · {region.label.split(' ')[0]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RIGHT: Active region panel */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  border: `1px solid ${active.color}`,
                  background: 'var(--lr-bg)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent corner glow */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '60%',
                    background: `radial-gradient(ellipse at top right, ${active.glow} 0%, transparent 65%)`,
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative' }}>
                  <span
                    className="lr-mono"
                    style={{
                      fontSize: '0.625rem',
                      color: active.color,
                      letterSpacing: '0.22em',
                    }}
                  >
                    {active.eyebrow} · STREFA
                  </span>
                  <h3
                    style={{
                      marginTop: '0.75rem',
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      lineHeight: 1.15,
                    }}
                  >
                    {active.label}
                  </h3>
                  <p
                    style={{
                      marginTop: '1rem',
                      fontSize: '0.9375rem',
                      color: 'var(--lr-ink-soft)',
                      maxWidth: '46ch',
                    }}
                  >
                    {active.desc}
                  </p>

                  <div
                    className="lr-mono"
                    style={{
                      marginTop: '1.75rem',
                      fontSize: '0.5625rem',
                      color: 'var(--lr-ink-dim)',
                      letterSpacing: '0.22em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    TEMATY · {active.topics.length}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.topics.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/temat/${t.slug}`}
                        className="lr-mono"
                        style={{
                          padding: '0.6rem 1rem',
                          border: `1px solid ${active.color}`,
                          color: active.color,
                          background: 'transparent',
                          fontSize: '0.6875rem',
                          letterSpacing: '0.12em',
                          borderRadius: '999px',
                          textDecoration: 'none',
                          transition: 'all 200ms var(--ease-out-strong)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = active.color
                          e.currentTarget.style.color = '#0C0C0C'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = active.color
                        }}
                      >
                        #{t.label} →
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Holistic / overlay topics */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                border: '1px solid var(--lr-rule-strong)',
                background: 'transparent',
              }}
            >
              <div
                className="lr-mono"
                style={{
                  fontSize: '0.5625rem',
                  color: 'var(--lr-ink-dim)',
                  letterSpacing: '0.22em',
                  marginBottom: '0.875rem',
                }}
              >
                // PODEJŚCIE HOLISTYCZNE · CAŁY ORGANIZM
              </div>
              <div className="flex flex-wrap gap-2">
                {HOLISTIC_TOPICS.map((t) => (
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--lr-rose)'
                      e.currentTarget.style.color = 'var(--lr-rose)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--lr-rule-strong)'
                      e.currentTarget.style.color = 'var(--lr-ink-soft)'
                    }}
                  >
                    #{t.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
