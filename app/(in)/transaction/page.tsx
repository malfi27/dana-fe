import type { Metadata } from 'next'
import { TransactionPage } from './partials/transaction-page'

export const metadata: Metadata = {
  title: 'Transaction'
}

export default async function Page() {
  return (
    <>
      <TransactionPage />
    </>
  )
}
