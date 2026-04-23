'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, GraduationCap, Settings, ArrowRight, Zap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser()
  const searchParams = useSearchParams()
  const justSubscribed = searchParams.get('subscribed') === 'true'

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      window.location.href = '/sign-in'
    }
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    if (justSubscribed && isLoaded && isSignedIn) {
      user?.reload()
    }
  }, [justSubscribed, isLoaded, isSignedIn, user])

  if (!isLoaded || !isSignedIn) return null

  const meta = (user.publicMetadata ?? {}) as Record<string, any>
  const hasActiveSubscription = meta.subscription === 'active'
  const subscriptionEnd = meta.subscriptionEnd
    ? new Date(meta.subscriptionEnd).toLocaleDateString('pl-PL')
    : null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <main className="pt-24 md:pt-32 pb-14 md:pb-20">
      <div className="container max-w-6xl">

        {/* Success banner */}
        {justSubscribed && (
          <motion.div
            className="mb-8 rounded-2xl border border-coastal-gold/30 px-5 py-4 flex items-center gap-3"
            style={{ background: 'rgba(166,138,105,0.08)' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="text-xl">🎉</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#213a50' }}>Subskrypcja aktywna!</p>
              <p className="text-xs font-light" style={{ color: 'rgba(33,58,80,0.60)' }}>Witaj w BioHackMama Premium. Twoje Pigułki Wiedzy czekają.</p>
            </div>
            <Link href="/premium/pigulki" className="ml-auto text-xs font-semibold text-coastal-gold hover:text-coastal-gold/70 transition-colors whitespace-nowrap">
              Otwórz bibliotekę →
            </Link>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal tracking-heading mb-2">
            Witaj, {user?.firstName || 'piękna'}!
          </h1>
          <p className="text-base md:text-lg font-light" style={{ color: 'rgba(72, 89, 107, 0.78)' }}>
            Twój panel — subskrypcja, kursy i ebooki w jednym miejscu
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: Zap, label: 'Premium', value: hasActiveSubscription ? 'Aktywna' : 'Brak', href: '/premium' },
            { icon: GraduationCap, label: 'Kursy', value: 0 },
            { icon: BookOpen, label: 'Ebooki', value: 0 },
            { icon: Settings, label: 'Ustawienia', value: null },
          ].map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              {stat.href ? (
                <Link href={stat.href} className="block bg-card rounded-3xl p-5 md:p-6 border border-border/60 shadow-coastal-sm hover:shadow-card-hover transition-all duration-500">
                  <stat.icon className="w-6 h-6 text-coastal-ocean mb-3" />
                  <p className="text-lg font-bold text-coastal-gold">{stat.value}</p>
                  <p className="text-sm font-light" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>{stat.label}</p>
                </Link>
              ) : (
                <div className="bg-card rounded-3xl p-5 md:p-6 border border-border/60 shadow-coastal-sm">
                  <stat.icon className="w-6 h-6 text-coastal-ocean mb-3" />
                  <p className="text-2xl font-bold text-coastal-gold">{stat.value ?? '—'}</p>
                  <p className="text-sm font-light" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>{stat.label}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Subscription section */}
        <motion.section
          className="mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-heading font-normal tracking-heading">
              Subskrypcja Premium
            </h2>
            <Link href="/premium/pigulki" className="text-sm text-coastal-gold hover:text-coastal-gold/80 transition-colors inline-flex items-center gap-1">
              Biblioteka pigułek <ArrowRight size={16} />
            </Link>
          </div>

          {hasActiveSubscription ? (
            <div className="rounded-3xl border border-coastal-gold/30 p-6 md:p-8"
              style={{ background: 'linear-gradient(135deg, rgba(166,138,105,0.07) 0%, rgba(174,202,232,0.07) 100%)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <p className="text-sm font-semibold" style={{ color: '#213a50' }}>BioHackMama Premium — Aktywna</p>
                  </div>
                  {subscriptionEnd && (
                    <p className="text-xs font-light" style={{ color: 'rgba(33,58,80,0.55)' }}>
                      Następne odnowienie: {subscriptionEnd}
                    </p>
                  )}
                </div>
                <Link
                  href="/premium/pigulki"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white text-sm font-semibold hover:brightness-110 transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #A68A69, #8a7058)' }}
                >
                  Otwórz bibliotekę
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border/60 p-6 md:p-8 text-center bg-card">
              <Zap className="w-10 h-10 text-coastal-ocean/40 mx-auto mb-3" />
              <p className="text-base font-light mb-4" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
                Nie masz jeszcze subskrypcji Premium
              </p>
              <Link
                href="/premium"
                className="inline-block px-6 py-3 rounded-2xl text-white text-sm font-semibold hover:brightness-110 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #A68A69, #8a7058)' }}
              >
                Odkryj Pigułki Wiedzy
              </Link>
            </div>
          )}
        </motion.section>

        {/* Courses — coming soon */}
        <motion.section
          className="mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-heading font-normal tracking-heading">Moje kursy</h2>
            <Link href="/kursy" className="text-sm text-coastal-gold hover:text-coastal-gold/80 transition-colors inline-flex items-center gap-1">
              Przeglądaj kursy <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/60 text-center">
            <GraduationCap className="w-12 h-12 text-coastal-ocean/40 mx-auto mb-4" />
            <p className="text-lg font-light mb-4" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
              Nie masz jeszcze żadnych kursów
            </p>
            <Link href="/kursy" className="inline-block px-6 py-3 bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-all duration-300 text-cta text-sm">
              Odkryj kursy
            </Link>
          </div>
        </motion.section>

        {/* Ebooks — coming soon */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-heading font-normal tracking-heading">Moje ebooki</h2>
            <Link href="/ebooki" className="text-sm text-coastal-gold hover:text-coastal-gold/80 transition-colors inline-flex items-center gap-1">
              Przeglądaj ebooki <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/60 text-center">
            <BookOpen className="w-12 h-12 text-coastal-ocean/40 mx-auto mb-4" />
            <p className="text-lg font-light mb-4" style={{ color: 'rgba(72, 89, 107, 0.7)' }}>
              Nie masz jeszcze żadnych ebooków
            </p>
            <Link href="/ebooki" className="inline-block px-6 py-3 bg-coastal-gold text-white rounded-2xl hover:brightness-110 transition-all duration-300 text-cta text-sm">
              Odkryj ebooki
            </Link>
          </div>
        </motion.section>

      </div>
    </main>
  )
}
