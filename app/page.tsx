import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import FeaturedEbooks from '@/components/home/FeaturedEbooks'
import BlogPreview from '@/components/home/BlogPreview'
import ValuesSection from '@/components/home/ValuesSection'
import InstagramSection from '@/components/home/InstagramSection'

export const metadata: Metadata = {
  title: 'BioHackMama – Biohacking i Wellness dla Kobiet | Vera Delle',
  description:
    'Naukowe protokoły biohackingu dopasowane do kobiecego ciała. Hormony w równowadze, optymalizacja snu, żywienie i longevity. Kursy, ebooki i bezpłatne artykuły od Very Delle.',
  alternates: {
    canonical: 'https://biohackmama.pl',
  },
  openGraph: {
    title: 'BioHackMama – Biohacking i Wellness dla Kobiet',
    description:
      'Naukowe protokoły biohackingu dopasowane do kobiecego ciała. Hormony, sen, żywienie i longevity przez Verę Delle.',
    url: 'https://biohackmama.pl',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCourses />
      <FeaturedEbooks />
      <BlogPreview />
      <ValuesSection />
      <InstagramSection />
      <div className="container pb-10 md:pb-14">
        <div className="pt-8 border-t border-border/40 text-center">
          <p className="text-xs font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(72, 89, 107, 0.6)' }}>
            Prezentowane materiały mają charakter wyłącznie informacyjny i nie stanowią porady medycznej ani specjalistycznej. Przed wprowadzeniem zmian w suplementacji lub stylu życia, skonsultuj się z lekarzem.
          </p>
        </div>
      </div>
    </main>
  )
}
