'use client'

/**
 * Purchase Page - Complete Convergence Implementation
 * 
 * Pattern: PURCHASE × STRIPE × ABEKEYS × CONVERGENCE × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (YAGNI × JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import type { Stripe } from '@stripe/stripe-js'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function PurchasePage() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
  const [stripeLoading, setStripeLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch publishable key from API (server-side reads AbëKEYs)
    fetch('/api/stripe-config')
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(errorData.error || `HTTP ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        if (data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey))
          setStripeLoading(false)
        } else {
          throw new Error('Publishable key missing from response')
        }
      })
      .catch(err => {
        console.error('Failed to load Stripe config:', err)
        setError('Failed to load payment configuration. Please refresh the page.')
        setStripeLoading(false)
      })
  }, [])

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError('Email is required')
      return false
    }
    if (!EMAIL_REGEX.test(value)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    setEmailError(null)
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailError) {
      validateEmail(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    if (!validateEmail(email)) {
      return
    }

    if (!stripePromise) {
      setError('Stripe not loaded. Please refresh the page.')
      return
    }

    setProcessing(true)
    setError(null)

    try {
      // Call API route to create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      // Handle non-JSON responses
      let data
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const text = await response.text()
        throw new Error(`Server error: ${text || response.statusText}`)
      }

      if (!response.ok) {
        throw new Error(data.error || `Payment processing error (${response.status})`)
      }

      if (!data.sessionId) {
        throw new Error('No session ID received from server')
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe instance not available')
      }

      // Type assertion needed - redirectToCheckout exists on Stripe instance from loadStripe
      const result = await (stripe as any).redirectToCheckout({ sessionId: data.sessionId })
      
      if (result.error) {
        throw new Error(result.error.message || 'Failed to redirect to checkout')
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      setError(error.message || 'Payment processing error. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
        {/* Bravëtto Logo - Top Left */}
        <div className="absolute top-8 left-8 z-10">
          <img 
            src="/brand/AI-Image-Editor-2025-12-04_10-01-06.png" 
            alt="Bravëtto" 
            className="h-16 w-auto"
            style={{ maxWidth: '400px' }}
            loading="eager"
          />
        </div>

      <div className="max-w-[1000px] mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl font-normal mb-4 tracking-[-0.01em]">
            30-Day <span className="text-[#C9A227]">Convergence Sprint</span>
          </h1>
          <p className="text-xl text-[#888888] font-light">
            Master the Convergence Loop Pattern • Own It Forever
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Features & Benefits */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-[#C9A227] uppercase mb-6">
                What You're Getting
              </h2>
              
              <div className="space-y-6">
                {/* Core Sprint Features */}
                <div className="bg-[#1A1A1A] p-6 border-t-2 border-[#C9A227]">
                  <div className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A227] mb-2">01</div>
                  <div className="text-lg font-medium text-white mb-2">Weekly Live Sessions</div>
                  <div className="text-sm leading-[1.5] text-[#888888]">4 focused walkthroughs applying the Convergence Loop to common dev scenarios</div>
                </div>

                <div className="bg-[#1A1A1A] p-6 border-t-2 border-[#C9A227]">
                  <div className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A227] mb-2">02</div>
                  <div className="text-lg font-medium text-white mb-2">Hands-On Clinics</div>
                  <div className="text-sm leading-[1.5] text-[#888888]">4 sessions where you bring your actual tasks—we co-guide AI together</div>
                </div>

                <div className="bg-[#1A1A1A] p-6 border-t-2 border-[#C9A227]">
                  <div className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A227] mb-2">03</div>
                  <div className="text-lg font-medium text-white mb-2">47-Page Methodology Guide</div>
                  <div className="text-sm leading-[1.5] text-[#888888]">Complete reference guide to the Convergence Loop pattern</div>
                </div>

                <div className="bg-[#1A1A1A] p-6 border-t-2 border-[#C9A227]">
                  <div className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A227] mb-2">04</div>
                  <div className="text-lg font-medium text-white mb-2">3-Step Integration Checklist</div>
                  <div className="text-sm leading-[1.5] text-[#888888]">Quick-start implementation guide for your workflow</div>
                </div>

                <div className="bg-[#1A1A1A] p-6 border-t-2 border-[#C9A227]">
                  <div className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A227] mb-2">05</div>
                  <div className="text-lg font-medium text-white mb-2">Validation Toolkit Access</div>
                  <div className="text-sm leading-[1.5] text-[#888888]">MIT-licensed open-source toolkit: Phantom Detector, Security Scanner, Test Generator</div>
                </div>

                <div className="bg-[#1A1A1A] p-6 border-t-2 border-[#C9A227]">
                  <div className="text-[11px] font-semibold tracking-[0.1em] text-[#C9A227] mb-2">06</div>
                  <div className="text-lg font-medium text-white mb-2">Private Community Access</div>
                  <div className="text-sm leading-[1.5] text-[#888888]">Direct access to support, recordings, templates, and fellow developers</div>
                </div>

                {/* Bonus: 1 Month Free Guards/Guardians */}
                <div className="bg-[#111111] p-6 border-l-[3px] border-[#C9A227] mt-8">
                  <div className="text-[10px] font-bold tracking-[0.2em] text-[#C9A227] mb-2 uppercase">BONUS</div>
                  <div className="text-lg font-medium text-white mb-2">1 Month Free: Guards & Guardians</div>
                  <div className="text-sm leading-[1.5] text-[#AAAAAA]">
                    As Guards and Guardians roll out over the next 30 days, you'll receive 1 month free access to all services (BiasGuard, TokenGuard, TrustGuard, ContextGuard, SecurityGuard, PrivacyGuard, HealthGuard). $99 value included.
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="border-l-[3px] border-[#C9A227] bg-[#111111] p-5">
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#C9A227] mb-2 uppercase">GUARANTEE</div>
              <div className="text-[15px] leading-[1.6] text-[#AAAAAA]">
                60-Day Money-Back Guarantee. If you're not completely satisfied, we'll refund every penny. No questions asked.
              </div>
            </div>
          </div>

          {/* Right: Checkout Form */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-8">
            <div className="bg-[#1A1A1A] p-8 border-t-2 border-[#C9A227]">
              <div className="mb-8">
                <div className="text-4xl font-serif mb-2">
                  <span className="text-[#C9A227]">$497</span>
                </div>
                <div className="text-sm text-[#888888]">
                  One-time payment • Yours forever
                </div>
                <div className="text-xs text-[#666666] mt-2 line-through">
                  Regular price: $697
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#CCCCCC] mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => validateEmail(email)}
                    required
                    aria-required="true"
                    aria-invalid={emailError ? 'true' : 'false'}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    autoComplete="email"
                    className={`w-full px-4 py-3 bg-[#0A0A0A] border ${
                      emailError ? 'border-red-500' : 'border-[#333333]'
                    } text-white placeholder:text-[#666666] rounded focus:outline-none focus:border-[#C9A227] transition-colors`}
                    placeholder="your@email.com"
                    disabled={processing || stripeLoading}
                  />
                  {emailError && (
                    <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                      {emailError}
                    </p>
                  )}
                </div>

                {error && (
                  <div 
                    className="bg-red-900/20 border border-red-500/50 text-red-400 text-sm p-3 rounded mb-4"
                    role="alert"
                    aria-live="polite"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing || !stripePromise || stripeLoading || !!emailError}
                  className="w-full bg-[#C9A227] text-[#0A0A0A] font-semibold py-4 px-6 rounded hover:bg-[#B8941F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                  aria-busy={processing}
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0A0A0A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : stripeLoading ? (
                    'Loading payment system...'
                  ) : (
                    'Complete Purchase'
                  )}
                </button>

                <div className="text-xs text-[#666666] text-center">
                  Secure checkout • 60-day guarantee • No recurring fees
                </div>
              </form>

              {/* Value Proposition */}
              <div className="mt-8 pt-8 border-t border-[#333333]">
                <div className="text-sm text-[#CCCCCC] mb-4">
                  <strong className="text-[#C9A227]">Save 30+ hours/month</strong> = $18,000/year
                </div>
                <div className="text-xs text-[#888888]">
                  This investment pays for itself in the first week.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-[#666666]">
          <p>
            MIT Licensed • Open Source • 12 Months Validated • Founder's Launch: Only 50 Spots
          </p>
        </div>
      </div>
    </div>
  )
}

