import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ORU Social Women\'s Health Portal',
  description: 'Clear, compassionate women\'s health education and trusted pathways to care from ORU Social.',
  generator: 'ORU Social',
  icons: {
    icon: [
      {
        url: '/oru-social-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/oru-social-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/oru-social-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
