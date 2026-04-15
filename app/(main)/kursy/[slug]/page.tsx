import type { Metadata } from 'next'
import { getCourseBySlug } from '@/lib/sanity/queries'
import CourseContent from './CourseContent'

interface PageProps {
  params: { slug: string }
}

const BASE_URL = 'https://biohackmama.pl'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug)

  if (!course) {
    return {
      title: 'Kurs nie znaleziony',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: `${course.title} – Kurs Online`,
    description: course.description,
    alternates: {
      canonical: `${BASE_URL}/kursy/${params.slug}`,
    },
    openGraph: {
      title: `${course.title} – Kurs Online | BioHackMama`,
      description: course.description,
      type: 'website',
      url: `${BASE_URL}/kursy/${params.slug}`,
      siteName: 'BioHackMama',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${course.title} – Kurs Online`,
      description: course.description,
      creator: '@veradelleofficial',
    },
  }
}

export default async function CourseDetailPage({ params }: PageProps) {
  const course = await getCourseBySlug(params.slug)

  const courseSchema = course
    ? {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.description,
        url: `${BASE_URL}/kursy/${params.slug}`,
        inLanguage: 'pl-PL',
        provider: {
          '@type': 'Person',
          name: 'Vera Delle',
          url: `${BASE_URL}/o-mnie`,
          sameAs: ['https://www.instagram.com/veradelleofficial'],
        },
        offers: {
          '@type': 'Offer',
          price: typeof course.price === 'number' ? course.price : undefined,
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/kursy/${params.slug}`,
        },
        courseMode: 'online',
        educationalLevel: course.level,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          instructor: {
            '@type': 'Person',
            name: 'Vera Delle',
          },
        },
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Kursy', item: `${BASE_URL}/kursy` },
      {
        '@type': 'ListItem',
        position: 3,
        name: course?.title || 'Kurs',
        item: `${BASE_URL}/kursy/${params.slug}`,
      },
    ],
  }

  return (
    <>
      {courseSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CourseContent course={course} />
    </>
  )
}
