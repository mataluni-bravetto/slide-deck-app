import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripeConfig } from '@/lib/stripe/getStripeConfig'

/**
 * Stripe Checkout Session API Route
 * Pattern: STRIPE × CHECKOUT × API × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

export async function POST(request: NextRequest) {
  try {
    const config = getStripeConfig()
    
    // Validate config
    if (!config.secretKey) {
      console.error('Stripe secret key missing')
      return NextResponse.json(
        { error: 'Payment configuration error. Please contact support.' },
        { status: 500 }
      )
    }
    
    if (!config.priceId) {
      console.error('Stripe price ID missing')
      return NextResponse.json(
        { error: 'Product configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(config.secretKey, {
      apiVersion: '2024-11-20.acacia',
    })

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: config.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${config.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: config.cancelUrl,
      metadata: {
        product: 'Convergence Sprint',
        email: email,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Stripe error:', error)
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
    })
    return NextResponse.json(
      { error: error.message || 'Payment processing error. Please try again.' },
      { status: 500 }
    )
  }
}

