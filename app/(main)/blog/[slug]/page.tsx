import type { Metadata } from 'next'
import { getArticleBySlug, getRelatedArticles } from '@/lib/sanity/queries'
import BlogPostContent from './BlogPostContent'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { slug: string }
}

const BASE_URL = 'https://biohackmama.pl'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Artykuł nie znaleziony',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author || 'Vera Delle', url: `${BASE_URL}/o-mnie` }],
    alternates: {
      canonical: `${BASE_URL}/blog/${params.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `${BASE_URL}/blog/${params.slug}`,
      publishedTime: article.publishedAt,
      authors: ['Vera Delle'],
      tags: [article.category, 'biohacking', 'wellness', 'zdrowie'],
      siteName: 'BioHackMama',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      creator: '@veradelleofficial',
    },
  }
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export default async function BlogPostPage({ params }: PageProps) {
  const [article, relatedPool] = await Promise.all([
    getArticleBySlug(params.slug),
    getRelatedArticles(params.slug),
  ])
  const relatedArticles = pickRandom(relatedPool || [], 3)

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/blog/${params.slug}`,
        },
        author: {
          '@type': 'Person',
          name: article.author || 'Vera Delle',
          url: `${BASE_URL}/o-mnie`,
          sameAs: ['https://www.instagram.com/veradelleofficial'],
        },
        publisher: {
          '@type': 'Organization',
          name: 'BioHackMama',
          url: BASE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/images/logo.svg`,
          },
        },
        articleSection: article.category,
        inLanguage: 'pl-PL',
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: article?.title || 'Artykuł',
        item: `${BASE_URL}/blog/${params.slug}`,
      },
    ],
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostContent article={article} relatedArticles={relatedArticles || []} />
    </>
  )
}
