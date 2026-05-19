'use client'

import Link from 'next/link'
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="lab-rose relative overflow-hidden"
      style={{
        background: 'var(--lr-bg)',
        borderTop: '1px solid var(--lr-rule)',
        color: 'var(--lr-ink)',
      }}
    >
      {/* Ambient rotating DNA helix + infinity */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          width: 'min(900px, 90vw)',
          aspectRatio: '2 / 1',
          transform: 'translate(-50%, -50%)',
          opacity: 0.1,
          mixBlendMode: 'screen',
        }}
      >
        <svg
          className="lr-dna-bg"
          viewBox="-200 -100 400 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="lr-dna-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9F24F" stopOpacity="0.0" />
              <stop offset="20%" stopColor="#C9F24F" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F4EFE6" stopOpacity="1" />
              <stop offset="80%" stopColor="#E8AEBD" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E8AEBD" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Two interleaved figure-8 strands (DNA backbones) */}
          <path
            d="M -150,0 C -150,-90 -50,-90 0,0 C 50,90 150,90 150,0 C 150,-90 50,-90 0,0 C -50,90 -150,90 -150,0 Z"
            fill="none"
            stroke="url(#lr-dna-grad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M -150,0 C -150,90 -50,90 0,0 C 50,-90 150,-90 150,0 C 150,90 50,90 0,0 C -50,-90 -150,-90 -150,0 Z"
            fill="none"
            stroke="url(#lr-dna-grad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Nucleotide rungs across the figure-8 (vertical short strokes) */}
          {Array.from({ length: 24 }).map((_, i) => {
            const t = (i / 24) * Math.PI * 2
            const a = 130
            const denom = 1 + Math.sin(t) * Math.sin(t)
            const x = (a * Math.cos(t)) / denom
            const y = (a * Math.sin(t) * Math.cos(t)) / denom
            const len = 16 - Math.abs(Math.sin(t * 2)) * 6
            return (
              <line
                key={i}
                x1={x}
                y1={y - len / 2}
                x2={x}
                y2={y + len / 2}
                stroke="#C9F24F"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity={0.55 + 0.35 * Math.cos(t * 3)}
              />
            )
          })}
        </svg>
      </div>

      <div
        className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative"
        style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem clamp(2rem, 4vw, 3rem)' }}
      >
        {/* Top — brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <span className="lr-eyebrow">BioHackMama · est. 2026</span>
            <h3
              className="mt-6"
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                lineHeight: 1.15,
                fontWeight: 400,
                maxWidth: '24ch',
              }}
            >
              Nauka o długowieczności i codziennej optymalizacji zdrowia{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                dla każdego.
              </span>
            </h3>
            <p
              className="mt-6"
              style={{ fontSize: '0.875rem', maxWidth: '44ch', color: 'var(--lr-ink-soft)' }}
            >
              Biohacking i wellness przy użyciu darmowych, naturalnych metod oraz gadżetów
              poprawiających jakość i długość życia.
            </p>
          </div>

          <div className="md:col-span-2">
            <span
              className="lr-mono"
              style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
            >
              DLA CIEBIE
            </span>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.25rem' }}>
              {[
                { href: '/kursy', label: 'Programy' },
                { href: '/ebooki', label: 'Biblioteka' },
                { href: '/premium', label: 'Premium' },
              ].map((l) => (
                <li key={l.href} style={{ marginBottom: '0.65rem' }}>
                  <Link
                    href={l.href}
                    className="lr-footer-link"
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.875rem',
                      color: 'var(--lr-ink)',
                      textDecoration: 'none',
                      transition: 'color 200ms var(--ease-out-strong)',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <span
              className="lr-mono"
              style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
            >
              STRONA
            </span>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.25rem' }}>
              {[
                { href: '/blog', label: 'Artykuły' },
                { href: '/o-mnie', label: 'O mnie' },
                { href: '/kontakt', label: 'Kontakt' },
                { href: '/narzedzia', label: 'Narzędzia' },
                { href: '/polityka-prywatnosci', label: 'Prywatność' },
                { href: '/regulamin', label: 'Regulamin' },
              ].map((l) => (
                <li key={l.href} style={{ marginBottom: '0.65rem' }}>
                  <Link
                    href={l.href}
                    className="lr-footer-link"
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.875rem',
                      color: 'var(--lr-ink)',
                      textDecoration: 'none',
                      transition: 'color 200ms var(--ease-out-strong)',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span
              className="lr-mono"
              style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
            >
              KONTAKT · KANAŁY
            </span>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/biohackmama.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="lr-footer-icon"
                aria-label="Instagram @biohackmama.pl"
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--lr-rule-strong)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lr-ink)',
                  transition: 'border-color 200ms var(--ease-out-strong), color 200ms var(--ease-out-strong)',
                }}
              >
                <Instagram size={16} strokeWidth={1.6} />
              </a>
              <a
                href="https://instagram.com/veradelleofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="lr-footer-icon"
                aria-label="Instagram @veradelleofficial"
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--lr-rule-strong)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lr-ink)',
                  transition: 'border-color 200ms var(--ease-out-strong), color 200ms var(--ease-out-strong)',
                }}
              >
                <Instagram size={16} strokeWidth={1.6} />
              </a>
              <a
                href="#"
                className="lr-footer-icon"
                aria-label="Facebook"
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--lr-rule-strong)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lr-ink)',
                  transition: 'border-color 200ms var(--ease-out-strong), color 200ms var(--ease-out-strong)',
                }}
              >
                <Facebook size={16} strokeWidth={1.6} />
              </a>
              <a
                href="#"
                className="lr-footer-icon"
                aria-label="YouTube"
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--lr-rule-strong)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lr-ink)',
                  transition: 'border-color 200ms var(--ease-out-strong), color 200ms var(--ease-out-strong)',
                }}
              >
                <Youtube size={16} strokeWidth={1.6} />
              </a>
              <a
                href="mailto:contact@biohackmama.pl"
                className="lr-footer-icon"
                aria-label="Email"
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid var(--lr-rule-strong)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lr-ink)',
                  transition: 'border-color 200ms var(--ease-out-strong), color 200ms var(--ease-out-strong)',
                }}
              >
                <Mail size={16} strokeWidth={1.6} />
              </a>
            </div>
            <a
              href="mailto:contact@biohackmama.pl"
              className="mt-6 inline-block"
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '0.9375rem',
                color: 'var(--lr-accent)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201, 242, 79, 0.4)',
                paddingBottom: '2px',
                transition: 'color 200ms var(--ease-out-strong), border-color 200ms var(--ease-out-strong)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#D4FF3D'
                e.currentTarget.style.borderBottomColor = '#D4FF3D'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--lr-accent)'
                e.currentTarget.style.borderBottomColor = 'rgba(201, 242, 79, 0.4)'
              }}
            >
              contact@biohackmama.pl
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
