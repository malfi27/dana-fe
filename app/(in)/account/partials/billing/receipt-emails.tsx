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

export function ReceiptEmails() {
  return (
    <Card id="receipt-emails">
      <SectionTitle
        title="Receipt Email and Billing Information"
        description=" We will send a receipt download link to the email addresses that you specify below. You may separate multiple email addresses using commas. We will always send the receipt to the email address associated to your email address."
      />
      <Form onSubmit={() => {}}>
        <CardContent>
          <div className="space-y-6">
            <TextField isRequired label="Email Address" name="email" />
            <TextField
              isRequired
              label="Extra Billing Information"
              name="ebi"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
