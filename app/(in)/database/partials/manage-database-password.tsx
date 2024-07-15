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
  Note,
  NoteDescription,
  NoteTitle,
  TextField
} from 'ui'

export function ManageDatabasePassword() {
  return (
    <Card id="manage-database-password">
      <CardHeader>
        <CardTitle>Manage Database Password</CardTitle>
        <CardDescription>
          Change the password for your database. You can use this password to
          connect to your database from your application.
        </CardDescription>
      </CardHeader>
      <Form>
        <CardContent className="space-y-6">
          <Note intent="info">
            <NoteTitle>Heads up!</NoteTitle>
            <NoteDescription>
              This will update the default database user password. Please store
              the password in a secure password manager as it will not be shown
              again.
            </NoteDescription>
          </Note>

          <TextField isRequired label="Old Password" name="oldPassword" />
          <TextField isRequired label="New Password" name="newPassword" />
        </CardContent>
        <CardFooter>
          <Button type="submit">Update Password</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
