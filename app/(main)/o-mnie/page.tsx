'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Brain, Sparkles, Leaf, ShieldCheck, Baby } from 'lucide-react'
import PageHeader from '@/components/lab-rose/PageHeader'

const EASE = [0.22, 1, 0.36, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const milestones = [
  {
    title: 'Przebudzenie',
    description:
      'Narodziny mojego dziecka były końcem mojej naiwności. Patrzyłam, jak system zawodzi, jak standardowe kuracje i apteczne rozwiązania odbijają się od ściany, nie dając nam żadnej poprawy. Wiedziałam, że nie mogę dłużej czekać na pozwolenie od świata, który zarabia na naszym chorowaniu. Zaczęłam szukać na własną rękę.',
  },
  {
    title: 'Odzyskanie zdrowia na własnych zasadach',
    description:
      'Z niedoczynnością tarczycy wygrałam dwukrotnie i to bez żadnych leków. Najtrudniej było za drugim razem w ciąży i po porodzie, czyli w momencie, kiedy organizm kobiety jest najbardziej obciążony. Wbrew wszystkim medycznym prognozom pokazałam, że czysty styl życia i eliminacja toksyn potrafią zdziałać więcej niż syntetyczne hormony. Od 5 lat mam święty spokój.',
  },
  {
    title: 'Moja wyboista ścieżka',
    description:
      'Uregulowałam hormony naturalnie, ale ta droga mnie po prostu wymęczyła. Przez pięć lat zmagałam się z niedowagą i komplikacjami po porodzie. Miałam momenty, kiedy chciałam to wszystko zostawić i wrócić do systemowych rozwiązań. Ale kiedy tylko zaczynałam słuchać siebie, wiedziałam, że nie mogę zawrócić.',
  },
  {
    title: 'BioHackMama',
    description:
      'Stworzyłam BioHackMama, bo miałam dość bycia bezsilną. Nie piszę do Ciebie jako lekarz czy dietetyk. Piszę jako mama, która na własnej skórze przekonała się, że system nie zawsze ma dla nas odpowiedzi. Planuję sformalizować moją wiedzę i zdobyć dyplom, ale zanim to nastąpi, daję Ci to, co mam najcenniejszego: moje realne doświadczenie i wiedzę, która działa.',
  },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Niezależność od systemu',
    description:
      'Nie kupuję tego, co próbuje mi wciskać przemysł. Przestałam wierzyć, że korporacje chcą dla ludzi dobrze.',
  },
  {
    icon: Leaf,
    title: 'Non-toxic, krok po kroku',
    description:
      'Zapomnij o radykalnych rewolucjach. Zmieniamy to, co nas truje, na to, co nas wspiera. Jedna rzecz na raz.',
  },
  {
    icon: Heart,
    title: 'Z serca, nie z podręcznika',
    description:
      'Mówię po ludzku. Wiem, jak bardzo boli bezsilność, gdy czujesz, że organizm wysyła sygnały, a system mówi że to wyobraźnia.',
  },
  {
    icon: Brain,
    title: 'Mądrość pokoleń + nauka',
    description:
      'Czerpię z ziołolecznictwa, bo działało zanim powstały korporacje. Dodaję biohacking i wiedzę o hormonach.',
  },
  {
    icon: Sparkles,
    title: 'Praktycznie i z głową',
    description:
      'Nie musisz wydawać majątku, żeby żyć zdrowo. Marketing wmówił nam, że eko musi być drogie. Pokazuję jak omijać pułapki.',
  },
  {
    icon: Baby,
    title: 'Dla Ciebie i rodziny',
    description:
      'Większość kosmetyków dla niemowląt to marketingowy nadmiar. Uczę jak wrócić do podstaw i chronić zdrowie malucha.',
  },
]

