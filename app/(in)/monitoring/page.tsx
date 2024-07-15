import { ServerResources } from '@/app/(in)/monitoring/partials/server-resources'
import { Stats } from '@/app/(in)/monitoring/partials/stats'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Monitoring'
}
export default function Page() {
  return (
    <>
      <div className="space-y-6">
        <Stats />
        <ServerResources />
      </div>
    </>
  )
}
