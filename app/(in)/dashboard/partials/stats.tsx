'use client'

import { Card, CardDescription, CardHeader, CardTitle } from 'ui'
import { serverDetails } from '@/app/(in)/servers/partials/list-servers'
import { dataSites } from '@/app/(in)/sites/partials/list-sites'
import dataLogs from '@/data/logs.json'
import { LogEntry } from '@/app/(in)/logs/page'
import { IconFolder, IconHdd, IconNotes } from '@irsyadadl/paranoid'

export function Stats() {
  const logs: LogEntry[] = dataLogs
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="relative flex items-center justify-between p-6">
        <CardHeader className="p-0">
          <CardTitle>{serverDetails.length}</CardTitle>
          <CardDescription>Total Servers</CardDescription>
        </CardHeader>

        <Icon icon={IconHdd} />
      </Card>
      <Card className="relative flex items-center justify-between p-6">
        <CardHeader className="p-0">
          <CardTitle>{dataSites.length}</CardTitle>
          <CardDescription>Total sites</CardDescription>
        </CardHeader>
        <Icon icon={IconFolder} />
      </Card>
      <Card className="relative flex items-center justify-between p-6">
        <CardHeader className="p-0">
          <CardTitle>{logs.length}</CardTitle>
          <CardDescription>Total logs</CardDescription>
        </CardHeader>
        <Icon icon={IconNotes} />
      </Card>
    </div>
  )
}

export function Icon({
  icon: Unless
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}) {
  return (
    <div className="grid size-10 place-content-center rounded-full border bg-tertiary [&_svg]:size-5 [&_svg]:text-fg/80">
      <Unless />
    </div>
  )
}
