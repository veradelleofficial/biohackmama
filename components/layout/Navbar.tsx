'use client'

import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, User } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useUser()
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  const navLinks: { href: string; label: string; short?: string }[] = [
    { href: '/blog', label: 'Artykuły' },
    { href: '/program', label: 'Program' },
    { href: '/ebooki', label: 'Biblioteka' },
    // short = etykieta w pasku na komputerze (pełna nazwa nie mieści się przy szerokim rozstawie liter)
    { href: '/darmowe-materialy', label: 'Darmowe materiały', short: 'Za darmo' },
    { href: '/o-mnie', label: 'O mnie' },
    { href: '/kontakt', label: 'Kontakt' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-coastal-sand/80 backdrop-blur-md border-b border-border/50">
        {/* Układ jak thestartupmom.com: logo | menu na środku | jeden przycisk (od 2026-11-26) */}
        <div className="container flex items-center justify-between gap-6 xl:gap-10 h-16 lg:h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="BioHackMama, strona główna">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="nav-link-underline whitespace-nowrap"
              >
                {link.short ?? link.label}
              </Link>
            ))}
          </div>

          {/* Search, Cart, Auth & Mobile Button */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5">
            {/* Search */}
            <Link
              href="/szukaj"
              className="bhm-nav-icon"
              aria-label="Szukaj"
            >
              <Search size={18} strokeWidth={1.8} />
            </Link>

            {/* Cart */}
            <Link
              href="/program"
              className="bhm-nav-icon"
              aria-label="Koszyk"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="bhm-nav-pill hidden sm:inline-flex">
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                {/* Jeden przycisk w pasku; rejestracja jest na /sign-in i w menu mobilnym */}
                <Link href="/sign-in" className="bhm-nav-pill hidden sm:inline-flex">
                  <User size={14} strokeWidth={1.8} aria-hidden="true" />
                  Zaloguj
                </Link>
              </>
            )}

            {/* Mobile Menu Button — animated hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-1 rounded-lg"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className="hamburger" data-open={mobileOpen.toString()}>
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu — animated slide-down with stagger */}
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="lg:hidden border-t border-border/50 bg-coastal-sand/95 backdrop-blur-md overflow-hidden"
            >
              <div className="container py-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: i * 0.045,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      className="block py-3 text-coastal-slate hover:text-coastal-gold transition-colors duration-200 border-b border-border/30 last:border-0"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {!user && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: navLinks.length * 0.045 + 0.04, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col gap-2 mt-3"
                  >
                    <Link
                      href="/sign-in"
                      className="px-4 py-2.5 text-center border border-coastal-ocean/30 text-coastal-slate rounded-2xl active:scale-[0.97] transition-transform duration-150"
                      onClick={() => setMobileOpen(false)}
                    >
                      Zaloguj
                    </Link>
                    <Link
                      href="/sign-up"
                      className="px-4 py-2.5 text-center bg-coastal-gold text-white rounded-2xl active:scale-[0.97] transition-transform duration-150"
                      onClick={() => setMobileOpen(false)}
                    >
                      Zarejestruj
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
