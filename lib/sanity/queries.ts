import client from './client'

// Article Queries
export const getArticles = async () => {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    category,
    coverImage,
  }`
  return client.fetch(query)
}

export const getArticleBySlug = async (slug: string) => {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    category,
    coverImage,
    content,
    author
  }`
  return client.fetch(query, { slug })
}

// Course Queries
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

// Ebook Queries
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
