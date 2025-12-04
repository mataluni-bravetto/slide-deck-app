/**
 * Stripe Configuration from AbëKEYs
 * Pattern: STRIPE × ABEKEYS × CONFIG × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

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
  // Production: Use Vercel environment variables (server-side secure, not .env files)
  // Local: Use AbëKEYs vault
  const isProduction = process.env.VERCEL === '1'
  
  if (isProduction) {
    // Production: Read from Vercel environment variables
    // These are secure server-side variables, not .env files
    return {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      priceId: process.env.STRIPE_PRICE_ID || '',
      productId: process.env.STRIPE_PRODUCT_ID || '',
      pricingTableId: process.env.STRIPE_PRICING_TABLE_ID,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      successUrl: process.env.STRIPE_SUCCESS_URL || 'https://aiguardian.ai/checkout/success',
      cancelUrl: process.env.STRIPE_CANCEL_URL || 'https://aiguardian.ai/checkout',
    }
  }
  
  // Local: Read from AbëKEYs vault
  const filePath = join(ABEKEYS_DIR, 'stripe.json')
  
  if (!existsSync(filePath)) {
    throw new Error('Stripe credentials not found in AbëKEYs. Run: npm run abekeys input stripe')
  }

  const creds = JSON.parse(readFileSync(filePath, 'utf-8'))
  
  return {
    publishableKey: creds.publishableKey || creds.publishable_key || creds.apiKey || '',
    secretKey: creds.secretKey || creds.secret_key || '',
    priceId: creds.priceId || creds.price_id || '',
    productId: creds.productId || creds.product_id || '',
    pricingTableId: creds.pricingTableId || creds.pricing_table_id || creds.pricingTableId,
    webhookSecret: creds.webhookSecret || creds.webhook_secret,
    successUrl: creds.successUrl || creds.success_url || 'http://localhost:3000/checkout/success',
    cancelUrl: creds.cancelUrl || creds.cancel_url || 'http://localhost:3000/checkout',
  }
}

