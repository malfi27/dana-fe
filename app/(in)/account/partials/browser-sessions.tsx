'use client'
import { Button, Card, CardFooter, Form, SectionTitle } from 'ui'

export function BrowserSessions() {
  return (
    <Card id="browser-sessions">
      <SectionTitle
        title="Browser Sessions"
        description="Manage and logout your active sessions"
      />
      <Form onSubmit={() => {}}>
        <CardFooter>
          <Button>Log out Other Browser Sessions</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
