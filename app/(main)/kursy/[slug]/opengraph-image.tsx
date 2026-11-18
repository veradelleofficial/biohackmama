import { getCourseBySlug } from '@/lib/sanity/queries'
import { renderOgImage, OG_SIZE } from '@/lib/brand-image'

export const runtime = 'edge'
export const alt = 'BioHackMama: program online'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug)

  const chips: { label: string; highlight?: boolean }[] = []
  if (course?.level) chips.push({ label: String(course.level) })
  if (course?.duration) chips.push({ label: String(course.duration) })
  if (course?.price) chips.push({ label: `${course.price} zł`, highlight: true })

  return renderOgImage({
    eyebrow: 'Program online',
    title: course?.title || 'Program online',
    subtitle: course?.description || undefined,
    chips,
  })
}
