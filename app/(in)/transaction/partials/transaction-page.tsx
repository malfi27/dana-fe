'use client'
import { TransactionTable } from './table-transaction'
import { TransactionStatistic } from './transaction-statistic'

export const TransactionPage = () => {
  return (
    <>
      <div className="space-y-6">
        <TransactionStatistic />
        <TransactionTable />
      </div>
    </>
  )
}
