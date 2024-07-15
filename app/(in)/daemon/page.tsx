import type { Metadata } from 'next'
import { NewDaemon } from '@/app/(in)/daemon/partials/new-daemon'
import { ListDaemons } from '@/app/(in)/daemon/partials/list-daemons'

export const metadata: Metadata = {
  title: 'Daemon'
}
export default function Page() {
  return (
    <div className="space-y-6">
      <NewDaemon />
      <ListDaemons />
    </div>
  )
}
