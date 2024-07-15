import { Logo } from '@/components/logo'
import Link from 'next/link'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex items-center justify-center sm:min-h-screen">
      <div className="mx-auto w-full max-w-[39rem] px-4 py-12 sm:p-8 lg:p-12">
        <Link
          href="/dashboard"
          className="mb-4 flex items-center gap-x-2 sm:mb-8"
        >
          <Logo />
          <span className="font-mono text-sm font-semibold tracking-tight">
            Provision
          </span>
        </Link>
        {children}
      </div>
    </main>
  )
}
