import type { Metadata } from 'next'
import { ListGroup } from './partials/list-group'

export const metadata: Metadata = {
  title: 'Group'
}

export default async function Page() {
  return (
    <>
      <ListGroup />
    </>
  )
}
