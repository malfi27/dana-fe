'use client'
import type { Selection } from 'react-aria-components'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  GridList,
  GridListItem,
  TextField
} from 'ui'
import { dataDatabases } from '@/app/(in)/database/partials/list-databases'
import React from 'react'

export function AddDatabaseUser() {
  const [selectedDatabases, setSelectedDatabases] = React.useState<Selection>(
    new Set([2])
  )

  const toggleSelectAll = () => {
    if (selectedDatabases !== 'all') {
      setSelectedDatabases('all')
    } else {
      setSelectedDatabases(new Set())
    }
  }
  return (
    <Card id="add-database-user">
      <CardHeader>
        <CardTitle>Add Database User</CardTitle>
        <CardDescription>
          Create a new user for your database. You can use this user to connect
          to your database from your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={() => {}} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField isRequired label="Username" name="username" />
            <TextField isRequired label="Password" name="password" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>
                Set the permissions for this user. You can use these permissions
                to control what this user can do with your database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GridList
                selectedKeys={selectedDatabases}
                onSelectionChange={setSelectedDatabases}
                items={dataDatabases}
                aria-label="Databases"
                selectionMode="multiple"
              >
                {(item) => (
                  <GridListItem textValue={item.name} id={item.name}>
                    {item.name}
                  </GridListItem>
                )}
              </GridList>
            </CardContent>
            <CardFooter className="justify-between">
              <Checkbox id="all" onChange={toggleSelectAll}>
                Select All
              </Checkbox>
              <Button>Add User</Button>
            </CardFooter>
          </Card>
        </Form>
      </CardContent>
    </Card>
  )
}
