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

function formatTime12(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'po południu' : 'rano'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
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
      ? // given wake time, calculate bedtimes
        [6, 5, 4].map((cycles) => {
          const totalMin = cycles * SLEEP_CYCLE_MINUTES + FALL_ASLEEP_MINUTES
          const bedtime = subtractMinutes(time, totalMin)
          return { cycles, time: bedtime, label: CYCLE_LABELS[cycles] }
        })
      : // given bedtime, calculate wake times
        [4, 5, 6].map((cycles) => {
          const totalMin = cycles * SLEEP_CYCLE_MINUTES + FALL_ASLEEP_MINUTES
          const wakeTime = addMinutes(time, totalMin)
          return { cycles, time: wakeTime, label: CYCLE_LABELS[cycles] }
        })

  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-coastal-sm">

      {/* Mode toggle */}
      <div className="flex rounded-2xl bg-secondary/10 p-1 mb-6 gap-1">
        <button
          onClick={() => setMode('wake')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
            mode === 'wake' ? 'bg-white shadow-coastal-sm text-coastal-slate' : 'text-muted-foreground hover:text-coastal-slate'
          }`}
        >
          Kiedy wstać?
        </button>
        <button
          onClick={() => setMode('sleep')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
            mode === 'sleep' ? 'bg-white shadow-coastal-sm text-coastal-slate' : 'text-muted-foreground hover:text-coastal-slate'
          }`}
        >
          Kiedy zasnąć?
        </button>
      </div>

      {/* Time input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-coastal-slate mb-2">
          {mode === 'wake' ? 'Godzina pobudki:' : 'Planuję zasnąć o:'}
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border/60 rounded-2xl text-2xl font-heading focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all"
        />
        {mode === 'sleep' && (
          <p className="text-xs text-muted-foreground mt-2">
            Uwzględnia ~14 minut na zaśnięcie
          </p>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-coastal-slate mb-3">
          {mode === 'wake' ? 'Idealne godziny zasypiania:' : 'Idealne godziny budzenia:'}
        </p>
        {results.map(({ cycles, time: resultTime, label }) => (
          <div
            key={cycles}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              cycles === 5
                ? 'border-coastal-gold/40 bg-coastal-gold/5 shadow-coastal-sm'
                : 'border-border/40 bg-secondary/5'
            }`}
          >
            <div>
              <span className="text-2xl font-heading font-semibold text-coastal-slate">
                {resultTime}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                ({formatTime12(resultTime)})
              </span>
              {label && (
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  cycles === 5 ? 'bg-coastal-gold/15 text-coastal-gold font-medium' : 'bg-secondary/15 text-muted-foreground'
                }`}>
                  {label}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-coastal-slate">{cycles} cykle</div>
              <div className="text-xs text-muted-foreground">
                {mode === 'wake'
                  ? getDuration(resultTime, time)
                  : getDuration(time, resultTime)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary/8 rounded-2xl">
        <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
          Kalkulator zakłada 90-minutowe cykle snu i ~14 minut na zaśnięcie.
          Wyniki są orientacyjne – indywidualne cykle mogą trwać 80-110 minut.
        </p>
      </div>
    </div>
  )
}
