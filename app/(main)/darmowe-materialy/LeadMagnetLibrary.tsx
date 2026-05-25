'use client'

import { motion } from 'framer-motion'
import PageHeader from '@/components/lab-rose/PageHeader'
import LeadMagnetCard, { type LeadMagnet } from '@/components/lab-rose/LeadMagnetCard'

const materials: LeadMagnet[] = [
  {
    slug: 'poranny-protokol',
    title: 'Poranny Protokół Mamy',
    desc: '7 kroków, 8 minut, mierzalna różnica w 14 dni. PDF z protokołem i checklistą do druku.',
    format: 'PDF',
    img: null,
    accent: '#C9F24F',
    phBg: 'linear-gradient(135deg, #14180a, #2c3d11)',
  },
  {
    slug: 'lista-zbednikow',
    title: 'Lista zbędników z drogerii',
    desc: '12 produktów z chemią, które warto wyrzucić, i czym je zastąpić. Low-tox start w jeden wieczór.',
    format: 'Checklist',
    img: null,
    accent: '#E8AEBD',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
  },
  {
    slug: 'dziennik-snu',
    title: 'Dziennik snu — 14 dni',
    desc: 'Prosty tracker do śledzenia jakości snu, energii i nawyków. Zobacz wzorce, zanim zmienisz cokolwiek.',
    format: 'PDF',
    img: null,
    accent: '#4cc9f0',
    phBg: 'linear-gradient(135deg, #09131a, #112a3d)',
  },
  {
    slug: 'audyt-sypialni-dziecka',
    title: 'Audyt sypialni dziecka',
    desc: 'Checklista czystego, bezpiecznego snu malucha: światło, powietrze, materiały, EMF. Punkt po punkcie.',
    format: 'Checklist',
    img: null,
    accent: '#9be35a',
    phBg: 'linear-gradient(135deg, #111a09, #253d11)',
  },
  {
    slug: 'cykl-w-praktyce',
    title: 'Cykl w praktyce',
    desc: 'Co jeść, kiedy trenować i jak się regenerować w każdej fazie cyklu. Ściąga na lodówkę.',
    format: 'PDF',
    img: null,
    accent: '#E8AEBD',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
  },
  {
    slug: 'suplementacja-bez-bzdur',
    title: 'Suplementacja bez bzdur',
    desc: '12 suplementów, które warto mieć. I 12, które są wyrzucaniem pieniędzy. Bez ściemy producentów.',
    format: 'PDF',
    img: null,
    accent: '#45d6c4',
    phBg: 'linear-gradient(135deg, #09181a, #11383d)',
  },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function LeadMagnetLibrary() {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Darmowe materiały"
        title={
          <>
            Weź to, co{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              naprawdę działa
            </span>{' '}
            za darmo.
          </>
        }
        description="Przejmij kontrolę nad swoim zdrowiem. Pobierz sprawdzone przewodniki i checklisty, które pomogły mi poznać potrzeby własnego organizmu i ułożyć skuteczną suplementację. Wybierz interesujący Cię materiał, podaj mail i odbierz go natychmiast na skrzynkę. Bezpiecznie, bez spamu i z możliwością wypisu jednym kliknięciem."
      />

      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(4rem, 9vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {materials.map((m) => (
              <LeadMagnetCard key={m.slug} m={m} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
