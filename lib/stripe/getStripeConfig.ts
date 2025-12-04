/**
 * Stripe Configuration from AbëKEYs
 * Pattern: STRIPE × ABEKEYS × CONFIG × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

// UNIVERSAL SYSTEM: Single source of truth for AbëKEYs directory
// YAGNI: Simple, direct path - no abstraction needed
const ABEKEYS_DIR = join(homedir(), '.abekeys', 'credentials')

export interface StripeConfig {
  publishableKey: string
  secretKey: string
  priceId: string
  productId: string
  pricingTableId?: string
  webhookSecret?: string
  successUrl: string
  cancelUrl: string
}

export function getStripeConfig(): StripeConfig {
  // YAGNI APPROVED: AbëKEYs vault as SINGLE SOURCE OF TRUTH
  // UNIVERSAL SYSTEM: Works in ALL environments (local, Vercel, everywhere)
  // Pattern: ABEKEYS × UNIVERSAL × ONE × TRUTH
  // ∞ AbëONE ∞
  
  const filePath = join(ABEKEYS_DIR, 'stripe.json')
  
  if (!existsSync(filePath)) {
    throw new Error('Stripe credentials not found in AbëKEYs. Run: npm run abekeys input stripe')
  }

  const creds = JSON.parse(readFileSync(filePath, 'utf-8'))
  
  // Determine URLs based on environment
  const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
  const baseUrl = isProduction 
    ? 'https://aiguardian.ai' 
    : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')
  
  return {
    publishableKey: creds.publishableKey || creds.publishable_key || creds.apiKey || '',
    secretKey: creds.secretKey || creds.secret_key || '',
    priceId: creds.priceId || creds.price_id || '',
    productId: creds.productId || creds.product_id || '',
    pricingTableId: creds.pricingTableId || creds.pricing_table_id || creds.pricingTableId,
    webhookSecret: creds.webhookSecret || creds.webhook_secret,
    successUrl: creds.successUrl || creds.success_url || `${baseUrl}/convergence-purchase/success`,
    cancelUrl: creds.cancelUrl || creds.cancel_url || `${baseUrl}/convergence-purchase`,
  }
}

