'use client'

import { useState } from 'react'
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
    x: 200,
    y: 78,
    r: 40,
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
    x: 200,
    y: 170,
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
    x: 200,
    y: 260,
    r: 36,
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
    x: 200,
    y: 385,
    r: 42,
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
    x: 200,
    y: 485,
    r: 34,
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
          {/* LEFT: Body silhouette SVG */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              style={{
                width: '100%',
                maxWidth: '420px',
                aspectRatio: '1 / 1.55',
                position: 'relative',
              }}
            >
              <svg
                viewBox="0 0 400 620"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%', display: 'block' }}
              >
                <defs>
                  <radialGradient id="body-glow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="rgba(232,174,189,0.10)" />
                    <stop offset="60%" stopColor="rgba(232,174,189,0.02)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient id="body-spine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(244,239,230,0.0)" />
                    <stop offset="20%" stopColor="rgba(244,239,230,0.35)" />
                    <stop offset="80%" stopColor="rgba(244,239,230,0.35)" />
                    <stop offset="100%" stopColor="rgba(244,239,230,0.0)" />
                  </linearGradient>
                </defs>

                {/* Background ambient */}
                <ellipse cx="200" cy="300" rx="180" ry="280" fill="url(#body-glow)" />

                {/* Silhouette outline — stylised feminine figure */}
                <g
                  fill="none"
                  stroke="rgba(244,239,230,0.55)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Head */}
                  <ellipse cx="200" cy="78" rx="36" ry="44" />
                  {/* Neck */}
                  <path d="M 182 118 Q 182 138 178 152 M 218 118 Q 218 138 222 152" />
                  {/* Shoulders */}
                  <path d="M 178 152 Q 130 162 110 200 M 222 152 Q 270 162 290 200" />
                  {/* Arms */}
                  <path d="M 110 200 Q 92 270 100 360 Q 102 380 112 380 Q 122 380 122 360 Q 130 270 130 220" />
                  <path d="M 290 200 Q 308 270 300 360 Q 298 380 288 380 Q 278 380 278 360 Q 270 270 270 220" />
                  {/* Torso outline */}
                  <path d="M 178 152 Q 140 210 152 280 Q 162 310 168 340 L 168 380" />
                  <path d="M 222 152 Q 260 210 248 280 Q 238 310 232 340 L 232 380" />
                  {/* Waist + hips */}
                  <path d="M 168 380 Q 140 410 142 470 Q 145 495 175 510" />
                  <path d="M 232 380 Q 260 410 258 470 Q 255 495 225 510" />
                  {/* Spine guide (subtle) */}
                  <line x1="200" y1="150" x2="200" y2="510" stroke="url(#body-spine)" strokeWidth="0.8" strokeDasharray="2 4" />
                  {/* Legs */}
                  <path d="M 175 510 Q 165 560 178 610" />
                  <path d="M 225 510 Q 235 560 222 610" />
                  <path d="M 200 510 L 200 605" strokeDasharray="2 4" opacity="0.5" />
                </g>

                {/* Hotspots — glowing region nodes */}
                {REGIONS.map((region) => {
                  const isActive = region.id === activeId
                  return (
                    <g
                      key={region.id}
                      onClick={() => setActiveId(region.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Outer pulsing ring */}
                      <motion.circle
                        cx={region.x}
                        cy={region.y}
                        r={region.r}
                        fill="none"
                        stroke={region.color}
                        strokeWidth={isActive ? 1.5 : 1}
                        opacity={isActive ? 0.7 : 0.25}
                        initial={false}
                        animate={
                          isActive
                            ? { scale: [1, 1.08, 1], opacity: [0.7, 0.3, 0.7] }
                            : { scale: 1, opacity: 0.25 }
                        }
                        transition={{
                          duration: 2.4,
                          repeat: isActive ? Infinity : 0,
                          ease: 'easeInOut',
                        }}
                        style={{ transformOrigin: `${region.x}px ${region.y}px` }}
                      />
                      {/* Inner soft fill */}
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={region.r * 0.55}
                        fill={region.color}
                        opacity={isActive ? 0.25 : 0.08}
                      />
                      {/* Center dot */}
                      <circle cx={region.x} cy={region.y} r={5} fill={region.color} />
                      {/* Number label */}
                      <text
                        x={region.x}
                        y={region.y + 2}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#0C0C0C"
                        fontFamily="monospace"
                        fontWeight="700"
                      >
                        {region.eyebrow.replace('// ', '')}
                      </text>
                    </g>
                  )
                })}

                {/* Region labels — small text next to each hotspot */}
                {REGIONS.map((region) => {
                  const isActive = region.id === activeId
                  // Place labels to the right of hotspots, alternating sides
                  const isLeft = region.id === 'thyroid' || region.id === 'womb'
                  const labelX = isLeft ? region.x - region.r - 16 : region.x + region.r + 16
                  const anchor = isLeft ? 'end' : 'start'
                  return (
                    <text
                      key={`label-${region.id}`}
                      x={labelX}
                      y={region.y + 4}
                      textAnchor={anchor}
                      fontSize="11"
                      fill={isActive ? region.color : 'rgba(184,176,163,0.65)'}
                      fontFamily="monospace"
                      letterSpacing="0.12em"
                      style={{ textTransform: 'uppercase', transition: 'fill 200ms ease' }}
                    >
                      {region.label}
                    </text>
                  )
                })}
              </svg>
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
