import Slidebar from '@/components/slidebar/Slidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import QuerryProvider from '@/components/QuerryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atithigram',
  description: 'Explore other Functions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuerryProvider>

          <Slidebar />
          {children}
        </QuerryProvider>
      </body>
    </html>
  )
}
