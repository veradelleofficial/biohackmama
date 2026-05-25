'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE } },
}

interface Course {
  variant: 'hormones' | 'sleep' | 'biohacking'
  title: string
  desc: string
  duration: string
  lessons: string
  href: string
  img: string | null
  phColor: string
  phBg: string
}

const courses: Course[] = [
  {
    variant: 'hormones',
    title: 'Hormony w równowadze',
    desc: 'Odzyskaj stabilność nastroju i energii. Naucz się zarządzać swoim wewnętrznym systemem operacyjnym w oparciu o kobiecy cykl biologiczny.',
    duration: '8 tygodni',
    lessons: '24 lekcje wideo',
    href: '/kursy',
    img: null,
    phColor: '#ff85a1',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
  },
  {
    variant: 'sleep',
    title: 'Hakowanie Snu: Reset',
    desc: 'Sen to Twój najpotężniejszy, darmowy lek. Okiełznaj rytm dobowy dla maksymalnej regeneracji komórkowej i pożegnaj mgłę mózgową.',
    duration: '6 tygodni',
    lessons: '18 lekcji wideo',
    href: '/kursy',
    img: null,
    phColor: '#4cc9f0',
    phBg: 'linear-gradient(135deg, #09131a, #112a3d)',
  },
  {
    variant: 'biohacking',
    title: 'Codzienny Biohacking',
    desc: 'Strategia mikro-zmian. 50 gotowych nawyków, które wdrożysz bez presji. Zarządzaj długowiecznością poprzez drobne codzienne wybory.',
    duration: '4 tygodnie',
    lessons: '12 lekcji wideo',
    href: '/kursy',
    img: null,
    phColor: '#ccff33',
    phBg: 'linear-gradient(135deg, #111a09, #253d11)',
  },
]

export default function FeaturedCourses() {
  return (
    <section
      id="kursy"
      style={{ padding: 'clamp(4rem, 9vw, 8rem) 0', borderTop: '1px solid var(--lr-rule)', background: '#070707' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <span className="lr-eyebrow">Programy Masterclass</span>
            <h2 className="mt-6" style={{ maxWidth: '18ch' }}>
              Protokoły transformacji{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                dla mam.
              </span>
            </h2>
          </div>
          <Link href="/kursy" className="lr-cta-ghost">
            Poznaj programy dla każdego
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {courses.map((c) => (
            <motion.div key={c.variant} variants={fadeUp}>
              <Link href={c.href} className={`lr-course-card lr-course-card--${c.variant} group`}>
                <div className="lr-course-card__media">
                  {c.img ? (
                    <Image src={c.img} alt={c.title} width={760} height={460} sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <div className="lr-course-card__media-ph" style={{ background: c.phBg, color: c.phColor }}>
                      grafika wkrótce
                    </div>
                  )}
                </div>

                <div className="lr-course-card__meta">
                  <span>{c.duration}</span>
                  <span>{c.lessons}</span>
                </div>

                <h3 className="lr-course-card__title">{c.title}</h3>
                <p className="lr-course-card__desc">{c.desc}</p>

                <div className="lr-course-card__cta">
                  Poznaj protokół <span aria-hidden>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
