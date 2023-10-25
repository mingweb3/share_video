import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer, Header } from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home Page | Sharing video',
  description: 'Remitano Test - Sharing Video Site'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
