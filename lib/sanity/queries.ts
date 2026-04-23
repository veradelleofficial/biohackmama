import { sanityFetch } from './client'

// ─── PILAR QUERIES ────────────────────────────────────────────────────────────

export const getPilars = async () => {
  const query = `*[_type == "pilar"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    metaTitle,
    metaDescription,
  }`
  return sanityFetch(query)
}

export const getPilarBySlug = async (slug: string) => {
  const query = `*[_type == "pilar" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    metaTitle,
    metaDescription,
  }`
  return sanityFetch(query, { slug })
}

// ─── SUBCATEGORY (CATEGORY) QUERIES ──────────────────────────────────────────

export const getSubcategoriesByPilar = async (pilarSlug: string) => {
  const query = `*[_type == "category" && pilar->slug.current == $pilarSlug] | order(title asc) {
    _id,
    title,
    slug,
    description,
    metaTitle,
    metaDescription,
    "pilarSlug": pilar->slug.current,
    "pilarTitle": pilar->title,
  }`
  return sanityFetch(query, { pilarSlug })
}

export const getSubcategoryBySlug = async (pilarSlug: string, subcategorySlug: string) => {
  const query = `*[_type == "category" && slug.current == $subcategorySlug && pilar->slug.current == $pilarSlug][0] {
    _id,
    title,
    slug,
    description,
    metaTitle,
    metaDescription,
    "pilarSlug": pilar->slug.current,
    "pilarTitle": pilar->title,
  }`
  return sanityFetch(query, { pilarSlug, subcategorySlug })
}

// ─── ARTICLE QUERIES ──────────────────────────────────────────────────────────

export const getArticles = async () => {
  const query = `*[_type == "article"] | order(defined(content[0]) desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "coverImageUrl": coverImage.asset->url,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
    "pilarTitle": category->pilar->title,
    "hasContent": defined(content) && length(content) > 0,
  }`
  return sanityFetch(query)
}

export const getArticlesByPilar = async (pilarSlug: string) => {
  const query = `*[_type == "article" && category->pilar->slug.current == $pilarSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "coverImageUrl": coverImage.asset->url,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return sanityFetch(query, { pilarSlug })
}

export const getArticlesBySubcategory = async (pilarSlug: string, subcategorySlug: string) => {
  const query = `*[_type == "article" && category->slug.current == $subcategorySlug && category->pilar->slug.current == $pilarSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "coverImageUrl": coverImage.asset->url,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return sanityFetch(query, { pilarSlug, subcategorySlug })
}

export const getArticleBySlug = async (slug: string) => {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "coverImageUrl": coverImage.asset->url,
    coverImage,
    content,
    author,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
    "pilarTitle": category->pilar->title,
  }`
  return sanityFetch(query, { slug })
}

export const getArticleByFullPath = async (pilarSlug: string, subcategorySlug: string, slug: string) => {
  const query = `*[_type == "article" && slug.current == $slug && category->slug.current == $subcategorySlug && category->pilar->slug.current == $pilarSlug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    "coverImageUrl": coverImage.asset->url,
    coverImage,
    content,
    author,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
    "pilarTitle": category->pilar->title,
  }`
  return sanityFetch(query, { pilarSlug, subcategorySlug, slug })
}

export const getAllArticlePaths = async () => {
  const query = `*[_type == "article" && defined(slug.current) && defined(category->slug.current) && defined(category->pilar->slug.current)] {
    "slug": slug.current,
    "subcategorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return sanityFetch(query)
}

export const getRelatedArticles = async (currentSlug: string) => {
  const query = `*[_type == "article" && slug.current != $currentSlug && defined(content[0])] | order(publishedAt desc) [0...9] {
    _id,
    title,
    slug,
    excerpt,
    readTime,
    "coverImageUrl": coverImage.asset->url,
    "category": category->title,
  }`
  return sanityFetch(query, { currentSlug })
}

// ─── LEGACY BLOG QUERY (backward compat) ─────────────────────────────────────

export const getArticleSlugForRedirect = async (slug: string) => {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    "slug": slug.current,
    "subcategorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return sanityFetch(query, { slug })
}

// ─── COURSE QUERIES ───────────────────────────────────────────────────────────

export const getCourses = async () => {
  const query = `*[_type == "course"] | order(createdAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    level,
    duration,
    lessons,
    image,
    rating,
    reviews,
  }`
  return sanityFetch(query)
}

export const getCourseBySlug = async (slug: string) => {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    price,
    level,
    duration,
    lessons,
    image,
    rating,
    reviews,
    content,
    curriculum,
    courseUrl,
    author
  }`
  return sanityFetch(query, { slug })
}

// ─── EBOOK QUERIES ────────────────────────────────────────────────────────────

export const getEbooks = async () => {
  const query = `*[_type == "ebook"] | order(createdAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    pages,
    image,
    author,
  }`
  return sanityFetch(query)
}

export const getEbookBySlug = async (slug: string) => {
  const query = `*[_type == "ebook" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    price,
    pages,
    image,
    author,
    content,
    downloadUrl,
    benefits
  }`
  return sanityFetch(query, { slug })
}
