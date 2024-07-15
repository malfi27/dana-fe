'use client'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  TextField
} from 'ui'
import { toast } from 'sonner'
import { wait } from '@/lib/utils'

export function CreateDatabase() {
  async function create() {
    toast.promise(wait(2000), {
      loading: 'Creating database...',
      success: 'Database created.',
      error: 'Failed to create database.'
    })
  }
  return (
    <Card id="create-database">
      <CardHeader>
        <CardTitle>Create Database</CardTitle>
        <CardDescription>
          Create a new database for your application. You can use this database
          to store your application's data.
        </CardDescription>
      </CardHeader>
      <Form action={create}>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField isRequired label="Name" name="dn" />
              <TextField isRequired label="Username" name="du" />
            </div>
            <TextField isRequired label="Password" name="dp" type="password" />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button type="submit">Create Database</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
