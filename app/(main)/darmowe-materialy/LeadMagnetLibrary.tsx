'use client'

import PageHeader from '@/components/lab-rose/PageHeader'
import LeadMagnetCard, { type LeadMagnet } from '@/components/lab-rose/LeadMagnetCard'
import RemainingMaterialsSection from '@/components/lab-rose/RemainingMaterialsSection'

const materials: LeadMagnet[] = [
  {
    slug: 'marki-sportowe-bez-poliestru',
    title: 'Sport bez poliestru',
    desc: 'Marki ubrań sportowych z bawełny organicznej, wełny merino lub innych alternatyw lepszych niż poliester.',
    format: 'Lista',
    img: '/images/mat-sport-bez-poliestru.jpg',
    accent: '#B5C99A',
    phBg: 'linear-gradient(135deg, #0d1409, #1f2d11)',
    twoStep: true,
  },
  {
    slug: 'usun-bisfenole-z-organizmu',
    title: 'Usun bisfenole z organizmu',
    desc: 'Gdzie się kryją bisfenole, jak je wyeliminować z domu i ciała. Krok po kroku do mniejszej chemii.',
    format: 'Przewodnik',
    img: '/images/mat-bisfenole.jpg',
    accent: '#E8AEBD',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
    twoStep: true,
    source: 'lead:usun-bisfenole-z-organizmu',
  },
  {
    slug: 'poranny-protokol',
    title: 'Poranny Protokół Mamy',
    desc: '7 kroków, 8 minut, mierzalna różnica w 14 dni. PDF z protokołem i checklistą do druku.',
    format: 'PDF',
    img: '/images/mat-poranny-protokol.jpg',
    accent: '#C9F24F',
    phBg: 'linear-gradient(135deg, #14180a, #2c3d11)',
    source: 'lead:pozostale-darmowe-materialy',
  },
  {
    slug: 'lista-zbednikow',
    title: 'Lista zbędników z drogerii',
    desc: '12 produktów z chemią, które warto wyrzucić, i czym je zastąpić. Low-tox start w jeden wieczór.',
    format: 'Checklist',
    img: '/images/mat-lista-zbednikow.jpg',
    accent: '#E8AEBD',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
    source: 'lead:pozostale-darmowe-materialy',
  },
  {
    slug: 'dziennik-snu',
    title: 'Dziennik snu - 14 dni',
    desc: 'Prosty tracker do śledzenia jakości snu, energii i nawyków. Zobacz wzorce, zanim zmienisz cokolwiek.',
    format: 'PDF',
    img: '/images/mat-dziennik-snu.jpg',
    accent: '#4cc9f0',
    phBg: 'linear-gradient(135deg, #09131a, #112a3d)',
    source: 'lead:pozostale-darmowe-materialy',
  },
  {
    slug: 'audyt-sypialni-dziecka',
    title: 'Audyt sypialni dziecka',
    desc: 'Checklista czystego, bezpiecznego snu malucha: światło, powietrze, materiały, EMF. Punkt po punkcie.',
    format: 'Checklist',
    img: '/images/mat-audyt-sypialni.jpg?v=2',
    accent: '#9be35a',
    phBg: 'linear-gradient(135deg, #111a09, #253d11)',
    source: 'lead:pozostale-darmowe-materialy',
  },
  {
    slug: 'cykl-w-praktyce',
    title: 'Cykl w praktyce',
    desc: 'Co jeść, kiedy trenować i jak się regenerować w każdej fazie cyklu. Ściąga na lodówkę.',
    format: 'PDF',
    img: '/images/mat-cykl-w-praktyce.jpg',
    accent: '#E8AEBD',
    phBg: 'linear-gradient(135deg, #1a0d12, #3d1122)',
    source: 'lead:pozostale-darmowe-materialy',
  },
  {
    slug: 'suplementacja-bez-bzdur',
    title: 'Suplementacja bez bzdur',
    desc: 'Czy naprawdę musimy tyle suplementować? Naturalna suplementacja, suplementy must-have i konkretne marki z czystym składem. Jakie polecam, a jakich unikać.',
    format: 'eBook',
    img: '/images/mat-suplementacja.jpg',
    accent: '#45d6c4',
    phBg: 'linear-gradient(135deg, #09181a, #11383d)',
    source: 'lead:pozostale-darmowe-materialy',
  },
]


export default function LeadMagnetLibrary() {
  const sportBezPoliestru = materials.find((m) => m.slug === 'marki-sportowe-bez-poliestru')!
  const usunBisfenole = materials.find((m) => m.slug === 'usun-bisfenole-z-organizmu')!

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

      {/* Sport bez poliestru + Usun bisfenole — featured */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3rem) 0 clamp(4rem, 9vw, 8rem)' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-8">
            <span className="lr-eyebrow">// MATERIAŁY GŁÓWNE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '700px' }}>
            <LeadMagnetCard key={sportBezPoliestru.slug} m={sportBezPoliestru} />
            <LeadMagnetCard key={usunBisfenole.slug} m={usunBisfenole} />
          </div>
        </div>
      </section>

      {/* Pozostałe 6 materiałów — one form */}
      <RemainingMaterialsSection />
    </main>
  )
}
