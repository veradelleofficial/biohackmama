import client from './client'

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
  return client.fetch(query)
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
  return client.fetch(query, { slug })
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
  return client.fetch(query, { pilarSlug })
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
  return client.fetch(query, { pilarSlug, subcategorySlug })
}

// ─── ARTICLE QUERIES ──────────────────────────────────────────────────────────

export const getArticles = async () => {
  const query = `*[_type == "article"] | order(publishedAt desc) {
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
  return client.fetch(query)
}

export const getArticlesByPilar = async (pilarSlug: string) => {
  const query = `*[_type == "article" && category->pilar->slug.current == $pilarSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    coverImage,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return client.fetch(query, { pilarSlug })
}

export const getArticlesBySubcategory = async (pilarSlug: string, subcategorySlug: string) => {
  const query = `*[_type == "article" && category->slug.current == $subcategorySlug && category->pilar->slug.current == $pilarSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    coverImage,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return client.fetch(query, { pilarSlug, subcategorySlug })
}

export const getArticleBySlug = async (slug: string) => {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    coverImage,
    content,
    author,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
    "pilarTitle": category->pilar->title,
  }`
  return client.fetch(query, { slug })
}

export const getArticleByFullPath = async (pilarSlug: string, subcategorySlug: string, slug: string) => {
  const query = `*[_type == "article" && slug.current == $slug && category->slug.current == $subcategorySlug && category->pilar->slug.current == $pilarSlug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    coverImage,
    content,
    author,
    "category": category->title,
    "categorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
    "pilarTitle": category->pilar->title,
  }`
  return client.fetch(query, { pilarSlug, subcategorySlug, slug })
}

export const getAllArticlePaths = async () => {
  const query = `*[_type == "article" && defined(slug.current) && defined(category->slug.current) && defined(category->pilar->slug.current)] {
    "slug": slug.current,
    "subcategorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return client.fetch(query)
}

export const getRelatedArticles = async (currentSlug: string, limit = 3) => {
  const query = `*[_type == "article" && slug.current != $currentSlug] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    readTime,
    coverImage {
      ...,
      asset->
    },
    "category": category->title,
  }`
  return client.fetch(query, { currentSlug, limit })
}

// ─── LEGACY BLOG QUERY (backward compat) ─────────────────────────────────────

export const getArticleSlugForRedirect = async (slug: string) => {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    "slug": slug.current,
    "subcategorySlug": category->slug.current,
    "pilarSlug": category->pilar->slug.current,
  }`
  return client.fetch(query, { slug })
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
  return client.fetch(query)
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
  return client.fetch(query, { slug })
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
  return client.fetch(query)
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
  return client.fetch(query, { slug })
}
