'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag } from 'lucide-react'
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
      <nav className="sticky top-0 z-50 bg-coastal-sand/80 backdrop-blur-md border-b border-border/50">
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
                className="nav-link-underline text-coastal-slate hover:text-coastal-gold transition-colors duration-250"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search, Cart, Auth & Mobile Button */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search */}
            <Link
              href="/szukaj"
              className="p-2 rounded-xl text-coastal-slate hover:text-coastal-gold hover:bg-secondary/10 transition-colors duration-200"
              aria-label="Szukaj"
            >
              <Search size={18} strokeWidth={1.8} />
            </Link>

            {/* Cart */}
            <Link
              href="/kursy"
              className="relative p-2 rounded-xl text-coastal-slate hover:text-coastal-gold hover:bg-secondary/10 transition-colors duration-200"
              aria-label="Koszyk"
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-block px-4 py-2 text-xs bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-[transform,filter] duration-200 active:scale-[0.97] text-cta"
                >
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden sm:inline-block px-4 py-2 text-xs border border-coastal-ocean/30 text-coastal-slate rounded-2xl hover:bg-secondary/10 transition-[transform,background-color,border-color] duration-200 active:scale-[0.97] text-cta"
                >
                  Zaloguj
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden sm:inline-block px-4 py-2 text-xs bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-[transform,filter] duration-200 active:scale-[0.97] text-cta"
                >
                  Zarejestruj
                </Link>
              </>
            )}

            {/* Mobile Menu Button — animated hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -mr-1 rounded-lg"
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
              className="md:hidden border-t border-border/50 bg-coastal-sand/95 backdrop-blur-md overflow-hidden"
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
