'use client'

import { useState } from 'react'

const PROTOCOLS = [
  { label: '12:12', fast: 12, eat: 12, description: 'Łagodny start. Idealny w fazie lutealnej.' },
  { label: '14:10', fast: 14, eat: 10, description: 'Balans hormonalny. Polecany dla kobiet.' },
  { label: '16:8', fast: 16, eat: 8, description: 'Klasyczny IF. Tylko w fazie folikularnej.' },
]

function addHours(time: string, hours: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = (h + hours) % 24
  return `${String(total).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export default function IFCalculator() {
  const [protocol, setProtocol] = useState(PROTOCOLS[1])
  const [firstMeal, setFirstMeal] = useState('08:00')

  const lastMeal = addHours(firstMeal, protocol.eat)

  return (
    <div
      className="lr-tool-panel"
      style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}
    >
      {/* Protocol selector */}
      <div className="mb-8">
        <p
          className="lr-mono mb-4"
          style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
        >
          WYBIERZ PROTOKÓŁ
        </p>
        <div className="grid grid-cols-3 gap-px" style={{ background: 'var(--lr-rule)', border: '1px solid var(--lr-rule)' }}>
          {PROTOCOLS.map((p) => {
            const isActive = protocol.label === p.label
            return (
              <button
                key={p.label}
                onClick={() => setProtocol(p)}
                style={{
                  padding: '1.25rem 0.75rem',
                  background: isActive ? 'var(--lr-bg)' : 'var(--lr-surface)',
                  border: 'none',
                  borderTop: isActive ? '2px solid var(--lr-accent)' : '2px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 200ms var(--ease-out-strong)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: '1.5rem',
                    color: isActive ? 'var(--lr-accent)' : 'var(--lr-ink)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {p.label}
                </div>
                <div
                  className="lr-mono"
                  style={{
                    fontSize: '0.5625rem',
                    color: 'var(--lr-ink-dim)',
                    letterSpacing: '0.18em',
                    marginTop: '0.25rem',
                  }}
                >
                  {p.fast}H POST
                </div>
              </button>
            )
          })}
        </div>
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--lr-ink-soft)',
            marginTop: '0.875rem',
            textAlign: 'center',
          }}
        >
          {protocol.description}
        </p>
      </div>

      {/* First meal time */}
      <div className="mb-8">
        <label
          className="lr-mono block mb-3"
          style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
        >
          PIERWSZA GODZINA JEDZENIA
        </label>
        <input
          type="time"
          value={firstMeal}
          onChange={(e) => setFirstMeal(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.25rem',
            background: 'var(--lr-bg)',
            border: '1px solid var(--lr-rule-strong)',
            color: 'var(--lr-ink)',
            fontFamily: 'var(--font-fraunces), serif',
            fontSize: '2rem',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            outline: 'none',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Results */}
      <div className="space-y-3">
        <ResultRow label="PIERWSZA GODZINA JEDZENIA" value={firstMeal} accent="rose" />

        <Divider label={`OKNO ŻYWIENIOWE: ${protocol.eat}H`} />

        <ResultRow label="OSTATNIA GODZINA JEDZENIA" value={lastMeal} accent="rose" />

        <Divider label={`POST: ${protocol.fast}H`} />

        <ResultRow label="KONIEC POSTU (NASTĘPNY DZIEŃ)" value={firstMeal} accent="lime" />
      </div>

      {/* Visual timeline */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: 'var(--lr-bg)',
          border: '1px solid var(--lr-rule)',
        }}
      >
        <div
          className="lr-mono mb-3"
          style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
        >
          TWÓJ DZIEŃ (24H)
        </div>
        <div className="flex h-9" style={{ border: '1px solid var(--lr-rule-strong)' }}>
          <div
            className="lr-mono"
            style={{
              width: `${(protocol.eat / 24) * 100}%`,
              background: 'rgba(232, 174, 189, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.5625rem',
              color: 'var(--lr-rose)',
              letterSpacing: '0.18em',
              borderRight: '1px solid var(--lr-rule-strong)',
            }}
          >
            JEDZENIE
          </div>
          <div
            className="lr-mono"
            style={{
              width: `${(protocol.fast / 24) * 100}%`,
              background: 'rgba(201, 242, 79, 0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.5625rem',
              color: 'var(--lr-accent)',
              letterSpacing: '0.18em',
            }}
          >
            POST
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultRow({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: 'lime' | 'rose'
}) {
  const color = accent === 'lime' ? 'var(--lr-accent)' : 'var(--lr-rose)'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem',
        background: 'var(--lr-bg)',
        border: '1px solid var(--lr-rule)',
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        className="lr-mono"
        style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontSize: '1.75rem',
          color: color,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3" style={{ padding: '0.5rem 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--lr-rule)' }} />
      <span
        className="lr-mono"
        style={{ fontSize: '0.5625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'var(--lr-rule)' }} />
    </div>
  )
}
