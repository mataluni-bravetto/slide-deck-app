'use client'

/**
 * Purchase Cancel Page
 * Pattern: CANCEL × PURCHASE × CONVERGENCE × ONE
 * Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-[800px] mx-auto px-8 py-16">
        <div className="text-center">
          <h1 className="font-serif text-5xl font-normal mb-4 text-[#C9A227]">
            Purchase Cancelled
          </h1>
          <p className="text-xl text-[#888888] mb-8">
            No charges were made. Your payment was cancelled.
          </p>
          
          <div className="bg-[#1A1A1A] p-8 border-t-2 border-[#C9A227] mb-8">
            <p className="text-sm text-[#888888] mb-6">
              If you changed your mind or encountered an issue, we're here to help. 
              You can return to the purchase page anytime to complete your order.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/convergence-purchase"
                className="inline-block bg-[#C9A227] text-[#0A0A0A] font-semibold py-3 px-8 rounded hover:bg-[#B8941F] transition-colors"
              >
                Return to Purchase Page
              </Link>
              
              <div className="text-xs text-[#666666] mt-4">
                <p>Questions? Contact us at support@aiguardian.ai</p>
              </div>
            </div>
          </div>

          {/* Value Reminder */}
          <div className="bg-[#111111] p-6 border-l-[3px] border-[#C9A227] text-left">
            <div className="text-sm text-[#CCCCCC] mb-2">
              <strong className="text-[#C9A227]">Remember:</strong> This investment pays for itself in the first week.
            </div>
            <div className="text-xs text-[#888888]">
              Save 30+ hours/month = $18,000/year in developer time.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

