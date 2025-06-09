// app/(auth)/layout.tsx or app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In - a Board',
  description: 'Sign in to the a Board platform'
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='w-full h-full m-0 p-0 bg-[#243831] !important overflow-hidden'>{children}</body>
    </html>
  )
}
