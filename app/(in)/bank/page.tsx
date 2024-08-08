import type { Metadata } from 'next'
import { ListBank } from './partials/list-bank'

export const metadata: Metadata = {
  title: 'Database Bank'
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ListBank />
    </div>
  )
}
