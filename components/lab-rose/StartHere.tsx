'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

const paths = [
  {
    img: '/images/path-01-energia.png?v=2',
    w: 807,
    h: 969,
    alt: 'Chcę mieć więcej energii — sen, kortyzol, poranna rutyna dla zmęczonych mam',
    label: 'Chcę mieć więcej energii',
    href: '/blog?pilar=energia',
    glow: 'rgba(91,200,245,0.35)',
    glowStrong: 'rgba(91,200,245,0.55)',
  },
  {
    img: '/images/path-02-hormony.png?v=2',
    w: 815,
    h: 1004,
    alt: 'Chcę zadbać o hormony — cykl, tarczyca, hormony stresu dla kobiet po 30',
    label: 'Chcę zadbać o hormony',
    href: '/blog?pilar=hormony',
    glow: 'rgba(232,174,189,0.30)',
    glowStrong: 'rgba(168,212,61,0.30)',
  },
  {
    img: '/images/path-03-longevity.png?v=2',
    w: 859,
    h: 1076,
    alt: 'Chcę żyć 100 lat — longevity, post przerywany, biomarkery',
    label: 'Chcę żyć 100 lat',
    href: '/blog?pilar=longevity',
    glow: 'rgba(126,217,87,0.35)',
    glowStrong: 'rgba(126,217,87,0.55)',
  },
]

export default function StartHere() {
  return (
    <section id="zacznij" style={{ padding: 'clamp(4rem, 9vw, 8rem) 0', background: '#0B0B0C' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 md:mb-16"
        >
          <span className="lr-eyebrow">Zacznij tutaj</span>
          <h2 className="mt-6" style={{ maxWidth: '18ch' }}>
            Co cię tu{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              sprowadziło?
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {paths.map((c) => (
            <motion.div key={c.img} variants={fadeUp}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative"
                style={{
                  borderRadius: '16px',
                  boxShadow: `0 18px 64px -16px ${c.glow}, 0 0 50px -28px ${c.glowStrong}`,
                }}
              >
                <Link
                  href={c.href}
                  aria-label={c.label}
                  className="block relative overflow-hidden"
                  style={{ borderRadius: '16px', textDecoration: 'none' }}
                >
                  <Image
                    src={c.img}
                    alt={c.alt}
                    width={c.w}
                    height={c.h}
                    className="w-full h-auto block"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Hover glow overlay */}
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      borderRadius: '16px',
                      boxShadow: `inset 0 0 0 1px ${c.glowStrong}, inset 0 0 60px -20px ${c.glow}`,
                      transition: 'opacity 350ms var(--ease-out-strong)',
                      pointerEvents: 'none',
                    }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
