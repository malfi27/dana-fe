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

export function ManageRedisPassword() {
  return (
    <Card id="manage-redis-password">
      <CardHeader>
        <CardTitle>Manage Redis Password</CardTitle>
        <CardDescription>
          Change the password for your Redis instance. You can use this password
          to connect to your Redis instance from your application.
        </CardDescription>
      </CardHeader>
      <Form onSubmit={() => {}}>
        <CardContent>
          <TextField
            isRequired
            label="Password"
            type="password"
            id="password"
          />
        </CardContent>
        <CardFooter>
          <Button type="button">Update Redis Password</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
