'use client'

import Link from 'next/link'
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="lab-rose"
      style={{
        background: 'var(--lr-bg)',
        borderTop: '1px solid var(--lr-rule)',
        color: 'var(--lr-ink)',
      }}
    >
      <div
        className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16"
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
                maxWidth: '20ch',
              }}
            >
              Naukowy biohacking
              <br />
              dla kobiet i rodzin.{' '}
              <span className="lr-rose" style={{ fontStyle: 'italic' }}>
                Vera Delle.
              </span>
            </h3>
            <p
              className="mt-6"
              style={{ fontSize: '0.875rem', maxWidth: '40ch', color: 'var(--lr-ink-soft)' }}
            >
              Mierzone protokoły. Recenzowane źródła. Bez ezoteryki i bez supplementacji za 800 zł
              miesięcznie.
            </p>
          </div>

          <div className="md:col-span-2">
            <span
              className="lr-mono"
              style={{ fontSize: '0.625rem', color: 'var(--lr-ink-dim)', letterSpacing: '0.22em' }}
            >
              PROGRAMY
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
            <p
              className="lr-mono mt-6"
              style={{
                fontSize: '0.625rem',
                color: 'var(--lr-ink-dim)',
                letterSpacing: '0.18em',
                lineHeight: 1.8,
              }}
            >
              contact@biohackmama.pl
              <br />
              Wrocław · Polska
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--lr-rule)',
          }}
        >
          <p
            className="lr-mono"
            style={{
              fontSize: '0.625rem',
              color: 'var(--lr-ink-dim)',
              letterSpacing: '0.22em',
            }}
          >
            © {currentYear} BIOHACKMAMA · SOOCIALY SP. Z O.O.
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--lr-ink-dim)',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            <span className="lr-script lr-rose" style={{ fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '0.35rem' }}>
              ♡
            </span>
            zrobione w trybie deep work
          </p>
        </div>
      </div>
    </footer>
  )
}
