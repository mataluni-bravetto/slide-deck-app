import { Metadata } from 'next'

/**
 * Purchase Page Layout - Metadata
 * Pattern: METADATA × SEO × CONVERGENCE × ONE
 * ∞ AbëONE ∞
 */

export const metadata: Metadata = {
  title: '30-Day Convergence Sprint | Purchase',
  description: 'Master the Convergence Loop Pattern. 30-Day Sprint with live sessions, hands-on clinics, methodology guide, and validation toolkit. $497 one-time payment.',
  keywords: ['convergence loop', 'AI development', 'developer training', 'methodology', 'sprint'],
  openGraph: {
    title: '30-Day Convergence Sprint',
    description: 'Master the Convergence Loop Pattern • Own It Forever',
    type: 'website',
    url: 'https://aiguardian.ai/convergence-purchase',
  },
  twitter: {
    card: 'summary_large_image',
    title: '30-Day Convergence Sprint',
    description: 'Master the Convergence Loop Pattern • Own It Forever',
  },
  alternates: {
    canonical: 'https://aiguardian.ai/convergence-purchase',
  },
}

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

