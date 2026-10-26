import type { Metadata } from 'next'
import LabRoseScope from '@/components/lab-rose/LabRoseScope'
import Hero from '@/components/lab-rose/HeroKonstelacja'
import StartHere from '@/components/lab-rose/StartHere'
import SwapsSection from '@/components/lab-rose/SwapsSection'
import FeaturedCourses from '@/components/lab-rose/FeaturedCourses'
import FeaturedEbooks from '@/components/lab-rose/FeaturedEbooks'
import BlogPreview from '@/components/lab-rose/BlogPreview'
import Authority from '@/components/lab-rose/Authority'
import NewsletterCTA from '@/components/lab-rose/NewsletterCTA'
import SignatureBlock from '@/components/lab-rose/SignatureBlock'
import Disclaimer from '@/components/lab-rose/Disclaimer'

export const metadata: Metadata = {
  title: 'BioHackMama – Holistyczny, low-tox biohacking | Weronika Kuźmińczuk',
  description:
    'Świadoma optymalizacja zdrowia: zmniejsz ekspozycję na chemię, optymalizuj żywienie. Holistyczne strategie, biohackingowe gadżety przyspieszające regenerację.',
  alternates: {
    canonical: 'https://biohackmama.pl',
  },
  openGraph: {
    title: 'BioHackMama – Holistyczny, low-tox biohacking',
    description:
      'Świadoma optymalizacja zdrowia: zmniejsz ekspozycję na chemię, optymalizuj żywienie. Holistyczne strategie, biohackingowe gadżety przyspieszające regenerację.',
    url: 'https://biohackmama.pl',
    type: 'website',
  },
}

export default function Home() {
  return (
    <LabRoseScope>
      <Hero />
      <StartHere />
      <SwapsSection />
      <FeaturedCourses />
      <FeaturedEbooks />
      <Authority />
      <BlogPreview />
      <NewsletterCTA />
      <SignatureBlock />
      <Disclaimer />
    </LabRoseScope>
  )
}
