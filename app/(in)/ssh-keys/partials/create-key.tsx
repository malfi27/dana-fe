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
  Select,
  SelectItem,
  Textarea,
  TextField
} from 'ui'

export function CreateKey() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Key</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <Form onSubmit={() => {}}>
        <CardContent>
          <Note intent="info">
            <NoteTitle>Password Does Not Allow</NoteTitle>
            <NoteDescription>
              We will create a new SSH key for you. You can use this key to
              connect to your servers.
            </NoteDescription>
          </Note>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <TextField name="name" label={'Name'} isRequired />
              <Select
                isRequired
                label={'User'}
                name="user"
                placeholder={'jdoyle'}
              >
                <SelectItem id="jdoyle">jdoyle</SelectItem>
                <SelectItem id="kwiegand">kwiegand</SelectItem>
                <SelectItem id="x4kak">x4kak</SelectItem>
              </Select>
            </div>
            <Textarea
              label={'Public Key'}
              className="resize-none"
              id="public_key"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Add Key</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
