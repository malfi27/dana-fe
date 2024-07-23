import { Notes } from '@/app/(in)/settings/partials/notes'
import type { Metadata } from 'next'
import { HistoryGateway } from '../partials/history-page'

export const metadata: Metadata = {
  title: 'Tools - History'
}

export default async function Page() {
  return (
    <>
      <div className="space-y-6">
        <HistoryGateway />
      </div>
    </>
  )
}
