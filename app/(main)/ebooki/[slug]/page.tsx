import type { Metadata } from 'next'
import { getEbookBySlug } from '@/lib/sanity/queries'
import EbookContent from './EbookContent'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { slug: string }
}

const BASE_URL = 'https://biohackmama.pl'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ebook = await getEbookBySlug(params.slug)

  if (!ebook) {
    return {
      title: 'Ebook nie znaleziony',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: `${ebook.title} – Ebook PDF`,
    description: ebook.description,
    alternates: {
      canonical: `${BASE_URL}/ebooki/${params.slug}`,
    },
    openGraph: {
      title: `${ebook.title} – Ebook | BioHackMama`,
      description: ebook.description,
      type: 'website',
      url: `${BASE_URL}/ebooki/${params.slug}`,
      siteName: 'BioHackMama',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ebook.title} – Ebook PDF`,
      description: ebook.description,
      creator: '@veradelleofficial',
    },
  }
}

export default async function EbookDetailPage({ params }: PageProps) {
  const ebook = await getEbookBySlug(params.slug)

  const ebookSchema = ebook
    ? {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: ebook.title,
        description: ebook.description,
        url: `${BASE_URL}/ebooki/${params.slug}`,
        inLanguage: 'pl-PL',
        bookFormat: 'https://schema.org/EBook',
        numberOfPages: ebook.pages,
        author: {
          '@type': 'Person',
          name: ebook.author || 'Vera Delle',
          url: `${BASE_URL}/o-mnie`,
          sameAs: ['https://www.instagram.com/veradelleofficial'],
        },
        publisher: {
          '@type': 'Organization',
          name: 'BioHackMama',
          url: BASE_URL,
        },
        offers: {
          '@type': 'Offer',
          price: typeof ebook.price === 'number' ? ebook.price : undefined,
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/ebooki/${params.slug}`,
        },
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Ebooki', item: `${BASE_URL}/ebooki` },
      {
        '@type': 'ListItem',
        position: 3,
        name: ebook?.title || 'Ebook',
        item: `${BASE_URL}/ebooki/${params.slug}`,
      },
    ],
  }

  return (
    <>
      {ebookSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ebookSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EbookContent ebook={ebook} />
    </>
  )
}
