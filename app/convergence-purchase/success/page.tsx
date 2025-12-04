'use client'

/**
 * Checkout Success Page
 * Pattern: STRIPE × SUCCESS × PAGE × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verify payment with your backend if needed
    if (sessionId) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Verifying payment...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-[800px] mx-auto px-8 py-16">
        <div className="text-center">
          <h1 className="font-serif text-5xl font-normal mb-4 text-[#C9A227]">
            Payment Successful!
          </h1>
          <p className="text-xl text-[#888888] mb-8">
            Thank you for your purchase. Check your email for access details.
          </p>
          <div className="bg-[#1A1A1A] p-8 border-t-2 border-[#C9A227]">
            <p className="text-sm text-[#888888] mb-4">
              Your 30-Day Convergence Sprint access will be sent to your email shortly.
            </p>
            {sessionId && (
              <p className="text-xs text-[#666666]">
                Session ID: {sessionId}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

