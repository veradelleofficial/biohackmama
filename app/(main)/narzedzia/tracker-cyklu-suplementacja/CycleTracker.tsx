'use client'

import { useState } from 'react'

const PHASES = [
  {
    name: 'Menstruacja',
    short: 'Menstr.',
    days: [1, 2, 3, 4, 5],
    glyph: '01',
    hormones: 'Estrogen i progesteron na dnie',
    energy: 'Niska',
    accent: 'rose',
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
    short: 'Folik.',
    days: [6, 7, 8, 9, 10, 11, 12, 13],
    glyph: '02',
    hormones: 'Estrogen rośnie',
    energy: 'Wysoka, rosnąca',
    accent: 'lime',
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
    short: 'Owul.',
    days: [14, 15, 16],
    glyph: '03',
    hormones: 'Szczyt estrogenów, LH surge',
    energy: 'Najwyższa',
    accent: 'lime',
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
    short: 'Lutealna',
    days: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    glyph: '04',
    hormones: 'Progesteron dominuje',
    energy: 'Spada ku końcowi fazy',
    accent: 'rose',
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

function getAccentColor(accent: string) {
  return accent === 'lime' ? 'var(--lr-accent)' : 'var(--lr-rose)'
}

export default function CycleTracker() {
  const [cycleDay, setCycleDay] = useState(8)
  const phase = getPhase(cycleDay)
  const accentColor = phase ? getAccentColor(phase.accent) : 'var(--lr-accent)'

  return (
    <div
      className="lr-tool-panel"
      style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}
    >
      {/* Day selector */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <label
            className="lr-mono"
            style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
          >
            DZIEŃ CYKLU
          </label>
          <span
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: '2.5rem',
              color: accentColor,
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {cycleDay}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={28}
          value={cycleDay}
          onChange={(e) => setCycleDay(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: accentColor,
            cursor: 'pointer',
          }}
        />
        <div
          className="lr-mono flex justify-between mt-2"
          style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.18em' }}
        >
          <span>D.01</span>
          <span>D.14</span>
          <span>D.28</span>
        </div>
      </div>

      {/* Phase tabs */}
      <div
        className="grid grid-cols-4 gap-px mb-8"
        style={{ background: 'var(--lr-rule)', border: '1px solid var(--lr-rule)' }}
      >
        {PHASES.map((p) => {
          const isActive = phase?.name === p.name
          const c = getAccentColor(p.accent)
          return (
            <button
              key={p.name}
              onClick={() => setCycleDay(p.days[Math.floor(p.days.length / 2)])}
              style={{
                padding: '1rem 0.5rem',
                background: isActive ? 'var(--lr-bg)' : 'var(--lr-surface)',
                border: 'none',
                borderTop: isActive ? `2px solid ${c}` : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 200ms var(--ease-out-strong)',
              }}
            >
              <div
                className="lr-mono"
                style={{
                  fontSize: '0.5625rem',
                  color: isActive ? c : 'var(--lr-ink-dim)',
                  letterSpacing: '0.22em',
                  marginBottom: '0.35rem',
                }}
              >
                · {p.glyph}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: '0.875rem',
                  color: isActive ? 'var(--lr-ink)' : 'var(--lr-ink-soft)',
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {p.short}
              </div>
              <div
                className="lr-mono"
                style={{
                  fontSize: '0.5rem',
                  color: 'var(--lr-ink-dim)',
                  letterSpacing: '0.18em',
                  marginTop: '0.25rem',
                }}
              >
                D.{p.days[0]}–{p.days[p.days.length - 1]}
              </div>
            </button>
          )
        })}
      </div>

      {phase && (
        <div
          style={{
            background: 'var(--lr-bg)',
            border: '1px solid var(--lr-rule)',
            borderLeft: `3px solid ${accentColor}`,
            padding: '1.5rem',
          }}
        >
          <div className="mb-6">
            <span
              className="lr-mono"
              style={{ fontSize: '0.625rem', color: accentColor, letterSpacing: '0.22em' }}
            >
              FAZA · {phase.glyph}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: '1.5rem',
                color: 'var(--lr-ink)',
                fontWeight: 400,
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              {phase.name}
            </h3>
            <p
              className="lr-mono"
              style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.18em' }}
            >
              {phase.hormones.toUpperCase()} · ENERGIA: {phase.energy.toUpperCase()}
            </p>
          </div>

          <span className="lr-eyebrow">Rekomendowana suplementacja</span>
          <div className="space-y-2 mt-4">
            {phase.supplements.map((s, i) => (
              <div
                key={s.name}
                style={{
                  padding: '1rem',
                  background: 'var(--lr-surface)',
                  border: '1px solid var(--lr-rule)',
                }}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      className="lr-mono"
                      style={{
                        fontSize: '0.625rem',
                        color: 'var(--lr-ink-dim)',
                        letterSpacing: '0.22em',
                        marginRight: '0.5rem',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-fraunces), serif',
                        fontSize: '1rem',
                        color: 'var(--lr-ink)',
                        fontWeight: 400,
                      }}
                    >
                      {s.name}
                    </span>
                  </div>
                  <span
                    className="lr-mono"
                    style={{
                      fontSize: '0.625rem',
                      color: accentColor,
                      letterSpacing: '0.18em',
                      border: '1px solid var(--lr-rule-strong)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                    }}
                  >
                    {s.dose}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--lr-ink-soft)',
                    marginTop: '0.5rem',
                    paddingLeft: '2.25rem',
                  }}
                >
                  {s.reason}
                </p>
              </div>
            ))}
          </div>

          {phase.avoid && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.875rem 1rem',
                background: 'var(--lr-surface)',
                border: '1px solid var(--lr-rule)',
                borderLeft: '2px solid var(--lr-rose)',
              }}
            >
              <p style={{ fontSize: '0.8125rem', color: 'var(--lr-ink-soft)', margin: 0 }}>
                {phase.avoid}
              </p>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem 1.25rem',
          background: 'var(--lr-bg)',
          border: '1px solid var(--lr-rule)',
        }}
      >
        <p
          className="lr-mono"
          style={{
            fontSize: '0.625rem',
            color: 'var(--lr-ink-dim)',
            letterSpacing: '0.18em',
            lineHeight: 1.7,
          }}
        >
          DAWKOWANIE DOSTOSUJ DO MASY CIAŁA I INDYWIDUALNYCH POTRZEB. SPRAWDŹ INTERAKCJE Z LEKAMI.
        </p>
      </div>
    </div>
  )
}
