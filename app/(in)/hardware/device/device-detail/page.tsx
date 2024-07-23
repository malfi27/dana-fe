import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DetailDevice } from '../../partials/device/detail-device'

export const metadata: Metadata = {
  title: 'Device'
}

function Fallback() {
  return <></>
}

export default function Page() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Fallback />}>
        <DetailDevice />
      </Suspense>
    </div>
  )
}
