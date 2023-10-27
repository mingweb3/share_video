import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer, Header } from '@/components/layout'
import ClientProviders from '@/utils/clientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home Page | Sharing video',
  description: 'Remitano Test - Sharing Video Site',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1', 
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
