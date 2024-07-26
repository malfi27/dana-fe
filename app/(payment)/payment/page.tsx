import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentSection from '../partials/payment-section'

export const metadata: Metadata = {
  title: 'Payment'
}

function Fallback() {
  return <></>
}

export default function Page() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Fallback />}>
        <PaymentSection />
      </Suspense>
    </div>
  )
}
