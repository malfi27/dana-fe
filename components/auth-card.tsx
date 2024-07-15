'use client'

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 sm:mx-0">
      <div className="border-y bg-tertiary p-6 sm:rounded-lg sm:border-x sm:p-10 sm:shadow">
        {children}
      </div>
    </div>
  )
}
