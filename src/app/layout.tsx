// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'a board',
  description: 'A board is a simple and elegant platform for sharing ideas and thoughts.'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body id='__next' className='min-h-screen overflow-x-hidden w-full'>
        {children}
      </body>
    </html>
  )
}
