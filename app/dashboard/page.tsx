'use client'

import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, GraduationCap, Heart, Settings, ArrowRight } from 'lucide-react'

const purchasedCourses = [
  {
    id: 1,
    title: 'Hormony w równowadze',
    progress: 65,
    lessons: 24,
    completedLessons: 16,
    image: '/images/pexels-daria-liudnaya-8187452.webp',
  },
  {
    id: 2,
    title: 'Biohacking na co dzień',
    progress: 20,
    lessons: 12,
    completedLessons: 3,
    image: '/images/pexels-cottonbro-5722883.webp',
  },
]

const purchasedEbooks = [
  {
    id: 1,
    title: 'Kompletny przewodnik po mitochondriach',
    pages: 89,
    image: '/images/pexels-daria-liudnaya-8187444.webp',
  },
]

export default function DashboardPage() {
  const { user } = useUser()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-2">
            Witaj, {user?.firstName || 'piękna'}!
          </h1>
          <p className="text-base md:text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Twój panel — kursy, ebooki i postępy w jednym miejscu
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: GraduationCap, label: 'Kursy', value: purchasedCourses.length },
            { icon: BookOpen, label: 'Ebooki', value: purchasedEbooks.length },
            { icon: Heart, label: 'Ulubione', value: 0 },
            { icon: Settings, label: 'Ustawienia', value: null, href: '/dashboard/settings' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-card rounded-3xl p-5 md:p-6 border border-border/60 shadow-coastal-sm hover:shadow-card-hover transition-all duration-500"
            >
              <stat.icon className="w-6 h-6 text-coastal-ocean mb-3" />
              <p className="text-2xl font-bold text-coastal-gold">{stat.value ?? '—'}</p>
              <p className="text-sm font-light" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Purchased Courses */}
        <motion.section
          className="mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-heading font-normal tracking-heading">
              Moje kursy
            </h2>
            <Link
              href="/kursy"
              className="text-sm text-coastal-gold hover:text-coastal-gold/80 transition-colors inline-flex items-center gap-1"
            >
              Przeglądaj kursy <ArrowRight size={16} />
            </Link>
          </div>

          {purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {purchasedCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover transition-all duration-500 flex flex-col sm:flex-row"
                >
                  <div className="relative w-full sm:w-40 md:w-48 aspect-[16/10] sm:aspect-auto flex-shrink-0">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                      style={{ filter: 'sepia(8%) saturate(92%)' }}
                      sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </div>
                  <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-1 tracking-heading">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {course.completedLessons} z {course.lessons} lekcji
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span style={{ color: 'rgba(72, 89, 107, 0.7)' }}>Postęp</span>
                        <span className="font-medium text-coastal-gold">{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-coastal-gold to-coastal-ocean rounded-full transition-all duration-700"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <Link
                        href={`/kursy/${course.id}`}
                        className="inline-block mt-3 px-4 py-2 bg-coastal-gold text-white rounded-2xl text-xs hover:brightness-110 hover:shadow-coastal transition-all duration-300 text-cta"
                      >
                        Kontynuuj
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/60 text-center">
              <GraduationCap className="w-12 h-12 text-coastal-ocean/40 mx-auto mb-4" />
              <p className="text-lg font-light mb-4" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
                Nie masz jeszcze żadnych kursów
              </p>
              <Link
                href="/kursy"
                className="inline-block px-6 py-3 bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-all duration-300 text-cta text-sm"
              >
                Odkryj kursy
              </Link>
            </div>
          )}
        </motion.section>

        {/* Purchased Ebooks */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-heading font-normal tracking-heading">
              Moje ebooki
            </h2>
            <Link
              href="/ebooki"
              className="text-sm text-coastal-gold hover:text-coastal-gold/80 transition-colors inline-flex items-center gap-1"
            >
              Przeglądaj ebooki <ArrowRight size={16} />
            </Link>
          </div>

          {purchasedEbooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {purchasedEbooks.map((ebook) => (
                <div
                  key={ebook.id}
                  className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-coastal-sm hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={ebook.image}
                      alt={ebook.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      style={{ filter: 'sepia(8%) saturate(92%)' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-heading font-semibold text-lg mb-1 tracking-heading">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{ebook.pages} stron</p>
                    <button className="px-4 py-2 bg-coastal-gold text-white rounded-2xl text-xs hover:brightness-110 hover:shadow-coastal transition-all duration-300 text-cta">
                      Pobierz PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/60 text-center">
              <BookOpen className="w-12 h-12 text-coastal-ocean/40 mx-auto mb-4" />
              <p className="text-lg font-light mb-4" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
                Nie masz jeszcze żadnych ebooków
              </p>
              <Link
                href="/ebooki"
                className="inline-block px-6 py-3 bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-all duration-300 text-cta text-sm"
              >
                Odkryj ebooki
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </main>
  )
}
