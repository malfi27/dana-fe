import type { Metadata } from 'next'
import { Versions } from '@/app/(in)/php/partials/versions'
import { Max } from '@/app/(in)/php/partials/max'
import { Opcache } from '@/app/(in)/php/partials/opcache'

export const metadata: Metadata = {
  title: 'PHP'
}

export default function Page() {
  return (
    <>
      <div className="space-y-6">
        <Versions />
        <Max />
        <Opcache />
      </div>
    </>
  )
}
