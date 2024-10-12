import type { Metadata } from 'next'
import { Play } from 'next/font/google'

import './globals.css'

const mainFont = Play({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Web Crypto API - Private Messages',
  description: 'Send secret messages using Web Crypto API 🤫.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${mainFont.className} antialiased bg-slate-800 text-slate-300 text-sm`}
      >
        {children}
      </body>
    </html>
  )
}
