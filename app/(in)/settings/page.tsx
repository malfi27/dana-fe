import { Notes } from '@/app/(in)/settings/partials/notes'
import { ServerPublicKey } from '@/app/(in)/settings/partials/server-public-key'
import type { Metadata } from 'next'
import { ServerSettings } from '@/app/(in)/settings/partials/server-settings'

export const metadata: Metadata = {
  title: 'Settings'
}

async function getTzs() {
  const response = await fetch('https://worldtimeapi.org/api/timezone')
  const data = await response.json()
  return data.map((tz: any) => {
    return {
      label: tz,
      value: tz
    }
  })
}

export default async function Page() {
  const timezones = await getTzs()
  return (
    <>
      <div className="space-y-6">
        <Notes />
        <ServerSettings timezones={timezones} />
        <ServerPublicKey />
      </div>
    </>
  )
}