const forWhom = [
  'Zapracowanej kobiety, która w tym pędzie poczuła, że straciła kontrolę nad tym, czym się otacza.',
  'Młodej mamy, która ma dość szukania pomocy tam, gdzie jej nie ma i chce konkretne odpowiedzi.',
  'Mężczyzny, który czuje odpowiedzialność za zdrowie rodziny i chce świadomie chronić bliskich.',
  'Rodzica, który widzi rosnącą plagę alergii i nie chce być tylko biernym obserwatorem.',
  'Osoby, która czuje, że to idealny moment na przewartościowanie życia.',
  'Każdego, kto ma dość ulegania presji i chce zacząć ufać własnej intuicji.',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="O mnie · 006"
        title={
          <>
            Mama, która{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              obudziła się
            </span>{' '}
            wystarczająco szybko.
          </>
        }
        description="Jestem mamą i pasjonatką, która sama postanowiła zadbać o swoje zdrowie, przestać kierować się propagandą wielkich korporacji i znaleźć odpowiedzi tam, gdzie nasi przodkowie je zostawili."
      />

      {/* Portrait + intro */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(4rem, 8vw, 6rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div
                style={{
                  aspectRatio: '3 / 4',
                  background:
                    'linear-gradient(135deg, var(--lr-surface-2) 0%, var(--lr-bg) 100%)',
                  border: '1px solid var(--lr-rule)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                }}
              >
                <span
                  className="lr-mono"
                  style={{
                    color: 'var(--lr-ink-dim)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.22em',
                  }}
                >
                  IMG-002 · PORTRET · soon
                </span>
                <div>
                  <span
                    className="lr-script"
                    style={{
                      fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                      color: 'var(--lr-rose)',
                      transform: 'rotate(-3deg)',
                      display: 'inline-block',
                      lineHeight: 0.9,
                    }}
                  >
                    Vera Delle
                  </span>
                  <div
                    className="lr-mono"
                    style={{
                      fontSize: '0.625rem',
                      color: 'var(--lr-ink-dim)',
                      letterSpacing: '0.22em',
                      marginTop: '0.5rem',
                    }}
                  >
                    Mama · Biohackerka · Founder
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              <span className="lr-eyebrow">Krótko o mnie</span>
              <p className="mt-6" style={{ maxWidth: '52ch' }}>
                Kiedy urodził się mój syn, zobaczyłam, że coś tu nie gra. Leki nie pomagały.
                Zalecenia lekarzy nie dawały żadnej poprawy. Wiedziałam, że tak to nie powinno
                wyglądać.
              </p>
              <p className="mt-6" style={{ maxWidth: '52ch' }}>
                Od lat interesowałam się zdrowym odżywianiem i naturalną medycyną. Jeszcze zanim
                zaszłam w ciążę, te tematy były mi bliskie. Zagłębienie się w ziołolecznictwo i
                naturopatię po porodzie dało mi nowy wgląd na zdrowie człowieka.{' '}
                <span className="lr-rose">Dwukrotnie wyszłam z niedoczynności tarczycy.</span>{' '}
                Uregulowałam hormony po 5 latach nierównowagi. Wszystko dzięki stylowi życia i
                odpowiedniej diecie, nie dzięki farmacji.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          background: 'var(--lr-surface)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-10 md:mb-14">
            <span className="lr-eyebrow">Linia czasu · 4 punkty</span>
            <h2 className="mt-6" style={{ maxWidth: '22ch' }}>
              Co{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                doprowadziło
              </span>{' '}
              mnie tutaj.
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: 'var(--lr-rule)' }}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {milestones.map((m, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                style={{
                  background: 'var(--lr-bg)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                }}
              >
                <span
                  className="lr-mono"
                  style={{ color: 'var(--lr-accent)', fontSize: '0.6875rem' }}
                >
                  // {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 mb-5">{m.title}</h3>
                <p style={{ fontSize: '0.9375rem' }}>{m.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-10 md:mb-14">
            <span className="lr-eyebrow">Filary · 6 zasad</span>
            <h2 className="mt-6" style={{ maxWidth: '20ch' }}>
              Czym się{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                kieruję.
              </span>
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'var(--lr-rule)' }}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.article
                  key={i}
                  variants={fadeUp}
                  style={{
                    background: 'var(--lr-bg)',
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  }}
                >
                  <Icon size={22} strokeWidth={1.4} style={{ color: 'var(--lr-rose)' }} />
                  <h3 className="mt-6 mb-3" style={{ fontSize: '1.125rem' }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem' }}>{v.description}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ForWhom */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          background: 'var(--lr-surface)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-10 md:mb-14">
            <span className="lr-eyebrow">Dla kogo to jest</span>
            <h2 className="mt-6" style={{ maxWidth: '22ch' }}>
              Piszę tu dla{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                ciebie.
              </span>
            </h2>
          </div>
          <motion.ul
            style={{ listStyle: 'none', padding: 0 }}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {forWhom.map((w, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid var(--lr-rule)',
                }}
              >
                <span
                  className="lr-mono"
                  style={{ color: 'var(--lr-accent)', fontSize: '0.75rem', minWidth: '2ch' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontSize: '0.95rem', margin: 0 }}>{w}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 0',
          borderTop: '1px solid var(--lr-rule)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 style={{ maxWidth: '20ch', margin: '0 auto' }}>
            Gotowa{' '}
            <span className="lr-rose" style={{ fontStyle: 'italic' }}>
              zacząć?
            </span>
          </h2>
          <p className="mt-6" style={{ maxWidth: '42ch', margin: '1.5rem auto 0' }}>
            Najlepszy start to Protokół #001. Bezpłatny PDF i 5 maili przez 2 tygodnie.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="/#newsletter" className="lr-cta-primary">
              Pobierz Protokół #001
              <span aria-hidden>→</span>
            </Link>
            <Link href="/kursy" className="lr-cta-ghost">
              Zobacz programy
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
