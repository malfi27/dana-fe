import { Metadata } from 'next'
import { ListTeam } from '@/app/(in)/account/partials/list-team'

export const metadata: Metadata = {
  title: 'Team'
}

export default function Page() {
  return (
    <>
      <ListTeam />
    </>
  )
}
