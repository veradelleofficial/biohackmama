'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getCourses } from '@/lib/sanity/queries'
import { Star, Clock, BookOpen } from 'lucide-react'
import { KursyCoverHero } from '@/components/kursy/KursyCoverHero'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const upcomingCourses = [
  {
    id: 'upcoming-1',
    title: 'Hormony w równowadze',
    description: 'Zrozum swoje hormony i naucz się naturalnych sposobów ich regulacji',
    duration: '8 tygodni',
    lessons: 24,
    level: 'Początkujący',
    image: '/images/pexels-daria-liudnaya-8187452.webp',
  },
  {
    id: 'upcoming-2',
    title: 'Regeneracja i sen',
    description: 'Kompleksowy przewodnik po wysokiej jakości śnie i regeneracji',
    duration: '6 tygodni',
    lessons: 18,
    level: 'Średniozaawansowany',
    image: '/images/kira-severinova-5nk1IVc0h5Y-unsplash.webp',
  },
  {
    id: 'upcoming-3',
    title: 'Biohacking na co dzień',
    description: 'Praktyczne techniki do wdrażania w codziennym życiu',
    duration: '4 tygodnie',
    lessons: 12,
    level: 'Początkujący',
    image: '/images/pexels-cottonbro-5722883.webp',
  },
]

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
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filtered, setFiltered] = useState<Course[]>([])
  const [level, setLevel] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses()
        setCourses(data || [])
        setFiltered(data || [])
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    setFiltered(level === 'all' ? courses : courses.filter((c) => c.level === level))
  }, [level, courses])

  const levels = ['all', 'Początkujący', 'Średniozaawansowany', 'Zaawansowany']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <main className="pb-14 md:pb-20">

      {/* Full-bleed cover hero */}
      <KursyCoverHero />

      {/* Content — -mt overlaps the hero's bottom fade zone */}
      <div className="container -mt-8 md:-mt-14 relative z-40">

        {/* Level filter — bridge card */}
        <motion.div
          className="mb-10 rounded-3xl border border-border/40 px-5 py-5 md:px-7 md:py-6"
          style={{
            background: 'rgba(239,234,228,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: 'var(--shadow-float)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE_OUT }}
        >
          <motion.div
            className="flex flex-wrap gap-2"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {levels.map((lvl) => (
              <motion.button
                key={lvl}
                onClick={() => setLevel(lvl)}
                variants={{
                  hidden: { opacity: 0, y: 8, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: EASE_OUT } },
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2.5 rounded-2xl transition-colors duration-250 text-cta ${
                  level === lvl
                    ? 'bg-coastal-gold text-white shadow-coastal-sm'
                    : 'bg-card border border-border/60 text-coastal-slate hover:border-coastal-ocean/40'
                }`}
              >
                {lvl === 'all' ? 'Wszystkie' : lvl}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Courses grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ładowanie kursów...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Brak kursów w tej kategorii.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((course) => (
              <motion.div
                key={course._id}
                variants={itemVariants}
                className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-full h-48 bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
                  🎓
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(course.rating)
                              ? 'fill-coastal-gold text-coastal-gold'
                              : 'text-border'
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <Link href={`/kursy/${course.slug.current}`}>
                    <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2 tracking-heading group-hover:text-coastal-gold transition-colors duration-300">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border/50">
                    <span>⏱️ {course.duration}</span>
                    <span>📚 {course.lessons} lekcji</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-coastal-gold">{course.price} zł</span>
                    <Link
                      href={`/kursy/${course.slug.current}`}
                      className="px-5 py-2.5 bg-coastal-gold text-white rounded-2xl text-sm hover:brightness-110 hover:shadow-coastal transition-all duration-300 text-cta"
                    >
                      Więcej
                    </Link>
                  </div>

                  <div className="text-xs text-muted-foreground mt-3">
                    ⭐ {course.rating} ({course.reviews} opinii)
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Upcoming courses */}
        <motion.div
          className="mt-14 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-normal mb-8 tracking-heading text-center">
            Już wkrótce
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {upcomingCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden vintage-film">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-lg md:text-xl font-heading font-semibold tracking-heading uppercase">
                      Już wkrótce
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                    {course.level}
                  </span>
                  <h3 className="font-heading font-semibold text-xl mt-3 mb-2 tracking-heading">
                    {course.title}
                  </h3>
                  <p className="text-sm font-light mb-4 line-clamp-2" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={16} className="text-coastal-ocean" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen size={16} className="text-coastal-ocean" />
                      {course.lessons} lekcji
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-14 md:mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.75)' }}>
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </div>

    </main>
  )
}
