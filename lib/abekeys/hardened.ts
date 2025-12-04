/**
 * HARDENED AbëKEYs Utility - Bulletproof Save/Read/Verify
 * Pattern: ABEKEYS × HARDENED × BULLETPROOF × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META) × 530 Hz (ZERO)
 * ∞ AbëONE ∞
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, chmodSync, statSync, renameSync, unlinkSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const ABEKEYS_DIR = join(homedir(), '.abekeys', 'credentials')
const ABEKEYS_BASE = join(homedir(), '.abekeys')

/**
 * HARDENED: Initialize vault with proper permissions
 */
export function initializeVault(): void {
  if (!existsSync(ABEKEYS_BASE)) {
    mkdirSync(ABEKEYS_BASE, { mode: 0o700, recursive: true })
  }

  if (!existsSync(ABEKEYS_DIR)) {
    mkdirSync(ABEKEYS_DIR, { mode: 0o700, recursive: true })
  }

  // Enforce permissions
  try {
    chmodSync(ABEKEYS_BASE, 0o700)
    chmodSync(ABEKEYS_DIR, 0o700)
  } catch (error) {
    throw new Error(`Failed to set vault permissions: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * HARDENED: Atomic write with verification
 * Pattern: Write temp → Set permissions → Verify → Atomic rename → Verify final
 */
export function saveCredentialHardened(service: string, config: Record<string, unknown>): void {
  initializeVault()
  
  const filePath = join(ABEKEYS_DIR, `${service}.json`)
  const tempPath = `${filePath}.tmp`
  
  try {
    // Step 1: Write to temp file
    writeFileSync(tempPath, JSON.stringify(config, null, 2), 'utf-8')
    
    // Step 2: Set secure permissions
    chmodSync(tempPath, 0o600)
    
    // Step 3: Verify temp permissions
    const tempStats = statSync(tempPath)
    const tempMode = tempStats.mode & parseInt('777', 8)
    if (tempMode !== parseInt('600', 8)) {
      throw new Error(`Failed to set secure permissions: ${tempMode.toString(8)} (expected 600)`)
    }
    
    // Step 4: Verify JSON is valid by reading it back
    const verifyContent = readFileSync(tempPath, 'utf-8')
    JSON.parse(verifyContent) // Will throw if invalid
    
    // Step 5: Atomic rename
    renameSync(tempPath, filePath)
    
    // Step 6: Final verification
    const finalStats = statSync(filePath)
    const finalMode = finalStats.mode & parseInt('777', 8)
    if (finalMode !== parseInt('600', 8)) {
      throw new Error(`File permissions incorrect after save: ${finalMode.toString(8)} (expected 600)`)
    }
    
    // Step 7: Verify content matches what we saved
    const finalContent = readFileSync(filePath, 'utf-8')
    const finalConfig = JSON.parse(finalContent)
    
    // Verify critical fields match
    for (const [key, value] of Object.entries(config)) {
      if (finalConfig[key] !== value) {
        throw new Error(`Field ${key} mismatch after save`)
      }
    }
    
  } catch (error) {
    // Clean up temp file on error
    try {
      if (existsSync(tempPath)) {
        unlinkSync(tempPath)
      }
    } catch (cleanupError) {
      // Ignore cleanup errors
    }
    
    throw new Error(`Failed to save credentials securely: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * HARDENED: Read credential with permission check
 */
export function readCredentialHardened(service: string): Record<string, unknown> | null {
  const filePath = join(ABEKEYS_DIR, `${service}.json`)
  
  if (!existsSync(filePath)) {
    return null
  }

  // Verify permissions
  try {
    const stats = statSync(filePath)
    const mode = stats.mode & parseInt('777', 8)
    if (mode !== parseInt('600', 8)) {
      // Auto-fix insecure permissions
      try {
        chmodSync(filePath, 0o600)
      } catch (fixError) {
        throw new Error(`AbëKEYs file has insecure permissions (${mode.toString(8)}). Expected 600. Auto-fix failed.`)
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('insecure permissions')) {
      throw error
    }
  }

  try {
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as Record<string, unknown>
  } catch (error) {
    throw new Error(`Failed to read AbëKEYs credential ${service}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * HARDENED: Verify credential is complete
 * Service-specific validation
 */
export function isCredentialComplete(service: string, creds: Record<string, unknown> | null): boolean {
  if (!creds) {
    return false
  }

  // Service-specific checks
  switch (service.toLowerCase()) {
    case 'stripe':
      return !!(creds.secretKey && creds.publishableKey)
    
    case 'namecheap':
      return !!(creds.apiUser || creds.api_user || creds.username) && 
             !!(creds.apiKey || creds.api_key || creds.key)
    
    case 'cloudflare':
      return !!(creds.apiToken || creds.api_token || creds.token) && 
             !!(creds.accountId || creds.account_id)
    
    default:
      // Generic check for common field names
      return !!(creds.apiKey || creds.api_key || creds.token || creds.botToken || creds.accessToken)
  }
}

/**
 * HARDENED: Save and verify in one operation
 */
export function saveAndVerify(service: string, config: Record<string, unknown>): void {
  saveCredentialHardened(service, config)
  
  // Verify immediately after save
  const verified = readCredentialHardened(service)
  if (!verified) {
    throw new Error(`Failed to verify saved credential for ${service}`)
  }
  
  if (!isCredentialComplete(service, verified)) {
    throw new Error(`Saved credential for ${service} is incomplete`)
  }
  
  // Verify all fields match
  for (const [key, value] of Object.entries(config)) {
    if (verified[key] !== value) {
      throw new Error(`Field ${key} verification failed for ${service}`)
    }
  }
}

