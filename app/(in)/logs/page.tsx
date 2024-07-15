import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'ui'

import dataLogs from '@/data/logs.json'
import { Contenteditable } from '@/components/contenteditable'
import { Attr } from '@/app/(in)/logs/_partials/attr'
import { ListLogs } from '@/app/(in)/logs/_partials/list-logs'

export const metadata: Metadata = {
  title: 'Logs'
}

/*
// If you want to make something like this, make sure the .env file is ready to use! See (.env.example)
async function getJsonData() {
    const res = await fetch(`${process.env.APP_URL}/api/logs`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
 */

export interface LogEntry {
  timestamp: string
  message: string
}

export default async function Page() {
  /*
        // access the logs from the server
        const logs: LogEntry[] = await getJsonData();
    */
  const logs: LogEntry[] = dataLogs

  return (
    <div>
      <Card>
        <div className="mb-2 flex flex-col justify-between md:flex-row">
          <CardHeader>
            <CardTitle>Logs</CardTitle>
            <CardDescription>
              You can view the logs of your server here.
            </CardDescription>
          </CardHeader>
          <Attr />
        </div>
        <CardContent>
          <Contenteditable>
            <ListLogs logs={logs} />
          </Contenteditable>
        </CardContent>
      </Card>
    </div>
  )
}
