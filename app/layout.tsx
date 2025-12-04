import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guardian Convergence Presentation',
  description: 'Guardian Convergence Loop - Premium Presentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

