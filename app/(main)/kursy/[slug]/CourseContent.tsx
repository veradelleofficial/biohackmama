'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Clock, BookOpen, Star, Shield, Users } from 'lucide-react'
import { SmoothAccordion, type AccordionItem } from '@/components/ui/SmoothAccordion'
import { VideoMorphModal } from '@/components/ui/VideoMorphModal'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { fadeUp, VIEWPORT_ONCE } from '@/lib/animations'

interface Lesson {
  title: string
  duration?: string
  free?: boolean
}

interface CurriculumModule {
  title: string
  lessons: Lesson[]
}

interface Course {
  _id: string
  title: string
  slug: { current: string }
  description: string
  price: number | string
  level: string
  duration: string
  lessons: number
  rating: number
  reviews: number
  content?: string
  curriculum?: CurriculumModule[]
  author?: string
  trailerUrl?: string
  trailerThumbnail?: string
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const DEMO_CURRICULUM: CurriculumModule[] = [
  {
    title: 'Moduł 1 — Wprowadzenie do biohackingu',
    lessons: [
      { title: 'Czym jest biohacking i dlaczego działa inaczej dla kobiet', duration: '18 min', free: true },
      { title: 'Twój infradian rhythm — wewnętrzny zegar kobiety', duration: '24 min' },
      { title: 'Pierwsze kroki: tracking i pomiary bazowe', duration: '15 min' },
    ],
  },
  {
    title: 'Moduł 2 — Hormony i cykl dobowy',
    lessons: [
      { title: 'Kortyzol, insulina i adenozyna — jak je kontrolować', duration: '31 min' },
      { title: 'Protokół porannej rutyny', duration: '20 min' },
      { title: 'Wieczorna deaktywacja układu nerwowego', duration: '22 min' },
      { title: 'Suplementacja na wybranych etapach cyklu', duration: '28 min' },
    ],
  },
  {
    title: 'Moduł 3 — Żywienie i metabolizm',
    lessons: [
      { title: 'Glukoza i insulina — zrozum swoje skoki cukru', duration: '26 min' },
      { title: 'Post przerywany a faza cyklu', duration: '19 min' },
      { title: 'Protokoły żywieniowe dla maksymalnej energii', duration: '33 min' },
    ],
  },
]

export default function CourseContent({ course }: { course: Course | null }) {
  if (!course) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <h1 className="text-2xl font-heading font-semibold mb-4">Kurs nie znaleziony</h1>
          <Link href="/kursy" className="text-coastal-gold hover:underline">
            Wróć do kursów
          </Link>
        </div>
      </main>
    )
  }

  const curriculum = course.curriculum ?? DEMO_CURRICULUM
  const totalLessons = curriculum.reduce((sum, m) => sum + m.lessons.length, 0)

  // Build SmoothAccordion items from curriculum
  const accordionItems: AccordionItem[] = curriculum.map((module) => ({
    header: module.title,
    meta: `${module.lessons.length} ${module.lessons.length === 1 ? 'lekcja' : 'lekcji'}`,
    content: (
      <ul className="space-y-2">
        {module.lessons.map((lesson, li) => (
          <li key={li} className="flex items-center justify-between gap-4 py-1.5">
            <div className="flex items-center gap-2.5">
              {lesson.free ? (
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(166,138,105,0.12)', color: '#A68A69' }}
                >
                  Bezpłatne
                </span>
              ) : (
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(33,58,80,0.25)' }}
                />
              )}
              <span className="text-sm" style={{ color: 'rgba(33,58,80,0.80)' }}>
                {lesson.title}
              </span>
            </div>
            {lesson.duration && (
              <span className="text-xs flex-shrink-0" style={{ color: 'rgba(33,58,80,0.40)' }}>
                {lesson.duration}
              </span>
            )}
          </li>
        ))}
      </ul>
    ),
  }))

  const highlights = [
    'Dostęp dożywotni do wszystkich materiałów i aktualizacji',
    'Nagrania wideo + materiały PDF do pobrania',
    'Certyfikat ukończenia kursu',
    'Wsparcie w prywatnej grupie uczestniczek',
  ]

  return (
    <main className="pb-20">

      {/* ── Hero band ───────────────────────────────────────────────── */}
      <div
        className="pt-24 md:pt-32 pb-14"
        style={{
          background:
            'linear-gradient(to bottom, rgba(174,202,232,0.12) 0%, rgba(166,138,105,0.05) 100%)',
        }}
      >
        <div className="container max-w-5xl">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-10"
          >
            <Link
              href="/kursy"
              className="inline-flex items-center gap-1.5 text-sm hover:text-coastal-gold transition-colors duration-200"
              style={{ color: 'rgba(72,89,107,0.6)' }}
            >
              <ArrowLeft size={15} />
              Kursy
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* Left col (3/5) — title, stats, trailer */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT }}
            >
              {/* Level badge */}
              <span
                className="inline-block text-xs px-3 py-1.5 rounded-full font-medium mb-5 bg-coastal-sky/25 text-coastal-ocean"
              >
                {course.level}
              </span>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-body font-bold leading-tight mb-5"
                style={{ color: '#213a50', letterSpacing: '-0.02em' }}
              >
                {course.title}
              </h1>

              {/* Description */}
              <p
                className="text-base md:text-lg leading-relaxed mb-8 font-light"
                style={{ color: 'rgba(72,89,107,0.80)' }}
              >
                {course.description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { icon: <Clock size={15} />, label: course.duration },
                  { icon: <BookOpen size={15} />, label: `${totalLessons} lekcji` },
                  {
                    icon: <Star size={15} fill="currentColor" />,
                    label: `${course.rating ?? 4.9} (${course.reviews ?? 0} opinii)`,
                  },
                  { icon: <Users size={15} />, label: 'Społeczność uczestniczek' },
                ].map(({ icon, label }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-2xl bg-white/60 border border-border/50"
                    style={{ color: 'rgba(33,58,80,0.70)' }}
                  >
                    <span style={{ color: '#A68A69' }}>{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              {/* Video trailer — morphs to full player */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: 'rgba(33,58,80,0.45)' }}
                >
                  Podgląd kursu
                </p>
                <VideoMorphModal
                  id={course.slug.current}
                  thumbnailSrc={course.trailerThumbnail ?? '/images/pexels-daria-liudnaya-8187452.webp'}
                  thumbnailAlt={`Trailer — ${course.title}`}
                  videoUrl={course.trailerUrl ?? 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'}
                  title={`${course.title} — trailer`}
                />
              </div>
            </motion.div>

            {/* Right col (2/5) — purchase card */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14, ease: EASE_OUT }}
            >
              <div
                className="rounded-3xl border border-coastal-gold/25 overflow-hidden sticky top-28"
                style={{ boxShadow: 'var(--shadow-float)' }}
              >
                <div
                  className="px-6 pt-6 pb-5"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(166,138,105,0.08) 0%, rgba(174,202,232,0.10) 100%)',
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: 'rgba(33,58,80,0.45)' }}
                  >
                    Cena kursu
                  </p>
                  <p className="text-5xl font-bold leading-none mb-1" style={{ color: '#213a50' }}>
                    {course.price}{' '}
                    <span className="text-2xl font-medium" style={{ color: 'rgba(33,58,80,0.50)' }}>
                      zł
                    </span>
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(33,58,80,0.45)' }}>
                    Jednorazowa płatność · Dożywotni dostęp
                  </p>
                </div>

                <div className="px-6 pb-6 pt-5 space-y-4 bg-card">
                  <ShimmerButton>
                    Zapisuję się na kurs
                  </ShimmerButton>

                  <div
                    className="flex items-center justify-center gap-1.5 text-xs"
                    style={{ color: 'rgba(33,58,80,0.45)' }}
                  >
                    <Shield size={11} />
                    Bezpieczna płatność · 14-dniowy zwrot
                  </div>

                  <div
                    className="pt-4 border-t space-y-2.5"
                    style={{ borderColor: 'rgba(33,58,80,0.08)' }}
                  >
                    {highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={15}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: '#A68A69' }}
                        />
                        <span className="text-xs" style={{ color: 'rgba(33,58,80,0.70)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Curriculum accordion ────────────────────────────────────── */}
      <div className="container max-w-5xl mt-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <div className="flex items-baseline justify-between mb-8">
            <h2
              className="font-accent font-semibold text-2xl md:text-3xl normal-case"
              style={{ color: '#213a50' }}
            >
              Program kursu
            </h2>
            <span className="text-sm" style={{ color: 'rgba(33,58,80,0.45)' }}>
              {curriculum.length} modułów · {totalLessons} lekcji
            </span>
          </div>

          <SmoothAccordion
            items={accordionItems}
            defaultOpen={[0]}
            allowMultiple
          />
        </motion.div>

        {/* ── Author ──────────────────────────────────────────────── */}
        {course.author && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mt-14 pt-10 border-t"
            style={{ borderColor: 'rgba(33,58,80,0.10)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(33,58,80,0.40)' }}>
              Prowadząca
            </p>
            <Link
              href="/o-mnie"
              className="text-base font-medium hover:text-coastal-gold transition-colors duration-200"
              style={{ color: '#213a50' }}
            >
              {course.author} →
            </Link>
          </motion.div>
        )}

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 text-center"
        >
          <p className="text-sm mb-5" style={{ color: 'rgba(33,58,80,0.55)' }}>
            Masz pytania przed zakupem?
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-8 py-3.5 border border-coastal-ocean/30 text-coastal-slate rounded-3xl hover:bg-secondary/10 transition-all duration-200 text-cta text-sm active:scale-[0.97]"
          >
            Napisz do mnie
          </Link>
        </motion.div>

      </div>
    </main>
  )
}
