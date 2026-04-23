import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { getPigulkaBySlug } from '@/lib/sanity/queries'
import PigulkaPlayer from './PigulkaPlayer'

export const dynamic = 'force-dynamic'

export default async function PigulkaPage({ params }: { params: { slug: string } }) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await clerkClient.users.getUser(userId)
  const meta = user.publicMetadata as Record<string, any>

  if (meta?.subscription !== 'active') redirect('/premium')

  const pigulka = await getPigulkaBySlug(params.slug)
  if (!pigulka) notFound()

  return <PigulkaPlayer pigulka={pigulka} />
}
