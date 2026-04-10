'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useUser()

  const navLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/kursy', label: 'Kursy' },
    { href: '/ebooki', label: 'Ebooki' },
    { href: '/o-mnie', label: 'O mnie' },
    { href: '/kontakt', label: 'Kontakt' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-coastal-sand/80 backdrop-blur-md border-b border-border/50 shadow-header">
        <div className="container flex items-center justify-between h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.webp"
              alt="BioHackMama"
              width={320}
              height={80}
              className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-coastal-slate hover:text-coastal-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth & Mobile Button */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-block px-4 py-2 text-xs bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-all duration-300 text-cta"
                >
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden sm:inline-block px-4 py-2 text-xs border border-coastal-ocean/30 text-coastal-slate rounded-2xl hover:bg-secondary/10 transition-all duration-300 text-cta"
                >
                  Zaloguj
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden sm:inline-block px-4 py-2 text-xs bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-all duration-300 text-cta"
                >
                  Zarejestruj
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-coastal-slate"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 bg-coastal-sand/95 backdrop-blur-md">
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-coastal-slate hover:text-coastal-gold transition-colors duration-300 py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-border/50" />
              {!user && (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-center border border-coastal-ocean/30 text-coastal-slate rounded-2xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    Zaloguj
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 text-center bg-coastal-gold text-white rounded-2xl"
                    onClick={() => setMobileOpen(false)}
                  >
                    Zarejestruj
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
