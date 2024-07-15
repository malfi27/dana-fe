'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Snippet
} from 'ui'

const url =
  'mysql+ssh://root@323.332.12.424/root@127.0.0.1/root?name=al32i&usePrivateKey=true'
export function ConnectionUrl() {
  return (
    <Card id="connection-url">
      <CardHeader>
        <CardTitle>Connection URL</CardTitle>
        <CardDescription>
          Use the database connection string below to connect to your database
          from your database client. We recommend using TablePlus. You will need
          to manually provide the database's password that was emailed to you
          when you provisioned this server.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Snippet text={url} />
      </CardContent>
    </Card>
  )
}
