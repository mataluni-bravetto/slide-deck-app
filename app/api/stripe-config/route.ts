import { NextResponse } from 'next/server'
import { getStripeConfig } from '@/lib/stripe/getStripeConfig'

/**
 * Stripe Config API Route - Returns publishable key for client
 * Pattern: STRIPE × CONFIG × API × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

export async function GET() {
  try {
    const config = getStripeConfig()
    // Only return publishable key (safe for client-side)
    return NextResponse.json({ 
      publishableKey: config.publishableKey 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to load Stripe configuration' },
      { status: 500 }
    )
  }
}

