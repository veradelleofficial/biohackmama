'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ScanBarcode, X } from 'lucide-react'
import Scanner from './Scanner'

const EASE = [0.22, 1, 0.36, 1] as const
const HIDE_ON = ['/narzedzia/skaner-skladu', '/sign-in', '/sign-up', '/dashboard']

/**
 * Zakładka "Sprawdź skład" przyklejona do prawej krawędzi ekranu na każdej stronie.
 * Otwiera panel ze skanerem kodów kreskowych.
 */
export default function ScannerDrawer() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])

  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="lr-scan-tab"
        aria-label="Sprawdź skład produktu"
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
      >
        <ScanBarcode size={18} strokeWidth={1.75} />
        <span className="lr-scan-tab__label">Sprawdź skład</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] lab-rose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(8,8,8,0.6)', backdropFilter: 'blur(3px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Skaner składu"
              className="lr-scan-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 style={{ fontSize: '1.6rem', lineHeight: 1.05 }}>
                    Sprawdź <span className="lr-rose">skład</span>
                  </h2>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    Zeskanuj kod kreskowy, a powiem Ci, czy produkt się nadaje, czy lepiej odłożyć go na półkę.
                  </p>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij" className="lr-scan-drawer__close">
                  <X size={20} />
                </button>
              </div>

              <Scanner compact />

              <Link href="/narzedzia/skaner-skladu" className="lr-scanner__link mt-6 inline-block">
                Jak oceniam produkty? →
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
