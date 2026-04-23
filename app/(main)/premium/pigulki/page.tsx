import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getPigulki } from '@/lib/sanity/queries'
import PigulkiLibrary from './PigulkiLibrary'

export const dynamic = 'force-dynamic'

export default async function PigulkiPage() {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await clerkClient.users.getUser(userId)
  const meta = user.publicMetadata as Record<string, any>

  if (meta?.subscription !== 'active') redirect('/premium')

  const pigulki = await getPigulki()

  return <PigulkiLibrary pigulki={pigulki} />
}
