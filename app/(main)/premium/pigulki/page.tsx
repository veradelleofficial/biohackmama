'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { getPigulki } from '@/lib/sanity/queries'
import PigulkiLibrary from './PigulkiLibrary'

export default function PigulkiPage() {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const [pigulki, setPigulki] = useState<any[] | null>(null)

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) {
      router.replace('/sign-in')
      return
    }
    const meta = (user?.publicMetadata ?? {}) as Record<string, any>
    if (meta.subscription !== 'active') {
      router.replace('/premium')
      return
    }
    getPigulki().then((data) => setPigulki(data ?? []))
  }, [isLoaded, isSignedIn, user, router])

  if (!isLoaded || !isSignedIn || pigulki === null) {
    return (
      <main className="pt-24 pb-16 flex items-center justify-center">
        <span className="block w-6 h-6 rounded-full border-2 border-coastal-gold/30 border-t-coastal-gold animate-spin" />
      </main>
    )
  }

  return <PigulkiLibrary pigulki={pigulki} />
}
