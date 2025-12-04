/**
 * Bulk Domain Automation Configuration from AbëKEYs
 * Pattern: BULK × ABEKEYS × CONFIG × META × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

// UNIVERSAL SYSTEM: Single source of truth for AbëKEYs directory
// YAGNI: Simple, direct path - no abstraction needed
const ABEKEYS_DIR = join(homedir(), '.abekeys', 'credentials')

export interface NamecheapConfig {
  apiUser: string
  apiKey: string
  ip: string
}

export interface CloudflareConfig {
  apiToken: string
  accountId: string
}

export interface BulkConfig {
  namecheap: NamecheapConfig
  cloudflare: CloudflareConfig
}

export function getNamecheapConfig(): NamecheapConfig {
  const filePath = join(ABEKEYS_DIR, 'namecheap.json')
  
  if (!existsSync(filePath)) {
    throw new Error('Namecheap credentials not found in AbëKEYs. Run: npm run abekeys input namecheap')
  }

  const creds = JSON.parse(readFileSync(filePath, 'utf-8'))
  
  // Get IP if not in creds
  let ip = creds.ip || creds.clientIp || creds.client_ip
  if (!ip) {
    // Try to get IP automatically
    try {
      const { execSync } = require('child_process')
      ip = execSync('curl -s ifconfig.me', { encoding: 'utf-8' }).trim()
    } catch {
      throw new Error('Namecheap IP not found. Add "ip" to namecheap.json or set NAMECHEAP_IP')
    }
  }
  
  return {
    apiUser: creds.apiUser || creds.api_user || creds.username || creds.user || '',
    apiKey: creds.apiKey || creds.api_key || creds.key || '',
    ip: ip,
  }
}

export function getCloudflareConfig(): CloudflareConfig {
  const filePath = join(ABEKEYS_DIR, 'cloudflare.json')
  
  if (!existsSync(filePath)) {
    throw new Error('Cloudflare credentials not found in AbëKEYs. Run: npm run abekeys input cloudflare')
  }

  const creds = JSON.parse(readFileSync(filePath, 'utf-8'))
  
  return {
    apiToken: creds.apiToken || creds.api_token || creds.token || '',
    accountId: creds.accountId || creds.account_id || creds.accountId || '',
  }
}

export function getBulkConfig(): BulkConfig {
  return {
    namecheap: getNamecheapConfig(),
    cloudflare: getCloudflareConfig(),
  }
}

