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
  Textarea
} from 'ui'

export function Notes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>
          You may add notes to your server to help you remember important
          information about it.
        </CardDescription>
      </CardHeader>
      <Form onSubmit={() => {}}>
        <CardContent>
          <Textarea />
        </CardContent>
        <CardFooter>
          <Button>Add Note</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
