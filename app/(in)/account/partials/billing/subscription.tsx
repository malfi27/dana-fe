'use client'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Note,
  NoteDescription,
  NoteTitle,
  SectionTitle
} from 'ui'

export function Subscription() {
  return (
    <Card id="subscription">
      <SectionTitle
        title="Subscription"
        description="Manage your subscription"
      />
      <CardContent>
        <Note>
          <NoteTitle>Growth Plan</NoteTitle>
          <NoteDescription>
            You're currently subscribed to the <strong>Growth plan</strong>. To
            manage or cancel your subscription, click the "Manage Subscription"
            button below.
          </NoteDescription>
        </Note>
      </CardContent>
      <CardFooter>
        <Button>Manage Subscription</Button>
      </CardFooter>
    </Card>
  )
}
