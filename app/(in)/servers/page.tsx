import { ListServers } from '@/app/(in)/servers/partials/list-servers'
import type { Metadata } from 'next'
import { RecentEvents } from '@/app/(in)/servers/partials/recent-events'

export const metadata: Metadata = {
  title: 'Servers'
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ListServers />
      <RecentEvents />
    </div>
  )
}
