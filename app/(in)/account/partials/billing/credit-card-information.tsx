'use client'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Form,
  InputPattern,
  Label,
  SectionTitle,
  TextField
} from 'ui'
import { IconCreditCard } from '@irsyadadl/paranoid'

export function CreditCardInformation() {
  return (
    <Card id="cc-i">
      <SectionTitle
        title={'Credit Card Information'}
        description={'Manage your credit card information'}
      />
      <Form action={() => {}}>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <Label htmlFor="cc-n">Card Number</Label>
            <InputPattern
              id="cc-n"
              placeholder="xxxx xxxx xxxx xxxx"
              format="#### #### #### ####"
              suffix={<IconCreditCard />}
            />
          </div>
          <TextField label="Cardholder Name" placeholder="Cardholder Name" />
          <div className="flex items-center gap-6">
            <div className="max-w-[10rem] space-y-1">
              <TextField label="mm/yyyy" placeholder="mm/yyyy" />
            </div>
            <div className="space-y-1">
              <TextField label="Security code" placeholder="CVV" />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
