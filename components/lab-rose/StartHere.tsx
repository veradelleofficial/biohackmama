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

function CtaWave({ color, d }: { color: string; d: string }) {
  return (
    <svg className="lr-cta-wave" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  )
}

const paths = [
  {
    num: '// 01',
    variant: 'energy',
    title: 'Chcę mieć więcej energii',
    desc: 'Sen, mitochondria, poranna rutyna. Dla osób śpiących < 6h, które budzą się zmęczone i potrzebują paliwa na cały dzień, bez zjadów.',
    cta: 'Ścieżka energii',
    href: '/blog?pilar=energia',
    img: '/images/g1.png',
    w: 1148,
    h: 1216,
    waveColor: '#9be35a',
    waveD: 'M0,5 Q25,0 50,5 T100,5',
  },
  {
    num: '// 02',
    variant: 'hormones',
    title: 'Chcę zadbać o hormony',
    desc: 'Cykl, tarczyca, metabolizm. Dla kobiet, które czują, że ich ciało straciło wewnętrzną, kobiecą równowagę, zmagają się z PMS, mgłą mózgową lub oporną wagą.',
    cta: 'Ścieżka hormonów',
    href: '/blog?pilar=hormony',
    img: '/images/g2.png',
    w: 887,
    h: 1016,
    waveColor: '#e2a0b1',
    waveD: 'M0,5 Q25,10 50,5 T100,5',
  },
  {
    num: '// 03',
    variant: 'longevity',
    title: 'Chcę żyć 100 lat',
    desc: 'Longevity, autofagia, regeneracja komórkowa. Dla osób, które chcą przejąć kontrolę nad procesem starzenia, aktywować geny długowieczności oraz mieć sprawne ciało i umysł.',
    cta: 'Ścieżka longevity',
    href: '/blog?pilar=longevity',
    img: '/images/g3.png',
    w: 742,
    h: 1185,
    waveColor: '#45d6c4',
    waveD: 'M0,5 Q25,2 50,5 T100,5',
  },
  {
    num: '// 04',
    variant: 'gut-immunity',
    title: 'Chcę naprawić jelita i odporność',
    desc: 'Mikrobiom, oś jelito-mózg, szczelność bariery jelitowej. Dla osób zmagających się z mgłą mózgową, alergiami, spadkami formy i wiecznym zmęczeniem.',
    cta: 'Ścieżka jelita',
    href: '/blog?temat=detoks-i-dom',
    img: '/images/g6.png',
    w: 1000,
    h: 1200,
    waveColor: '#B5C99A',
    waveD: 'M0,5 Q25,6 50,5 T100,5',
  },
  {
    num: '// 05',
    variant: 'clean-home',
    title: 'Chcę czysty dom',
    desc: 'Toksyny budowlane, elektrosmog, jakość wody i powietrza. Dla osób, które rozumieją, że cztery ściany to najważniejszy czynnik środowiskowy kształtujący naszą biologię.',
    cta: 'Ścieżka czystego domu',
    href: '/blog?temat=detoks-i-dom',
    img: '/images/g4.png',
    w: 1148,
    h: 1216,
    waveColor: '#e2a0b1',
    waveD: 'M0,5 Q25,8 50,5 T100,5',
  },
  {
    num: '// 06',
    variant: 'kids',
    title: 'Chcę zadbać o dzieci',
    desc: 'Rozwój mózgu, system immunologiczny, nawyki zdrowotne. Dla rodziców, którzy wiedzą, że najlepszy prezent dla dziecka to fundament zdrowia zbudowany w pierwszych latach życia.',
    cta: 'Ścieżka dla rodziców',
    href: '/blog?pilar=dzieci',
    img: '/images/g5.png',
    w: 1000,
    h: 1200,
    waveColor: '#45d6c4',
    waveD: 'M0,5 Q25,3 50,5 T100,5',
  },
  {
    num: '// 07',
    variant: 'nervous-system',
    title: 'Chcę ukoić układ nerwowy',
    desc: 'Przebodźcowanie, nerw błędny, hormony stresu. Dla osób żyjących w wiecznym pędzie oraz napięciu i chcą przełączyć ciało z trybu przetrwania w stan spokoju.',
    cta: 'Ścieżka układu nerwowego',
    href: '/blog?temat=stres-i-kortyzol',
    img: '/images/g8.png',
    w: 1000,
    h: 1200,
    waveColor: '#B5C99A',
    waveD: 'M0,5 Q25,7 50,5 T100,5',
  },
  {
    num: '// 08',
    variant: 'detox',
    title: 'Chcę oczyścić i odciążyć organizm',
    desc: 'Wsparcie wątroby, detoks komórkowy. Dla osób, które chcą skutecznie i bezpiecznie usunąć z ciała nagromadzoną chemię.',
    cta: 'Ścieżka detoksu',
    href: '/blog?temat=detoks-i-dom',
    img: '/images/g7.png',
    w: 1000,
    h: 1200,
    waveColor: '#9be35a',
    waveD: 'M0,5 Q25,4 50,5 T100,5',
  },
]

export default function StartHere() {
  return (
    <section
      id="zacznij"
      className="relative overflow-hidden"
      style={{ padding: 'clamp(4rem, 9vw, 8rem) 0', background: '#050505' }}
    >
      {/* Ambient bg glows */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-10%', left: '5%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(226,160,177,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', right: '5%', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(0,240,255,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative">
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

        {/* Top 4 paths */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {paths.slice(0, 4).map((c) => (
            <motion.div key={c.num} variants={fadeUp}>
              <Link href={c.href} className={`lr-path-card lr-path-card--${c.variant} group`}>
                <div className="lr-graphic">
                  <Image src={c.img} alt="" width={c.w} height={c.h} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>

                <span className="lr-path-card__num">{c.num}</span>

                <div className="lr-path-card__body">
                  <h3 className="lr-path-card__title">{c.title}</h3>
                  <p className="lr-path-card__desc">{c.desc}</p>
                  <span className="lr-path-card__cta">
                    {c.cta}
                    <span className="lr-path-card__arrow" aria-hidden>→</span>
                  </span>
                  <CtaWave color={c.waveColor} d={c.waveD} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom 4 paths */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {paths.slice(4).map((c) => (
            <motion.div key={c.num} variants={fadeUp}>
              <Link href={c.href} className={`lr-path-card lr-path-card--${c.variant} group`}>
                <div className="lr-graphic">
                  <Image src={c.img} alt="" width={c.w} height={c.h} sizes="(max-width: 768px) 100vw, 25vw" />
                </div>

                <span className="lr-path-card__num">{c.num}</span>

                <div className="lr-path-card__body">
                  <h3 className="lr-path-card__title">{c.title}</h3>
                  <p className="lr-path-card__desc">{c.desc}</p>
                  <span className="lr-path-card__cta">
                    {c.cta}
                    <span className="lr-path-card__arrow" aria-hidden>→</span>
                  </span>
                  <CtaWave color={c.waveColor} d={c.waveD} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
