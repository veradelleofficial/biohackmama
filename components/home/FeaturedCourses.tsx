'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock } from '@phosphor-icons/react'
import { RevealImage } from '@/components/ui/RevealImage'
import { TiltCard } from '@/components/ui/TiltCard'
import { staggerContainer, cardReveal, VIEWPORT_ONCE } from '@/lib/animations'

const mockCourses = [
  {
    id: 1,
    title: 'Hormony w równowadze',
    description: 'Zrozum swoje hormony i naucz się naturalnych sposobów ich regulacji',
    duration: '8 tygodni',
    lessons: 24,
    level: 'Początkujący',
    image: '/images/pexels-daria-liudnaya-8187452.webp',
    imageAlt: 'Kobieta z jabłkiem — równowaga hormonalna i zdrowe ciało',
  },
  {
    id: 2,
    title: 'Regeneracja i sen',
    description: 'Kompleksowy przewodnik po wysokiej jakości śnie i regeneracji',
    duration: '6 tygodni',
    lessons: 18,
    level: 'Średniozaawansowany',
    image: '/images/kira-severinova-5nk1IVc0h5Y-unsplash.webp',
    imageAlt: 'Kobieta praktykująca jogę — regeneracja ciała i umysłu',
  },
  {
    id: 3,
    title: 'Biohacking na co dzień',
    description: 'Praktyczne techniki do wdrażania w codziennym życiu',
    duration: '4 tygodnie',
    lessons: 12,
    level: 'Początkujący',
    image: '/images/pexels-cottonbro-5722883.webp',
    imageAlt: 'Kapsułki i suplementy — codzienne biohacki',
  },
]

export default function FeaturedCourses() {
  return (
    <section className="pt-6 pb-14 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-1.5 md:mb-2">
            <Image src="/images/icon.webp" alt="" width={64} height={64} className="h-14 md:h-16 w-auto" />
          </div>
          <span
            className="inline-block text-[11px] md:text-xs uppercase font-mono mb-3"
            style={{ color: '#8B6F47', letterSpacing: '0.25em' }}
          >
            Kursy online
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
            Popularne kursy
          </h2>
          <div className="flex justify-center mb-5">
            <span className="inline-block w-12 h-[2px] rounded-full" style={{ backgroundColor: '#4F5E44' }} />
          </div>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-light px-4 md:px-0" style={{ color: 'rgba(45, 58, 45, 0.78)' }}>
            Najchętniej wybierane kursy przez naszą społeczność
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {mockCourses.map((course, i) => (
            <motion.div key={course.id} variants={cardReveal}>
              <TiltCard
                className="group rounded-3xl overflow-hidden"
                style={{ boxShadow: 'var(--shadow-rest)', backgroundColor: '#2D3A2D', color: '#FBF7EE' }}
                maxTilt={3.5}
                scaleOnHover={1.012}
                hoverShadow="var(--shadow-lift)"
              >
                {/* Course image with reveal */}
                <div className="relative" style={{ backgroundColor: '#3F4D3D' }}>
                  <RevealImage
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    containerClassName="relative w-full aspect-[16/10]"
                    direction="up"
                    delay={i * 0.07}
                  />
                  {/* "Coming soon" overlay sits above the image */}
                  <div className="absolute inset-0 flex items-center justify-center z-20" style={{ backgroundColor: 'rgba(45, 58, 45, 0.55)' }}>
                    <span className="text-lg md:text-xl font-heading font-semibold tracking-heading uppercase" style={{ color: '#FBF7EE' }}>
                      Już wkrótce
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <span
                    className="text-[11px] uppercase font-mono"
                    style={{ color: '#B89668', letterSpacing: '0.2em' }}
                  >
                    Kurs · {course.level}
                  </span>

                  <h3
                    className="font-heading font-semibold text-xl mt-2 mb-2 line-clamp-2 tracking-heading"
                    style={{ color: '#FBF7EE' }}
                  >
                    {course.title}
                  </h3>

                  <p
                    className="text-sm font-light mb-4 line-clamp-2"
                    style={{ color: '#E5DCC4', lineHeight: '1.6' }}
                  >
                    {course.description}
                  </p>

                  <div
                    className="flex items-center gap-4 text-sm mb-4 pb-4 border-b"
                    style={{ color: '#B89668', borderColor: 'rgba(184, 150, 104, 0.25)' }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Clock size={16} weight="duotone" style={{ color: '#B89668' }} />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen size={16} weight="duotone" style={{ color: '#B89668' }} />
                      {course.lessons} lekcji
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="w-full py-3 rounded-full font-medium text-sm uppercase tracking-wider opacity-90 cursor-default"
                    style={{ backgroundColor: '#B89668', color: '#2D3A2D', letterSpacing: '0.05em' }}
                  >
                    Już wkrótce
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/kursy"
            className="inline-block px-8 py-3.5 rounded-full text-cta text-sm border-2 transition-colors active:scale-[0.97]"
            style={{ borderColor: '#2D3A2D', color: '#2D3A2D' }}
          >
            Zobacz wszystkie kursy
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
