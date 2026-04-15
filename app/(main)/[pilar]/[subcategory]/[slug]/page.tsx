import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleByFullPath, getAllArticlePaths } from '@/lib/sanity/queries'
import ArticleContent from './ArticleContent'

const BASE_URL = 'https://biohackmama.pl'

// Revalidate every 60s so Sanity content updates appear without a full rebuild
export const revalidate = 60

interface PageProps {
  params: { pilar: string; subcategory: string; slug: string }
}

export async function generateStaticParams() {
  const paths = await getAllArticlePaths()
  return (paths || []).map((p: any) => ({
    pilar: p.pilarSlug,
    subcategory: p.subcategorySlug,
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleByFullPath(params.pilar, params.subcategory, params.slug)
  if (!article) return { title: 'Artykuł nie znaleziony', robots: { index: false, follow: false } }

  const canonicalUrl = `${BASE_URL}/${params.pilar}/${params.subcategory}/${params.slug}`

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author || 'Vera Delle', url: `${BASE_URL}/o-mnie` }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      authors: ['Vera Delle'],
      tags: [article.category, article.pilarTitle, 'biohacking', 'wellness'],
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

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleByFullPath(params.pilar, params.subcategory, params.slug)
  if (!article) notFound()

  const canonicalUrl = `${BASE_URL}/${params.pilar}/${params.subcategory}/${params.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
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
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.svg` },
    },
    articleSection: article.pilarTitle,
    keywords: [article.category, article.pilarTitle, 'biohacking', 'wellness', 'zdrowie kobiet'],
    inLanguage: 'pl-PL',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: article.pilarTitle, item: `${BASE_URL}/${params.pilar}` },
      { '@type': 'ListItem', position: 3, name: article.category, item: `${BASE_URL}/${params.pilar}/${params.subcategory}` },
      { '@type': 'ListItem', position: 4, name: article.title, item: canonicalUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArticleContent article={article} pilar={params.pilar} subcategory={params.subcategory} />
    </>
  )
}
