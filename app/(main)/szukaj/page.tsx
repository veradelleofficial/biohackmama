'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, BookOpen, GraduationCap, FileText, Heart } from 'lucide-react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const categories = [
  {
    title: 'Artykuły',
    description: 'Naukowe protokoły i porady dotyczące zdrowia.',
    href: '/blog',
    icon: FileText,
    accent: 'rose' as const,
  },
  {
    title: 'E-booki',
    description:
      'Wiedza spoza utartych ścieżek, sprawdzona na sobie. Każdy ebook z bibliografią naukową.',
    href: '/ebooki',
    icon: BookOpen,
    accent: 'lime' as const,
  },
  {
    title: 'Kursy',
    description: 'Realna praca nad sobą krok po kroku. Mierzalny efekt w ciele i w głowie.',
    href: '/kursy',
    icon: GraduationCap,
    accent: 'rose' as const,
  },
  {
    title: 'Poznaj Weronikę',
    description: 'Skąd to wszystko się wzięło i dlaczego to robię.',
    href: '/o-mnie',
    icon: Heart,
    accent: 'lime' as const,
  },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <main className="min-h-screen">
      <section
        className="relative overflow-hidden"
        style={{ padding: 'clamp(5rem, 9vw, 7rem) 0 clamp(3rem, 5vw, 4rem)' }}
      >
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '-20%',
            right: '-10%',
            width: '50%',
            height: '70%',
            background: 'radial-gradient(ellipse at center, rgba(232,174,189,0.12) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />

        <motion.div
          className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16 relative"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol
              className="lr-mono flex items-center gap-2 flex-wrap"
              style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
            >
              <li>
                <Link href="/" style={{ color: 'var(--lr-ink-soft)', textDecoration: 'none' }}>
                  HOME
                </Link>
              </li>
              <li>/</li>
              <li style={{ color: 'var(--lr-rose)' }}>SZUKAJ</li>
            </ol>
          </nav>

          <span className="lr-eyebrow">Szukaj</span>
          <h1
            className="mt-6"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              lineHeight: 1.05,
              maxWidth: '20ch',
            }}
          >
            Czego{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              dziś szukasz?
            </span>
          </h1>
          <p className="mt-6" style={{ maxWidth: '48ch', fontSize: '1rem' }}>
            Wpisz temat: hormony, sen, kortyzol, post przerywany, ziołolecznictwo, longevity.
            Albo wybierz kategorię poniżej.
          </p>

          {/* Search */}
          <form onSubmit={handleSubmit} className="mt-10">
            <div
              style={{
                position: 'relative',
                border: '1px solid',
                borderColor: focused ? 'var(--lr-accent)' : 'var(--lr-rule-strong)',
                background: 'var(--lr-bg)',
                transition: 'border-color 200ms var(--ease-out-strong)',
                boxShadow: focused ? '0 0 0 1px var(--lr-accent)' : 'none',
              }}
            >
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                size={18}
                strokeWidth={1.5}
                style={{ color: focused ? 'var(--lr-accent)' : 'var(--lr-ink-dim)' }}
              />
              <input
                type="text"
                placeholder="Wpisz hasło i naciśnij Enter..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  width: '100%',
                  padding: '1.1rem 1.25rem 1.1rem 3rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--lr-ink)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
                autoFocus
              />
            </div>
          </form>
        </motion.div>
      </section>

      {/* Category tiles */}
      <section style={{ padding: '0 0 clamp(5rem, 9vw, 8rem)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
          <span className="lr-eyebrow">Kategorie</span>
          <motion.div
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{ background: 'var(--lr-rule)' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              const accentColor = cat.accent === 'lime' ? 'var(--lr-accent)' : 'var(--lr-rose)'
              return (
                <motion.a
                  key={cat.href}
                  href={cat.href}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: EASE_OUT },
                    },
                  }}
                  className="group"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    background: 'var(--lr-bg)',
                    textDecoration: 'none',
                    transition: 'background-color 200ms var(--ease-out-strong)',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      border: '1px solid var(--lr-rule-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 240ms var(--ease-out-strong)',
                    }}
                    className="group-hover:border-[currentColor]"
                  >
                    <Icon size={16} strokeWidth={1.5} style={{ color: accentColor }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      className="flex items-center justify-between gap-2"
                      style={{ marginBottom: '0.35rem' }}
                    >
                      <h2
                        style={{
                          fontFamily: 'var(--font-fraunces), serif',
                          fontSize: '1.0625rem',
                          color: 'var(--lr-ink)',
                          fontWeight: 400,
                          lineHeight: 1.2,
                        }}
                      >
                        {cat.title}
                      </h2>
                      <span
                        style={{
                          color: accentColor,
                          fontSize: '0.875rem',
                          opacity: 0.4,
                          transition: 'all 200ms var(--ease-out-strong)',
                        }}
                        className="group-hover:opacity-100 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--lr-ink-soft)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {cat.description}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
