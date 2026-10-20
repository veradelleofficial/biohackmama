import type { Metadata } from 'next'
import LabRoseScope from '@/components/lab-rose/LabRoseScope'
import HeroSwitcher from '@/components/lab-rose/hero-proposals/HeroSwitcher'
import StatsBar from '@/components/lab-rose/StatsBar'
import StartHere from '@/components/lab-rose/StartHere'

export const metadata: Metadata = {
  title: 'Propozycje hero (podgląd)',
  robots: { index: false, follow: false },
}

/**
 * Podgląd dwóch propozycji sekcji hero dla strony głównej.
 * Przełącznik na dole ekranu. Pod hero: istniejące StatsBar + StartHere,
 * żeby zobaczyć jak nowy hero przechodzi w resztę strony.
 */
export default function HeroProposalsPage() {
  return (
    <LabRoseScope>
      <HeroSwitcher />
      <StatsBar />
      <StartHere />
    </LabRoseScope>
  )
}
