import { clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { userId?: string }
  const userId = body.userId

  if (!userId) {
    return NextResponse.json({ error: 'Nie jesteś zalogowana.' }, { status: 401 })
  }

  if (!process.env.STRIPE_PRICE_ID_MONTHLY || process.env.STRIPE_PRICE_ID_MONTHLY === 'price_xxx') {
    return NextResponse.json({ error: 'Stripe nie jest jeszcze skonfigurowany.' }, { status: 500 })
  }

  const user = await clerkClient.users.getUser(userId)
  const meta = user.publicMetadata as Record<string, any>
  const email = user.emailAddresses[0]?.emailAddress

  let customerId = meta?.stripeCustomerId as string | undefined

  if (!customerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: { clerkUserId: userId },
    })
    customerId = customer.id
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    payment_method_types: ['card', 'p24'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID_MONTHLY!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?subscribed=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium`,
    locale: 'pl',
  })

  return NextResponse.json({ url: session.url })
}
