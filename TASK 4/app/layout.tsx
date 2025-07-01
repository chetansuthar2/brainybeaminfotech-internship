import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Drag & Drop App',
  description: 'Image Upload Application',
  generator: 'Custom App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
