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
    <section className="py-14 md:py-20 lg:py-24 relative overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-normal mb-4 md:mb-5 tracking-heading">
            Popularne kursy
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-light px-4 md:px-0" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
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
                className="group bg-card rounded-3xl overflow-hidden border border-border/60"
                style={{ boxShadow: 'var(--shadow-rest)' }}
                maxTilt={3.5}
                scaleOnHover={1.012}
                hoverShadow="var(--shadow-lift)"
              >
                {/* Course image with reveal — all slide 'up' for consistent feel */}
                <div className="relative">
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
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <span className="text-white text-lg md:text-xl font-heading font-semibold tracking-heading uppercase">
                      Już wkrótce
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="mb-3">
                    <span className="text-xs px-3 py-1.5 bg-secondary/15 text-coastal-ocean rounded-full font-medium">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2 tracking-heading">
                    {course.title}
                  </h3>

                  <p className="text-sm font-light mb-4 line-clamp-2" style={{ color: 'rgba(72, 89, 107, 0.78)', lineHeight: '1.6' }}>
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border/50">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={16} weight="duotone" className="text-coastal-ocean" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen size={16} weight="duotone" className="text-coastal-ocean" />
                      {course.lessons} lekcji
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-sm font-medium text-coastal-ocean">Już wkrótce</span>
                  </div>
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
            className="inline-block px-8 py-3.5 border border-coastal-ocean/30 text-coastal-slate rounded-3xl
                       hover:bg-secondary/10 hover:border-coastal-ocean/50
                       transition-[transform,background-color,border-color] duration-200
                       active:scale-[0.97] text-cta text-sm"
          >
            Zobacz wszystkie kursy
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
