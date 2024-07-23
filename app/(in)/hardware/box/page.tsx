import type { Metadata } from 'next'
import { ListBox } from '../partials/box/list-box'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Box'
}
function SearchBarFallback() {
  return <></>
}
export default function Page() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<SearchBarFallback />}>
        <ListBox />
      </Suspense>
    </div>
  )
}
