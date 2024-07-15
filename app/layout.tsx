import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './app.css'
import { Provider } from './provider'
import { Toaster } from 'ui/toaster'

const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Provision',
  description: 'Provision your servers with ease.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${geistMono.variable} font-mono font-sans`}
      >
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  )
}
