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
    <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-coastal-sm">

      {/* Protocol selector */}
      <div className="mb-6">
        <p className="text-sm font-medium text-coastal-slate mb-3">Wybierz protokół:</p>
        <div className="grid grid-cols-3 gap-3">
          {PROTOCOLS.map((p) => (
            <button
              key={p.label}
              onClick={() => setProtocol(p)}
              className={`p-4 rounded-2xl border text-center transition-all duration-200 ${
                protocol.label === p.label
                  ? 'border-coastal-gold/50 bg-coastal-gold/8 shadow-coastal-sm'
                  : 'border-border/40 hover:border-coastal-ocean/30'
              }`}
            >
              <div className="text-2xl font-heading font-bold text-coastal-slate">{p.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{p.fast}h post</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">{protocol.description}</p>
      </div>

      {/* First meal time */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-coastal-slate mb-2">
          Pierwsza godzina jedzenia:
        </label>
        <input
          type="time"
          value={firstMeal}
          onChange={(e) => setFirstMeal(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border/60 rounded-2xl text-2xl font-heading focus:outline-none focus:ring-2 focus:ring-coastal-gold/40 focus:border-coastal-gold/60 transition-all"
        />
      </div>

      {/* Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/40">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Pierwsza godzina jedzenia</div>
            <div className="text-2xl font-heading font-semibold text-coastal-slate">{firstMeal}</div>
          </div>
          <span className="text-2xl">🥗</span>
        </div>

        <div className="flex items-center justify-center py-1">
          <div className="flex-1 h-px bg-border/40" />
          <span className="mx-3 text-xs text-muted-foreground px-3 py-1 bg-secondary/10 rounded-full">
            okno żywieniowe: {protocol.eat}h
          </span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl border border-amber-200/60 bg-amber-50/40">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Ostatnia godzina jedzenia</div>
            <div className="text-2xl font-heading font-semibold text-coastal-slate">{lastMeal}</div>
          </div>
          <span className="text-2xl">🍽️</span>
        </div>

        <div className="flex items-center center py-1">
          <div className="flex-1 h-px bg-border/40" />
          <span className="mx-3 text-xs text-muted-foreground px-3 py-1 bg-secondary/10 rounded-full">
            post: {protocol.fast}h
          </span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl border border-indigo-200/60 bg-indigo-50/40">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Koniec postu (następny dzień)</div>
            <div className="text-2xl font-heading font-semibold text-coastal-slate">{firstMeal}</div>
          </div>
          <span className="text-2xl">☀️</span>
        </div>
      </div>

      {/* Visual timeline */}
      <div className="mt-6 p-4 bg-secondary/8 rounded-2xl">
        <div className="text-xs font-medium text-coastal-slate mb-2">Twój dzień:</div>
        <div className="flex rounded-xl overflow-hidden h-8">
          <div
            className="bg-emerald-400/60 flex items-center justify-center text-xs font-medium text-emerald-800"
            style={{ width: `${(protocol.eat / 24) * 100}%` }}
          >
            Jedzenie
          </div>
          <div
            className="bg-indigo-300/60 flex items-center justify-center text-xs font-medium text-indigo-800"
            style={{ width: `${(protocol.fast / 24) * 100}%` }}
          >
            Post
          </div>
        </div>
      </div>
    </div>
  )
}
