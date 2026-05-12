'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function PaletaLabPage() {
  useEffect(() => {
    document.documentElement.setAttribute('data-page', 'lab-rose')
    return () => document.documentElement.removeAttribute('data-page')
  }, [])

  return (
    <main className="lab-rose min-h-screen">
      {/* ─── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ padding: 'clamp(6rem, 12vw, 10rem) 0 clamp(4rem, 8vw, 7rem)' }}>
        {/* Ambient rose glow — top right */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '-10%',
            right: '-15%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(232,174,189,0.18) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Ambient lime glow — bottom left */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            bottom: '-20%',
            left: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(201,242,79,0.08) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Vertical hairline left */}
        <div aria-hidden className="hidden md:block absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, var(--lr-rule), transparent)' }} />
        {/* Vertical hairline right */}
        <div aria-hidden className="hidden md:block absolute right-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, var(--lr-rule), transparent)' }} />

        <motion.div
          className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Top row — eyebrow + counter */}
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-12 md:mb-16">
            <span className="lr-eyebrow">Protokół · 001</span>
            <span className="lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}>
              ED. 2026 / vol. I
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} style={{ maxWidth: '20ch' }}>
            Naukowy biohacking
            <br />
            dla mam, które
            <br />
            <span className="lr-rose" style={{ fontStyle: 'italic', fontWeight: 300 }}>nie mają czasu</span>
            <br />
            spać 8 godzin.
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mt-10 md:mt-12"
            style={{ maxWidth: '52ch' }}
          >
            Mierzone protokoły hormonalne, snu i regeneracji oparte na badaniach
            <span className="lr-accent lr-mono" style={{ fontSize: '0.875rem', margin: '0 0.35em' }}>·N=4&nbsp;100·</span>
            kobiet. Bez ezoterycznych shotów. Bez supplementacji na 800 zł miesięcznie.
            Tylko to, co działa w 14&nbsp;dni.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-10 md:mt-14 flex flex-wrap gap-3 md:gap-4 items-center">
            <Link href="/kursy" className="lr-cta-primary">
              Pobierz Protokół #001
              <span aria-hidden>→</span>
            </Link>
            <Link href="/blog" className="lr-cta-ghost">
              Zrób audyt (3 min)
            </Link>
          </motion.div>

          {/* Signature row */}
          <motion.div variants={fadeUp} className="mt-16 md:mt-24 flex items-end justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <span className="lr-script" style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', color: 'var(--lr-rose)', transform: 'rotate(-3deg)', display: 'inline-block' }}>
                Vera Delle
              </span>
              <span className="lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}>
                ────  Founder · BioHackMama
              </span>
            </div>
            <span className="lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}>
              Wrocław · pl
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ──────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', borderTop: '1px solid var(--lr-rule)', borderBottom: '1px solid var(--lr-rule)' }}>
        <motion.div
          className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {[
            { num: '4 100', label: 'Kobiet w badaniach na których oparto protokoły' },
            { num: '14 dni', label: 'Średni czas do pierwszej mierzalnej zmiany' },
            { num: '87%', label: 'Czytelniczek wraca do treści ponad 3×' },
            { num: '12', label: 'Recenzowanych źródeł na każdy artykuł' },
          ].map((s, i) => (
            <div key={i} className="lr-stat">
              <span className="lr-stat__num">{s.num}</span>
              <span className="lr-stat__label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── ZACZNIJ TUTAJ — segmentacja ───────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 9vw, 8rem) 0' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-12 md:mb-16"
          >
            <span className="lr-eyebrow">Zacznij tutaj · 003</span>
            <h2 className="mt-6" style={{ maxWidth: '18ch' }}>
              Co cię tu <span className="lr-rose" style={{ fontStyle: 'italic' }}>sprowadziło?</span>
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
            {[
              { num: '01', title: 'Chcę mieć więcej energii', desc: 'Sen, kortyzol, poranna rutyna. Dla mam śpiących < 6h, które wstają zmęczone.', cta: 'Ścieżka energii' },
              { num: '02', title: 'Chcę zadbać o hormony', desc: 'Cykl, tarczyca, hormony stresu. Dla kobiet po 30. które czują że "coś nie gra".', cta: 'Ścieżka hormonów' },
              { num: '03', title: 'Chcę żyć 100 lat', desc: 'Longevity, post przerywany, biomarkery. Dla planujących zdrowie na dekady.', cta: 'Ścieżka longevity' },
            ].map((c, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className="lab-rose-card group"
                style={{
                  background: 'var(--lr-bg)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  position: 'relative',
                }}
              >
                <span className="lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}>
                  // {c.num}
                </span>
                <h3 className="mt-6 mb-4" style={{ color: 'var(--lr-ink)' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '0.95rem' }}>{c.desc}</p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="lr-mono" style={{ color: 'var(--lr-accent)', fontSize: '0.75rem' }}>
                    {c.cta}
                  </span>
                  <span style={{ color: 'var(--lr-accent)' }}>→</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── NEWSLETTER LEAD MAGNET ────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 9vw, 8rem) 0', background: 'var(--lr-surface)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
              <span className="lr-eyebrow">Lead magnet · 001</span>
              <span className="lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem' }}>
                PDF + 5 maili
              </span>
            </div>

            <h2 style={{ maxWidth: '22ch' }}>
              Poranny Protokół Mamy.
              <br />
              <span className="lr-rose" style={{ fontStyle: 'italic', fontWeight: 300 }}>7 kroków, 8 minut,</span>
              <br />
              mierzalna różnica w 14 dni.
            </h2>

            <ul className="mt-10 space-y-3" style={{ listStyle: 'none', padding: 0 }}>
              {[
                'PDF z protokołem i checklist do druku',
                '5 maili przez 2 tygodnie z tłem naukowym',
                'Lista 12 zbędników z drogerii do wyrzucenia',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: 'var(--lr-ink-soft)' }}>
                  <span className="lr-accent lr-mono" style={{ fontSize: '0.875rem', marginTop: '0.15rem' }}>✓</span>
                  <span style={{ fontSize: '0.9375rem' }}>{item}</span>
                </li>
              ))}
            </ul>

            <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="twoj@email.pl"
                className="lr-mono"
                style={{
                  flex: 1,
                  padding: '1rem 1.25rem',
                  background: 'var(--lr-bg)',
                  border: '1px solid var(--lr-rule-strong)',
                  borderRadius: '2px',
                  color: 'var(--lr-ink)',
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  outline: 'none',
                }}
              />
              <button type="submit" className="lr-cta-primary">
                Pobierz protokół
                <span aria-hidden>→</span>
              </button>
            </form>

            <p className="mt-6 lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.6875rem', letterSpacing: '0.18em' }}>
              2&nbsp;847 mam już dostało · bez spamu · wypisz się jednym kliknięciem
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer disclaimer ─────────────────────────────────────────────── */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--lr-rule)' }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="lr-mono" style={{ color: 'var(--lr-ink-dim)', fontSize: '0.625rem', letterSpacing: '0.22em', lineHeight: 1.8 }}>
            Materiały mają charakter informacyjny i nie stanowią porady medycznej. Przed
            zmianami w suplementacji lub stylu życia skonsultuj się z lekarzem.
          </p>
        </div>
      </section>
    </main>
  )
}
