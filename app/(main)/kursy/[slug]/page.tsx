'use client'

import { useState, useEffect } from 'react'
import { getCourseBySlug } from '@/lib/sanity/queries'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'

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
  curriculum?: Array<{ title: string; lessons: Array<{ title: string; duration: string }> }>
  author?: string
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function CourseDetailPage({ params }: PageProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseBySlug(params.slug)
        setCourse(data)
      } catch (error) {
        console.error('Error fetching course:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [params.slug])

  if (loading) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <p className="text-muted-foreground">Ładowanie kursu...</p>
        </div>
      </main>
    )
  }

  if (!course) {
    return (
      <main className="pt-32 pb-20">
        <div className="container text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Kurs nie znaleziony</h1>
          <Link href="/kursy" className="text-primary hover:underline">
            Wróć do kursów
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 mb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              href="/kursy"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={20} />
              Wróć do kursów
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-sm px-3 py-1 bg-primary/20 text-primary rounded-full">
                {course.level}
              </span>

              <h1 className="text-5xl font-heading font-bold mt-4 mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/50 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">⏱️</div>
                  <p className="text-sm text-muted-foreground mt-2">{course.duration}</p>
                </div>
                <div className="bg-white/50 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">📚</div>
                  <p className="text-sm text-muted-foreground mt-2">{course.lessons} lekcji</p>
                </div>
                <div className="bg-white/50 backdrop-blur p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">⭐</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {course.rating} ({course.reviews})
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg border border-border p-8 h-fit"
            >
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Cena kursu</p>
                <p className="text-5xl font-bold text-primary">{course.price} zł</p>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium mb-4">
                Zapisz się teraz
              </button>

              <p className="text-sm text-muted-foreground text-center">
                Dostęp dożywotni do wszystkich materiałów
              </p>

              <hr className="my-6" />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Dostęp na żywo i nagrania</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Materiały do pobrania</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Ceryfikat ukończenia</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-sm">Wsparcie przez email</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="container">
        {course.curriculum && course.curriculum.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-heading font-bold mb-6">Program kursu</h2>

            <div className="space-y-4">
              {course.curriculum.map((module, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <div className="bg-primary/5 p-4 font-heading font-bold">
                    {module.title}
                  </div>
                  <div className="p-4 space-y-2">
                    {module.lessons?.map((lesson, lidx) => (
                      <div key={lidx} className="flex items-center justify-between text-sm">
                        <span>{lesson.title}</span>
                        <span className="text-muted-foreground">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* About Author */}
        {course.author && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-t border-border pt-8"
          >
            <h3 className="text-2xl font-heading font-bold mb-4">O autorce</h3>
            <p className="text-muted-foreground">{course.author}</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
