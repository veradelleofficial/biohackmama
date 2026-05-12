'use client'

import { useState } from 'react'

const PHASES = [
  {
    name: 'Menstruacja',
    days: [1, 2, 3, 4, 5],
    emoji: '🔴',
    color: 'border-rose-200 bg-rose-50/60',
    accent: 'text-rose-600',
    tagColor: 'bg-rose-100 text-rose-700',
    hormones: 'Estrogen i progesteron na dnie',
    energy: 'Niska',
    supplements: [
      { name: 'Żelazo (bisglicynian)', dose: '18-25mg', reason: 'Uzupełnienie utrat podczas krwawienia' },
      { name: 'Magnez (bisglicynian)', dose: '300-400mg', reason: 'Redukuje skurcze i ból' },
      { name: 'Witamina C', dose: '500mg', reason: 'Wchłanianie żelaza, wsparcie odporności' },
      { name: 'Omega-3 (EPA/DHA)', dose: '2-3g', reason: 'Działanie przeciwzapalne' },
    ],
    avoid: 'Unikaj: kofeiny (nasila skurcze), alkoholu, nadmiaru cukru',
  },
  {
    name: 'Faza folikularna',
    days: [6, 7, 8, 9, 10, 11, 12, 13],
    emoji: '🌱',
    color: 'border-emerald-200 bg-emerald-50/60',
    accent: 'text-emerald-600',
    tagColor: 'bg-emerald-100 text-emerald-700',
    hormones: 'Estrogen rośnie',
    energy: 'Wysoka, rosnąca',
    supplements: [
      { name: 'Witamina D3+K2', dose: '2000-4000 IU D3', reason: 'Regulacja estrogenów, zdrowie kości' },
      { name: 'B-kompleks (aktywny)', dose: '1 kaps. rano', reason: 'Energia, metabolizm estrogenów' },
      { name: 'Cynk', dose: '15-25mg', reason: 'Wsparcie folikulogenezy' },
      { name: 'Probiotyk (Lactobacillus)', dose: '10 mld CFU', reason: 'Mikrobiom jelitowy i estrogenowy' },
    ],
    avoid: 'Idealny czas na nowe suplementy i detoks wątrobowy',
  },
  {
    name: 'Owulacja',
    days: [14, 15, 16],
    emoji: '✨',
    color: 'border-amber-200 bg-amber-50/60',
    accent: 'text-amber-600',
    tagColor: 'bg-amber-100 text-amber-700',
    hormones: 'Szczyt estrogenów, LH surge',
    energy: 'Najwyższa',
    supplements: [
      { name: 'Witamina E', dose: '200-400 IU', reason: 'Wsparcie owulacji i płodności' },
      { name: 'Koenzym Q10', dose: '100-200mg', reason: 'Jakość komórek jajowych, energia' },
      { name: 'Selen', dose: '50-100mcg', reason: 'Tarczyca i płodność' },
      { name: 'Kwas foliowy (metylowany)', dose: '400-800mcg', reason: 'Jeśli planujesz ciążę' },
    ],
    avoid: 'Unikaj: intensywnego detoksu w tym czasie',
  },
  {
    name: 'Faza lutealna',
    days: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    emoji: '🌙',
    color: 'border-indigo-200 bg-indigo-50/60',
    accent: 'text-indigo-600',
    tagColor: 'bg-indigo-100 text-indigo-700',
    hormones: 'Progesteron dominuje',
    energy: 'Spada ku końcowi fazy',
    supplements: [
      { name: 'Magnez (bisglicynian)', dose: '300-400mg wieczorem', reason: 'Sen, redukuje PMS i retencję wody' },
      { name: 'Witamina B6 (P5P)', dose: '50-100mg', reason: 'Synteza progesteronu, nastrój' },
      { name: 'Ashwagandha KSM-66', dose: '300-600mg', reason: 'Kortyzol, stres, równowaga hormonalna' },
      { name: 'Wapń (cytrynian)', dose: '500-600mg', reason: 'Redukcja PMS i skurczów' },
    ],
    avoid: 'Unikaj: kofeiny po 14:00, alkoholu, dużej ilości soi',
  },
]

function getPhase(day: number) {
  return PHASES.find((p) => p.days.includes(day)) || null
}

export default function CycleTracker() {
  const [cycleDay, setCycleDay] = useState(8)
  const phase = getPhase(cycleDay)

  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-coastal-sm">

      {/* Day selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-coastal-slate mb-2">
          Dzień cyklu: <span className="text-coastal-gold font-bold">{cycleDay}</span>
        </label>
        <input
          type="range"
          min={1}
          max={28}
          value={cycleDay}
          onChange={(e) => setCycleDay(Number(e.target.value))}
          className="w-full accent-coastal-gold"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Dzień 1</span>
          <span>Dzień 14</span>
          <span>Dzień 28</span>
        </div>
      </div>

      {/* Phase indicator */}
      <div className="grid grid-cols-4 gap-1 mb-8">
        {PHASES.map((p) => (
          <button
            key={p.name}
            onClick={() => setCycleDay(p.days[Math.floor(p.days.length / 2)])}
            className={`p-2 rounded-xl text-center transition-all duration-200 border ${
              phase?.name === p.name
                ? p.color + ' border-opacity-60 shadow-sm'
                : 'border-border/20 hover:border-border/40'
            }`}
          >
            <div className="text-lg">{p.emoji}</div>
            <div className="text-xs font-medium mt-1 text-coastal-slate leading-tight">{p.name}</div>
            <div className="text-xs text-muted-foreground">d.{p.days[0]}-{p.days[p.days.length - 1]}</div>
          </button>
        ))}
      </div>

      {phase && (
        <div className={`p-5 rounded-2xl border ${phase.color} mb-6`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{phase.emoji}</span>
            <div>
              <h2 className={`font-heading font-semibold text-xl ${phase.accent}`}>{phase.name}</h2>
              <p className="text-xs text-muted-foreground">{phase.hormones} · Energia: {phase.energy}</p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-coastal-slate mb-3">Rekomendowana suplementacja:</h3>
          <div className="space-y-2 mb-4">
            {phase.supplements.map((s) => (
              <div key={s.name} className="p-3 bg-white/70 rounded-xl">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-sm text-coastal-slate">{s.name}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${phase.tagColor}`}>
                      {s.dose}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{s.reason}</p>
              </div>
            ))}
          </div>

          {phase.avoid && (
            <div className="p-3 bg-white/50 rounded-xl">
              <p className="text-xs font-light" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>{phase.avoid}</p>
            </div>
          )}
        </div>
      )}

      <div className="p-4 bg-secondary/8 rounded-2xl">
        <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
          Protokoły suplementacyjne są orientacyjne. Dawkowanie dostosuj do masy ciała
          i indywidualnych potrzeb. Zawsze sprawdzaj interakcje z lekami.
        </p>
      </div>
    </div>
  )
}
