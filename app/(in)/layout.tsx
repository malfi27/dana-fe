// import { Aside } from '@/components/aside'
import { Toaster } from 'ui'
import React from 'react'
import { Aside } from '@/components/aside'
import { Header } from '@/components/header'
// import { Header } from '@/components/header'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-muted/10">
      <Aside />
      <main className="lg:pl-72">
        <div className="min-h-screen border-l border-transparent bg-muted/20 px-4 pb-4 pr-4 sm:px-4 lg:border-border lg:px-6 lg:pb-6">
          <Header />
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  )
}
