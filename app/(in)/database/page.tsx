import { ConnectionUrl } from '@/app/(in)/database/partials/connection-url'
import { CreateDatabase } from '@/app/(in)/database/partials/create-database'
import { ListDatabases } from '@/app/(in)/database/partials/list-databases'
import { AddDatabaseUser } from '@/app/(in)/database/partials/add-database-user'
import { DatabaseUsers } from '@/app/(in)/database/partials/database-users'
import { ManageDatabasePassword } from '@/app/(in)/database/partials/manage-database-password'
import { Card, CardContent, CardHeader, CardTitle, Link } from 'ui'
import type { Metadata } from 'next'
import { ManageRedisPassword } from '@/app/(in)/database/partials/manage-redis-password'

export const metadata: Metadata = {
  title: 'Database'
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6 sm:grid-cols-3 lg:grid">
      <div className="lg:col-span-1">
        <Card className="sticky top-10 z-10">
          <CardHeader>
            <CardTitle>Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 [&_a:hover]:text-fg [&_a:hover]:underline [&_a]:text-muted-fg lg:[&_a]:text-sm">
              <li>
                <Link href="#connection-url">Connection URL</Link>
              </li>
              <li>
                <Link href="#create-database">Create Database</Link>
              </li>
              <li>
                <Link href="#list-databases">List Databases</Link>
              </li>
              <li>
                <Link href="#add-database-user">Add Database User</Link>
              </li>
              <li>
                <Link href="#database-users">Database Users</Link>
              </li>
              <li>
                <Link href="#manage-database-password">
                  Manage Database Password
                </Link>
              </li>
              <li>
                <Link href="#manage-redis-password">Manage Redis Password</Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6 sm:col-span-2 [&>div]:scroll-mt-20">
        <ConnectionUrl />
        <CreateDatabase />
        <ListDatabases />
        <AddDatabaseUser />
        <DatabaseUsers />
        <ManageDatabasePassword />
        <ManageRedisPassword />
      </div>
    </div>
  )
}
