import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle, Link } from 'ui'
import { Subscription } from '@/app/(in)/account/partials/billing/subscription'
import { CreditCardInformation } from '@/app/(in)/account/partials/billing/credit-card-information'
import { ReceiptEmails } from '@/app/(in)/account/partials/billing/receipt-emails'
import { Receipts } from '@/app/(in)/account/partials/billing/receipts'

export const metadata: Metadata = {
  title: 'Billing'
}

export default function Page() {
  return (
    <>
      <div className="grid items-start gap-6 md:grid-cols-3">
        <div className="top-[5.5rem] z-10 col-span-1 lg:sticky">
          <Card>
            <CardHeader>
              <CardTitle>Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 [&_a:hover]:underline lg:[&_a]:text-sm">
                <li>
                  <Link href="#subscription">Subscription</Link>
                </li>
                <li>
                  <Link href="#cc-i">Credit Card Information</Link>
                </li>
                <li>
                  <Link href="#receipt-emails">
                    Receipt Emails & Billing Information
                  </Link>
                </li>
                <li>
                  <Link href="#receipts">Receipts</Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 sm:col-span-2 [&>div]:scroll-mt-[5.5rem]">
          <Subscription />
          <CreditCardInformation />
          <ReceiptEmails />
          <Receipts />
        </div>
      </div>
    </>
  )
}
