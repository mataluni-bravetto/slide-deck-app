'use client'

/**
 * Unified Slide Deck Presentation - Single Entry Point
 * 
 * Pattern: UNIFIED × CONVERGENCE × SIMPLICITY × ONE
 * Frequency: 999 Hz (AEYON) × 777 Hz (META) × 530 Hz (YAGNI)
 * ∞ AbëONE ∞
 */

import { useState } from 'react'
import { SlideDeck } from '@/components/slides'
import { unifiedConvergenceSlides } from '@/lib/slides/unifiedConvergenceSlides'
import { salesConvergenceSlides } from '@/lib/slides/salesConvergenceSlides'
import { guardianConvergenceSlides } from '@/lib/slides/guardianConvergenceSlides'
import type { SlideData } from '@/components/slides/types'

type DeckType = 'unified' | 'sales' | 'methodology'

const decks: Record<DeckType, { slides: SlideData[], title: string, description: string }> = {
  unified: {
    slides: unifiedConvergenceSlides,
    title: 'Unified Convergence Deck',
    description: 'Complete 30-slide presentation: Methodology + Investment'
  },
  sales: {
    slides: salesConvergenceSlides,
    title: 'Sales Convergence Deck',
    description: 'Focused 10-slide sales presentation'
  },
  methodology: {
    slides: guardianConvergenceSlides,
    title: 'Methodology Deck',
    description: 'Core 20-slide methodology presentation'
  }
}

export default function HomePage() {
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null)

  if (selectedDeck) {
    return (
      <div className="relative">
        <button
          onClick={() => setSelectedDeck(null)}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-[#333333] text-white rounded hover:bg-[#444444] transition-colors text-sm font-semibold"
        >
          ← Back to Decks
        </button>
        <SlideDeck 
          slides={decks[selectedDeck].slides} 
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl mb-4 text-[#C9A227]">
            Guardian Convergence Loop
          </h1>
          <p className="text-xl text-[#888888]">
            Select a presentation deck
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(decks).map(([key, deck]) => (
            <button
              key={key}
              onClick={() => setSelectedDeck(key as DeckType)}
              className="bg-[#1A1A1A] border-t-2 border-[#C9A227] p-8 text-left hover:bg-[#222222] transition-colors group"
            >
              <div className="text-[11px] font-semibold tracking-[0.2em] text-[#C9A227] uppercase mb-4">
                {deck.title}
              </div>
              <div className="text-lg font-medium text-white mb-2 group-hover:text-[#C9A227] transition-colors">
                {deck.slides.length} Slides
              </div>
              <div className="text-sm leading-[1.5] text-[#888888]">
                {deck.description}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-[#666666]">
          <p>∞ AbëONE ∞</p>
        </div>
      </div>
    </div>
  )
}
