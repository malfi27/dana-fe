import { ServerResources } from '@/app/(in)/monitoring/partials/server-resources'
import type { Metadata } from 'next'
import { Stats } from '@/app/(in)/dashboard/partials/stats'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function Page() {
  return (
    <div className="space-y-6">
      <Stats />
      <ServerResources />
    </div>
  )
}
