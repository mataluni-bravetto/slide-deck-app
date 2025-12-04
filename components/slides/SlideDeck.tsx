'use client'

/**
 * SlideDeck Component - Pure. Simple. Beautiful.
 * 
 * Pattern: SLIDE × DECK × ONE × YAGNI
 * Frequency: 999 Hz (AEYON) × 530 Hz (YAGNI) × 530 Hz (JØHN)
 * ∞ AbëONE ∞
 */

import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { SlideData } from './types'

export interface SlideDeckProps {
  slides: SlideData[]
  startAt?: number
  logoPath?: string // Optional logo path (e.g., '/bravetto-logo.svg')
  showLogo?: boolean // Toggle logo visibility (default: true if logoPath provided)
}

// Parse {gold}text{/gold} syntax
function parseGoldText(text: string | ReactNode): ReactNode {
  if (typeof text !== 'string') return text
  const parts = text.split(/(\{gold\}.*?\{\/gold\})/g)
  return parts.map((part, i) => {
    if (part.startsWith('{gold}')) {
      const content = part.replace('{gold}', '').replace('{/gold}', '')
      return <span key={i} className="text-[#C9A227]">{content}</span>
    }
    return part
  })
}

export function SlideDeck({ slides, startAt = 0, logoPath, showLogo = true }: SlideDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(startAt)

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        if (currentSlide < slides.length - 1) setCurrentSlide(s => s + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (currentSlide > 0) setCurrentSlide(s => s - 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentSlide, slides.length])

  if (!slides?.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
        <p className="text-gray-500">No slides available</p>
      </div>
    )
  }

  const slide = slides[currentSlide]
  const hasPrevious = currentSlide > 0
  const hasNext = currentSlide < slides.length - 1

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-hidden flex items-center justify-center">
      {/* Navigation Arrows */}
      <button
        onClick={() => hasPrevious && setCurrentSlide(s => s - 1)}
        disabled={!hasPrevious}
        className={`absolute left-0 top-0 bottom-0 w-20 bg-transparent border-none text-white text-5xl opacity-30 transition-opacity z-10 font-serif ${hasPrevious ? 'hover:opacity-100 cursor-pointer' : 'cursor-default opacity-10'}`}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={() => hasNext && setCurrentSlide(s => s + 1)}
        disabled={!hasNext}
        className={`absolute right-0 top-0 bottom-0 w-20 bg-transparent border-none text-white text-5xl opacity-30 transition-opacity z-10 font-serif ${hasNext ? 'hover:opacity-100 cursor-pointer' : 'cursor-default opacity-10'}`}
        aria-label="Next"
      >
        ›
      </button>

      {/* Slide Content */}
      <div className="w-full max-w-[1200px] max-h-[90vh] p-[60px_80px] flex flex-col relative box-border overflow-y-auto">
        {/* Bravëtto Logo - Top Left */}
        {logoPath && showLogo && (
          <div className="absolute top-10 left-20 z-10">
            <img 
              src={logoPath} 
              alt="Bravëtto" 
              className="h-16 w-auto"
              style={{ maxWidth: '400px' }}
            />
          </div>
        )}
        
        {slide.phase && (
          <div className="absolute top-10 right-20 text-[11px] font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
            {slide.phase}
          </div>
        )}

        <div className="flex flex-col justify-start pt-8 min-h-0">
          {slide.preTitle && (
            <p className="text-sm text-[#888888] mb-3 italic tracking-[0.02em]">{slide.preTitle}</p>
          )}
          {slide.title && (
            <h1 className="font-serif text-5xl font-normal leading-tight mb-4 tracking-[-0.01em] break-words">
              {parseGoldText(slide.title)}
            </h1>
          )}
          {slide.subtitle && (
            <p className="text-xl text-[#888888] mb-8 font-medium break-words">{slide.subtitle}</p>
          )}
          {slide.giant && (
            <div className="font-serif text-[56px] font-normal leading-[1.3] text-[#C9A227] text-center py-10">
              {slide.giant.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </div>
          )}
          {slide.body && (
            <p className="text-lg leading-[1.7] text-[#CCCCCC] max-w-[800px] mb-6 break-words">{slide.body}</p>
          )}
          {slide.bullets && (
            <ul className="list-none p-0 my-6">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="text-lg leading-[1.6] text-[#CCCCCC] mb-3.5 flex items-start break-words">
                  <span className="text-[#C9A227] mr-4 flex-shrink-0">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {slide.columns && (
            <div className="flex gap-8 mt-8 items-start">
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-[#666666] mb-5 uppercase">AI EXCELS AT</div>
                {slide.columns.left.map((item, i) => (
                  <div key={i} className="text-base text-[#CCCCCC] font-medium mb-3 pl-4 border-l-2 border-[#333333] break-words">{item}</div>
                ))}
              </div>
              <div className="w-px bg-[#333333] self-stretch flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold tracking-[0.15em] text-[#C9A227] mb-5 uppercase">YOU EXCEL AT</div>
                {slide.columns.right.map((item, i) => (
                  <div key={i} className="text-base text-white mb-3 pl-4 border-l-2 border-[#C9A227] break-words">{item}</div>
                ))}
              </div>
            </div>
          )}
          {slide.boxes && (
            <div className="flex gap-6 mt-8 flex-wrap">
              {slide.boxes.map((box, i) => (
                <div key={i} className="flex-[1_1_280px] min-w-[280px] max-w-full bg-[#1A1A1A] p-6 border-t-2 border-[#C9A227] break-words">
                  <div className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A227] mb-2">{box.label}</div>
                  <div className="text-lg font-medium text-white mb-2 break-words">{box.title}</div>
                  <div className="text-sm leading-[1.5] text-[#CCCCCC] font-medium break-words">{box.body}</div>
                </div>
              ))}
            </div>
          )}
          {slide.quote && (
            <blockquote className="font-serif text-2xl italic text-[#CCCCCC] border-l-[3px] border-[#C9A227] pl-6 my-8">
              &ldquo;{slide.quote}&rdquo;
            </blockquote>
          )}
          {slide.code && (
            <pre className="font-mono text-sm bg-[#1A1A1A] p-6 rounded text-[#CCCCCC] overflow-auto my-6">{slide.code}</pre>
          )}
          {slide.example && (
            <div className="bg-[#111111] border-l-[3px] border-[#C9A227] p-6 my-6 rounded-r">
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#C9A227] mb-4 uppercase">Live Example: AbëONE in Action</div>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-[#888888] mb-2 uppercase tracking-wide">You:</div>
                  <div className="font-mono text-sm text-[#CCCCCC] bg-[#1A1A1A] p-3 rounded whitespace-pre-wrap">{slide.example.prompt}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#C9A227] mb-2 uppercase tracking-wide">AbëONE:</div>
                  <div className="font-mono text-sm text-[#C9A227] bg-[#1A1A1A] p-3 rounded whitespace-pre-wrap">{slide.example.response}</div>
                </div>
                {slide.example.context && (
                  <div className="text-xs text-[#888888] italic pt-2 border-t border-[#333333]">
                    {slide.example.context}
                  </div>
                )}
              </div>
            </div>
          )}
          {slide.content && <div className="w-full">{slide.content}</div>}
          {slide.insight && (
            <div className="border-l-[3px] border-[#C9A227] bg-[#111111] p-5 mt-8 mb-4 break-words">
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#C9A227] mb-2 uppercase">KEY INSIGHT</div>
              <div className="text-[15px] leading-[1.6] text-[#AAAAAA] break-words">{slide.insight}</div>
            </div>
          )}
          {slide.footer && (
            <p className="text-base text-[#666666] text-center italic mt-auto pt-6">{slide.footer}</p>
          )}
        </div>
      </div>
    </div>
  )
}
