'use client'
import { Collection } from 'react-aria-components'
import { LogEntry } from '@/app/(in)/logs/page'

export function ListLogs({ logs }: { logs: LogEntry[] }) {
  return (
    <Collection items={logs}>
      {(log) => (
        <div id={log.timestamp}>
          <span className="text-muted-fg">{log.timestamp}</span>
          <span className="mx-1">-</span>
          {log.message}
        </div>
      )}
    </Collection>
  )
}
