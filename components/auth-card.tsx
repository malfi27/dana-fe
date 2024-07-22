'use client'

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-20 flex h-full min-h-screen w-full border-r border-border bg-background px-10 py-12 lg:max-w-lg lg:items-center">
      <div className="w-full">{children}</div>
    </div>
  )
}
