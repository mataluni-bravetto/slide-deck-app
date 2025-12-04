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
    // Debug: Log environment detection
    console.log('Environment check:', {
      VERCEL: process.env.VERCEL,
      NODE_ENV: process.env.NODE_ENV,
      hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
      hasPriceId: !!process.env.STRIPE_PRICE_ID,
    })

    const config = getStripeConfig()
    
    // Validate config with detailed logging
    if (!config.secretKey) {
      console.error('Stripe secret key missing', {
        isProduction: process.env.VERCEL === '1',
        envVarsPresent: {
          STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
        },
      })
      return NextResponse.json(
        { error: 'Payment configuration error. Please contact support.' },
        { status: 500 }
      )
    }
    
    if (!config.priceId) {
      console.error('Stripe price ID missing', {
        isProduction: process.env.VERCEL === '1',
        envVarsPresent: {
          STRIPE_PRICE_ID: !!process.env.STRIPE_PRICE_ID,
        },
      })
      return NextResponse.json(
        { error: 'Product configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    // Log config (without exposing secrets)
    console.log('Stripe config loaded:', {
      hasSecretKey: !!config.secretKey,
      secretKeyPrefix: config.secretKey.substring(0, 7) + '...',
      priceId: config.priceId,
      successUrl: config.successUrl,
      cancelUrl: config.cancelUrl,
    })

    const stripe = new Stripe(config.secretKey, {
      apiVersion: '2024-11-20.acacia',
      maxNetworkRetries: 0, // Disable retries to see actual error immediately
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
    // Enhanced error logging
    console.error('Stripe error:', error)
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      rawError: error.raw ? {
        message: error.raw.message,
        type: error.raw.type,
        code: error.raw.code,
      } : null,
    })
    
    // Return more specific error message
    const errorMessage = error.raw?.message || error.message || 'Payment processing error. Please try again.'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

