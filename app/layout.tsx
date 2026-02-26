import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import WishlistProvider from '@/components/store/WishlistProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'TechStore — Hardware de computación',
  description: 'Los mejores componentes al mejor precio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-black text-white antialiased`}>
        <WishlistProvider />
        {children}
      </body>
    </html>
  )
}