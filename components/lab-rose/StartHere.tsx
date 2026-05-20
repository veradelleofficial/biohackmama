'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
}

const paths = [
  {
    num: '01',
    title: 'Chcę mieć więcej energii',
    desc: 'Sen, kortyzol, poranna rutyna. Dla osób śpiących < 6h, które budzą się zmęczone i potrzebują stabilnego paliwa na cały dzień.',
    cta: 'Ścieżka energii',
    href: '/blog?pilar=energia',
  },
  {
    num: '02',
    title: 'Chcę zadbać o hormony',
    desc: 'Cykl, tarczyca, hormony stresu. Dla kobiet, które czują, że ich ciało straciło wewnętrzną równowagę i „coś w nim nie gra”.',
    cta: 'Ścieżka hormonów',
    href: '/blog?pilar=hormony',
  },
  {
    num: '03',
    title: 'Chcę żyć 100 lat',
    desc: 'Longevity, autofagia i głęboka regeneracja komórkowa. Dla osób, które chcą przejąć kontrolę nad procesem starzenia i zachować sprawne ciało oraz umysł.',
    cta: 'Ścieżka longevity',
    href: '/blog?pilar=longevity',
  },
]

export default function StartHere() {
  return (
    <section id="zacznij" style={{ padding: 'clamp(4rem, 9vw, 8rem) 0' }}>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--lr-rule)' }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {paths.map((c, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              style={{
                background: 'var(--lr-bg)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                position: 'relative',
              }}
            >
              <span
                className="lr-mono"
                style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}
              >
                // {c.num}
              </span>
              <h3 className="mt-6 mb-4" style={{ color: 'var(--lr-ink)' }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '0.95rem' }}>{c.desc}</p>
              <Link
                href={c.href}
                className="mt-8 inline-flex items-center gap-3 group"
                style={{ textDecoration: 'none' }}
              >
                <span
                  className="lr-mono"
                  style={{ color: 'var(--lr-accent)', fontSize: '0.75rem' }}
                >
                  {c.cta}
                </span>
                <span
                  style={{
                    color: 'var(--lr-accent)',
                    transition: 'transform 240ms var(--ease-out-strong)',
                    display: 'inline-block',
                  }}
                  className="group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
