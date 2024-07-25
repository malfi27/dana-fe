import { Contenteditable } from '@/components/contenteditable'
import { Card, CardContent, SectionTitle } from '@/components/ui'

export const AutomationPage = () => {
  return (
    <>
      <SectionTitle
        title="Documentation"
        description="This is the documentation for the automation tools."
        className="px-0"
      />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Withdraw</h1>
              <p className="text-sm text-muted-fg">Methode : POST</p>
              <p className="text-sm text-muted-fg">Endpoint : /api/gateway</p>
            </div>
            <Contenteditable className="bg-background px-4 py-2">
              {ActionWithdrawBody}
            </Contenteditable>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Deposit</h1>
              <p className="text-sm text-muted-fg">Methode : POST</p>
              <p className="text-sm text-muted-fg">Endpoint : /api/gateway</p>
            </div>
            <Contenteditable className="bg-background px-4 py-2">
              {ActionDepositBody}
            </Contenteditable>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

const ActionWithdrawBody = `# Body of the request should be a JSON object with the following properties: action, amount, and receiver. for action transfer
{
    "action" : "Withdraw",
    "amount" : 1000000, 
    "account_number" : "081278152837" (receiver account DANA client),
    "merchantId" : "PGA24-0123",
    "merchantReferenceNum": "INV20240707ABCDEFGHIJKLM",
    "vendorReference": "281012092024071444045074",
}

# DEAFULT JSON FORMAT (DO NOT REMOVE!)
`

const ActionDepositBody = `# Body of the request should be a JSON object with the following properties: action, amount, and receiver. for action transfer
{
    "action" : "Deposit",
    "amount" : 1000000, 
    "merchantId" : "PGA24-0123",
    "merchantReferenceNum" : "INV20240707ABCDEFGHIJKLM",
    "vendorReference": "281012092024071444045074",
    "vendorPaymentReference": "281412050260777484945972",
    "signature": "439030a6da086ee13558137f07d4a27d",

} 
# DEAFULT JSON FORMAT (DO NOT REMOVE!)
`
