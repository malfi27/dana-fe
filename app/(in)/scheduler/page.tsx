import type { Metadata } from 'next'
import { NewSchedule } from '@/app/(in)/scheduler/partials/new-schedule'
import { ListSchedules } from '@/app/(in)/scheduler/partials/list-schedules'

export const metadata: Metadata = {
  title: 'Scheduler'
}
export default function Page() {
  return (
    <>
      <div className="space-y-6">
        <NewSchedule />
        <ListSchedules />
      </div>
    </>
  )
}
