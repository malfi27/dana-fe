import { TransactionStatistic } from '../transaction/partials/transaction-statistic'
import AutomationComponentDashboard from './partials/component'

export default function Page() {
  return (
    <>
      <div className="space-y-4">
        <AutomationComponentDashboard />
        <TransactionStatistic />
      </div>
    </>
  )
}
