import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { clerkClient } from '@clerk/nextjs/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
})

async function getClerkUserId(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer
    return customer.metadata?.clerkUserId ?? null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Brak podpisu Stripe.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowy podpis webhooka.' }, { status: 400 })
  }

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    const subscription = event.data.object as Stripe.Subscription
    const clerkUserId = await getClerkUserId(subscription.customer as string)
    if (!clerkUserId) return NextResponse.json({ received: true })

    const isActive = subscription.status === 'active' || subscription.status === 'trialing'
    const periodEnd = new Date(subscription.current_period_end * 1000).toISOString()

    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        subscription: isActive ? 'active' : 'inactive',
        subscriptionEnd: periodEnd,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
      },
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const clerkUserId = await getClerkUserId(subscription.customer as string)
    if (!clerkUserId) return NextResponse.json({ received: true })

    await clerkClient.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        subscription: 'inactive',
        subscriptionEnd: null,
        stripeSubscriptionId: null,
      },
    })
  }

  return NextResponse.json({ received: true })
}
