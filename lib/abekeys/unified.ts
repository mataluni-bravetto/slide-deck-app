/**
 * UNIFIED AbëKEYs System - Convergence Pattern
 * Pattern: ABEKEYS × UNIFIED × CONVERGENCE × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META) × 999 Hz (CONVERGENCE)
 * ∞ AbëONE ∞
 * 
 * SIMPLIFY: One function, one pattern, one truth
 * UNIFY: Single source of truth for all credentials
 * HARMONIZE: Consistent behavior everywhere
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

// UNIVERSAL: Single source of truth
const ABEKEYS_DIR = join(homedir(), '.abekeys', 'credentials')

/**
 * Get credential from AbëKEYs vault
 * CONVERGENCE: One function for all services, all environments
 */
export function getCredential<T = Record<string, unknown>>(service: string): T | null {
  const filePath = join(ABEKEYS_DIR, `${service}.json`)
  
  if (!existsSync(filePath)) {
    return null
  }

  try {
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Failed to read AbëKEYs credential ${service}:`, error)
    return null
  }
}

/**
 * Get Stripe configuration
 * CONVERGENCE: Uses unified getCredential()
 */
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
  const creds = getCredential<{
    publishableKey?: string
    publishable_key?: string
    secretKey?: string
    secret_key?: string
    priceId?: string
    price_id?: string
    productId?: string
    product_id?: string
    pricingTableId?: string
    pricing_table_id?: string
    webhookSecret?: string
    webhook_secret?: string
    successUrl?: string
    success_url?: string
    cancelUrl?: string
    cancel_url?: string
  }>('stripe')

  if (!creds) {
    throw new Error('Stripe credentials not found in AbëKEYs. Run: npm run abekeys input stripe')
  }

  const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
  const baseUrl = isProduction 
    ? 'https://aiguardian.ai' 
    : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')

  return {
    publishableKey: creds.publishableKey || creds.publishable_key || '',
    secretKey: creds.secretKey || creds.secret_key || '',
    priceId: creds.priceId || creds.price_id || '',
    productId: creds.productId || creds.product_id || '',
    pricingTableId: creds.pricingTableId || creds.pricing_table_id,
    webhookSecret: creds.webhookSecret || creds.webhook_secret,
    successUrl: creds.successUrl || creds.success_url || `${baseUrl}/convergence-purchase/success`,
    cancelUrl: creds.cancelUrl || creds.cancel_url || `${baseUrl}/convergence-purchase`,
  }
}

/**
 * Get Namecheap configuration
 * CONVERGENCE: Uses unified getCredential()
 */
export interface NamecheapConfig {
  apiUser: string
  apiKey: string
  ip: string
}

export function getNamecheapConfig(): NamecheapConfig {
  const creds = getCredential<{
    apiUser?: string
    api_user?: string
    username?: string
    user?: string
    apiKey?: string
    api_key?: string
    key?: string
    ip?: string
    clientIp?: string
    client_ip?: string
  }>('namecheap')

  if (!creds) {
    throw new Error('Namecheap credentials not found in AbëKEYs. Run: npm run abekeys input namecheap')
  }

  let ip = creds.ip || creds.clientIp || creds.client_ip
  if (!ip) {
    try {
      const { execSync } = require('child_process')
      ip = execSync('curl -s ifconfig.me', { encoding: 'utf-8' }).trim()
    } catch {
      throw new Error('Namecheap IP not found. Add "ip" to namecheap.json')
    }
  }

  return {
    apiUser: creds.apiUser || creds.api_user || creds.username || creds.user || '',
    apiKey: creds.apiKey || creds.api_key || creds.key || '',
    ip: ip,
  }
}

/**
 * Get Cloudflare configuration
 * CONVERGENCE: Uses unified getCredential()
 */
export interface CloudflareConfig {
  apiToken: string
  accountId: string
}

export function getCloudflareConfig(): CloudflareConfig {
  const creds = getCredential<{
    apiToken?: string
    api_token?: string
    token?: string
    accountId?: string
    account_id?: string
  }>('cloudflare')

  if (!creds) {
    throw new Error('Cloudflare credentials not found in AbëKEYs. Run: npm run abekeys input cloudflare')
  }

  return {
    apiToken: creds.apiToken || creds.api_token || creds.token || '',
    accountId: creds.accountId || creds.account_id || '',
  }
}

/**
 * Get Bulk configuration (Namecheap + Cloudflare)
 * CONVERGENCE: Composes unified functions
 */
export interface BulkConfig {
  namecheap: NamecheapConfig
  cloudflare: CloudflareConfig
}

export function getBulkConfig(): BulkConfig {
  return {
    namecheap: getNamecheapConfig(),
    cloudflare: getCloudflareConfig(),
  }
}

