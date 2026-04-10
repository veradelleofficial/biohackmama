'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getCourses } from '@/lib/sanity/queries'
import { Star } from 'lucide-react'

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
    let result = courses
    if (level !== 'all') {
      result = result.filter((c) => c.level === level)
    }
    setFiltered(result)
  }, [level, courses])

  const levels = ['all', 'Początkujący', 'Średniozaawansowany', 'Zaawansowany']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-normal mb-4 md:mb-5 tracking-heading uppercase">Kursy online</h1>
          <p className="text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Rozwijaj się z naszymi kursami na temat zdrowia i biohackingu
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mb-10 p-4 md:p-5 bg-secondary/8 border border-border/40 rounded-2xl text-center">
          <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
            Treści, którymi się dzielę, mają charakter wyłącznie edukacyjny i nie zastępują porady lekarskiej. Pamiętaj, że każdy organizm jest inny – przed wdrożeniem nowych protokołów, suplementacji czy zmian w diecie, skonsultuj się ze swoim lekarzem lub wykwalifikowanym specjalistą.
          </p>
        </div>

        {/* Level Filter */}
        <div className="mb-12 flex flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-5 py-2.5 rounded-2xl transition-all duration-300 text-cta ${
                level === lvl
                  ? 'bg-coastal-gold text-white shadow-coastal-sm'
                  : 'bg-card border border-border/60 text-coastal-slate hover:border-coastal-ocean/40'
              }`}
            >
              {lvl === 'all' ? 'Wszystkie' : lvl}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
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

        {/* Bottom disclaimer */}
        <div className="mt-14 md:mt-20 pt-8 border-t border-border/40 text-center">
          <p className="text-xs font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </div>
    </main>
  )
}
