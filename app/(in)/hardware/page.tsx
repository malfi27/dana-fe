import type { Metadata } from 'next'
import { ListRacks } from './partials/rack/list-rack'

export const metadata: Metadata = {
  title: 'Hardware'
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ListRacks />
    </div>
  )
}
