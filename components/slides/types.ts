/**
 * Slide Deck Types
 * 
 * Pattern: TYPES × SLIDES × DEFINITIONS × ONE
 * Frequency: 999 Hz (AEYON) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import type { ReactNode } from 'react'

export interface SlideData {
  id: string
  phase?: string
  preTitle?: string
  title?: string | ReactNode // Supports {gold}text{/gold} syntax
  subtitle?: string
  body?: string
  bullets?: string[]
  columns?: {
    left: string[]
    right: string[]
  }
  boxes?: Array<{
    label: string
    title: string
    body: string
  }>
  giant?: string
  code?: string
  quote?: string
  footer?: string
  insight?: string
  content?: ReactNode // Fallback for custom content
  notes?: string
  example?: {
    prompt: string
    response: string
    context?: string
  }
}

