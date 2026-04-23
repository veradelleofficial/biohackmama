'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, BookOpen, GraduationCap, FileText, Heart, ArrowRight } from 'lucide-react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const categories = [
  {
    title: 'Artykuły',
    description: 'Naukowe protokoły i porady dotyczące zdrowia',
    href: '/blog',
    icon: FileText,
    color: '#A68A69',
    bg: 'rgba(166,138,105,0.08)',
  },
  {
    title: 'E-booki',
    description: 'Praktyczne przewodniki do pobrania',
    href: '/ebooki',
    icon: BookOpen,
    color: '#213a50',
    bg: 'rgba(33,58,80,0.06)',
  },
  {
    title: 'Kursy',
    description: 'Kompleksowe programy online z certyfikatem',
    href: '/kursy',
    icon: GraduationCap,
    color: '#A68A69',
    bg: 'rgba(166,138,105,0.08)',
  },
  {
    title: 'Moja historia',
    description: 'Poznaj Verę Delle i jej drogę do biohackingu',
    href: '/o-mnie',
    icon: Heart,
    color: '#213a50',
    bg: 'rgba(33,58,80,0.06)',
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
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container max-w-3xl">

        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal mb-3 tracking-heading uppercase"
          >
            Szukaj
          </h1>
          <p className="text-base font-light" style={{ color: 'rgba(72,89,107,0.75)' }}>
            Znajdź artykuły, kursy, ebooki i więcej
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
          className="mb-14 md:mb-16"
        >
          <motion.div
            animate={
              focused
                ? { boxShadow: '0 0 0 3px rgba(166,138,105,0.18), 0 0 0 1px rgba(166,138,105,0.45)' }
                : { boxShadow: 'var(--shadow-rest)' }
            }
            transition={{ duration: 0.22 }}
            className="relative rounded-2xl"
          >
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
              size={20}
              style={{ color: focused ? '#A68A69' : 'rgba(33,58,80,0.35)' }}
            />
            <input
              type="text"
              placeholder="Czego szukasz?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full pl-14 pr-5 py-4 md:py-5 bg-card border border-border/60 rounded-2xl focus:outline-none transition-colors duration-300 text-base md:text-lg"
              style={{ color: '#213a50' }}
              autoFocus
            />
          </motion.div>
        </motion.form>

        {/* Category tiles */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.a
                key={cat.href}
                href={cat.href}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: EASE_OUT },
                  },
                }}
                whileHover={{ y: -3, boxShadow: 'var(--shadow-lift)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group flex items-start gap-4 p-5 md:p-6 rounded-3xl border border-border/50 bg-card cursor-pointer"
                style={{ boxShadow: 'var(--shadow-rest)' }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center mt-0.5"
                  style={{ background: cat.bg }}
                >
                  <Icon size={20} strokeWidth={1.6} style={{ color: cat.color }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h2
                      className="font-body font-semibold text-base group-hover:text-coastal-gold transition-colors duration-200"
                      style={{ color: '#213a50' }}
                    >
                      {cat.title}
                    </h2>
                    <ArrowRight
                      size={14}
                      className="flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200"
                      style={{ color: '#A68A69' }}
                    />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(72,89,107,0.65)' }}>
                    {cat.description}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

      </div>
    </main>
  )
}
