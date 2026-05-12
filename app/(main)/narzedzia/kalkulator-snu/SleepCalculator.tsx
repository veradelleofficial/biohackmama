'use client'

import { useState } from 'react'

const SLEEP_CYCLE_MINUTES = 90
const FALL_ASLEEP_MINUTES = 14

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  const newH = Math.floor(total / 60) % 24
  const newM = total % 60
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`
}

function subtractMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  let total = h * 60 + m - minutes
  if (total < 0) total += 24 * 60
  const newH = Math.floor(total / 60) % 24
  const newM = total % 60
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`
}

function getDuration(sleep: string, wake: string): string {
  const [sh, sm] = sleep.split(':').map(Number)
  const [wh, wm] = wake.split(':').map(Number)
  let totalSleep = wh * 60 + wm - (sh * 60 + sm)
  if (totalSleep < 0) totalSleep += 24 * 60
  const h = Math.floor(totalSleep / 60)
  const m = totalSleep % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

const CYCLE_LABELS: Record<number, string> = {
  4: 'minimalne',
  5: 'optymalne',
  6: 'idealne',
}

export default function SleepCalculator() {
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake')
  const [time, setTime] = useState('07:00')

  const results =
    mode === 'wake'
      ? [6, 5, 4].map((cycles) => {
          const totalMin = cycles * SLEEP_CYCLE_MINUTES + FALL_ASLEEP_MINUTES
          return { cycles, time: subtractMinutes(time, totalMin), label: CYCLE_LABELS[cycles] }
        })
      : [4, 5, 6].map((cycles) => {
          const totalMin = cycles * SLEEP_CYCLE_MINUTES + FALL_ASLEEP_MINUTES
          return { cycles, time: addMinutes(time, totalMin), label: CYCLE_LABELS[cycles] }
        })

  return (
    <div
      className="lr-tool-panel"
      style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}
    >
      {/* Mode toggle */}
      <div
        className="grid grid-cols-2 gap-px mb-8"
        style={{ background: 'var(--lr-rule)', border: '1px solid var(--lr-rule)' }}
      >
        <button
          onClick={() => setMode('wake')}
          className="lr-mono"
          style={{
            padding: '0.875rem 1rem',
            background: mode === 'wake' ? 'var(--lr-bg)' : 'var(--lr-surface)',
            color: mode === 'wake' ? 'var(--lr-accent)' : 'var(--lr-ink-soft)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            transition: 'all 200ms var(--ease-out-strong)',
            borderTop: mode === 'wake' ? '2px solid var(--lr-accent)' : '2px solid transparent',
          }}
        >
          Kiedy wstać?
        </button>
        <button
          onClick={() => setMode('sleep')}
          className="lr-mono"
          style={{
            padding: '0.875rem 1rem',
            background: mode === 'sleep' ? 'var(--lr-bg)' : 'var(--lr-surface)',
            color: mode === 'sleep' ? 'var(--lr-accent)' : 'var(--lr-ink-soft)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            transition: 'all 200ms var(--ease-out-strong)',
            borderTop: mode === 'sleep' ? '2px solid var(--lr-accent)' : '2px solid transparent',
          }}
        >
          Kiedy zasnąć?
        </button>
      </div>

      {/* Time input */}
      <div className="mb-8">
        <label
          className="lr-mono block mb-3"
          style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
        >
          {mode === 'wake' ? 'GODZINA POBUDKI' : 'PLANUJĘ ZASNĄĆ O'}
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
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
        {mode === 'sleep' && (
          <p
            className="lr-mono mt-3"
            style={{
              fontSize: '0.625rem',
              color: 'var(--lr-ink-dim)',
              letterSpacing: '0.18em',
            }}
          >
            UWZGLĘDNIA ~ 14 MIN NA ZAŚNIĘCIE
          </p>
        )}
      </div>

      {/* Results */}
      <div>
        <p
          className="lr-mono mb-4"
          style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
        >
          {mode === 'wake' ? 'IDEALNE GODZINY ZASYPIANIA' : 'IDEALNE GODZINY BUDZENIA'}
        </p>
        <div className="space-y-2">
          {results.map(({ cycles, time: resultTime, label }) => {
            const isOptimal = cycles === 5
            return (
              <div
                key={cycles}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.25rem',
                  background: 'var(--lr-bg)',
                  border: '1px solid',
                  borderColor: isOptimal ? 'var(--lr-accent)' : 'var(--lr-rule)',
                  borderLeft: isOptimal ? '3px solid var(--lr-accent)' : '1px solid var(--lr-rule)',
                  transition: 'all 200ms var(--ease-out-strong)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-fraunces), serif',
                      fontSize: '1.75rem',
                      color: isOptimal ? 'var(--lr-accent)' : 'var(--lr-ink)',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {resultTime}
                  </span>
                  {label && (
                    <span
                      className="lr-mono ml-3"
                      style={{
                        fontSize: '0.5625rem',
                        color: isOptimal ? 'var(--lr-accent)' : 'var(--lr-ink-dim)',
                        letterSpacing: '0.22em',
                      }}
                    >
                      · {label.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div
                    className="lr-mono"
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--lr-ink)',
                      letterSpacing: '0.18em',
                    }}
                  >
                    {cycles} CYKLI
                  </div>
                  <div
                    className="lr-mono"
                    style={{
                      fontSize: '0.5625rem',
                      color: 'var(--lr-ink-dim)',
                      letterSpacing: '0.16em',
                      marginTop: '0.15rem',
                    }}
                  >
                    {(mode === 'wake'
                      ? getDuration(resultTime, time)
                      : getDuration(time, resultTime)
                    ).toUpperCase()}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: '2rem',
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
          KALKULATOR ZAKŁADA 90-MINUTOWE CYKLE I ~14 MIN NA ZAŚNIĘCIE. WYNIKI ORIENTACYJNE.
        </p>
      </div>
    </div>
  )
}
