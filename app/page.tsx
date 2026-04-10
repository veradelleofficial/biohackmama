import HeroSection from '@/components/home/HeroSection'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import FeaturedEbooks from '@/components/home/FeaturedEbooks'
import BlogPreview from '@/components/home/BlogPreview'
import ValuesSection from '@/components/home/ValuesSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCourses />
      <FeaturedEbooks />
      <BlogPreview />
      <ValuesSection />
      {/* Bottom disclaimer */}
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
