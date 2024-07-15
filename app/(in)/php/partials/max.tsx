'use client'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Form,
  SectionTitle,
  TextField
} from 'ui'
import { toast } from 'sonner'

export function Max() {
  function saveMaxUploadSize() {
    toast.success('Max file upload size saved')
  }

  function saveMaxExecutionTime() {
    toast.success('Max execution time saved')
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <SectionTitle
          title="Max File Upload Size"
          description="The maximum file size you can upload to the server."
        />
        <Form onSubmit={saveMaxUploadSize}>
          <CardContent>
            <TextField isRequired placeholder="2" />
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Save</Button>
          </CardFooter>
        </Form>
      </Card>
      <Card>
        <SectionTitle
          title="Max Execution Time"
          description="The maximum time a script is allowed to run"
        />
        <Form onSubmit={saveMaxExecutionTime}>
          <CardContent>
            <TextField isRequired placeholder="120" />
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Save</Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  )
}
