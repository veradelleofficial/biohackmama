'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { getPigulkaBySlug } from '@/lib/sanity/queries'
import PigulkaPlayer from './PigulkaPlayer'

export default function PigulkaPage({ params }: { params: { slug: string } }) {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const [pigulka, setPigulka] = useState<any | null | undefined>(undefined)

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
    getPigulkaBySlug(params.slug).then((data) => setPigulka(data ?? null))
  }, [isLoaded, isSignedIn, user, router, params.slug])

  if (!isLoaded || !isSignedIn || pigulka === undefined) {
    return (
      <main className="pt-24 pb-16 flex items-center justify-center">
        <span className="block w-6 h-6 rounded-full border-2 border-coastal-gold/30 border-t-coastal-gold animate-spin" />
      </main>
    )
  }

  if (pigulka === null) {
    return (
      <main className="pt-24 pb-16 text-center">
        <p className="text-base font-light" style={{ color: 'rgba(72,89,107,0.75)' }}>
          Nie znaleziono pigułki.
        </p>
      </main>
    )
  }

  return <PigulkaPlayer pigulka={pigulka} />
}
