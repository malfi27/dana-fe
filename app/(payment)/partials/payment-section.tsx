'use client'

import { useConfirmPayment } from '@/app/api/payment/confirm-payment'
import { useCreatePayment } from '@/app/api/payment/create-payment'
import {
  Button,
  CardDescription,
  CardTitle,
  Note,
  NoteDescription,
  NoteTitle
} from '@/components/ui'
import { waitForApiResponse } from '@/lib/utils'
import { IconGalleryFill, IconWallet } from '@irsyadadl/paranoid'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const PaymentSection = () => {
  const query = useSearchParams()
  const amount = query.get('amount')
  const invoice_number = query.get('invoice_number')

  const [qr, setQr] = useState<string | null>(null)
  //state object to store the qr code
  const [paymentData, setPaymentData] = useState<object | any>(null)

  const { mutateAsync } = useCreatePayment()
  const { mutateAsync: confirmPaymet, isPending } = useConfirmPayment()

  useEffect(() => {
    if (amount && invoice_number) {
      toast.promise(
        waitForApiResponse(
          mutateAsync(
            {
              amount: parseInt(amount),
              invoice_number
            },
            {
              onSuccess: (data) => {
                if (data?.status === 200) {
                  setPaymentData(data?.data?.data)
                  setQr(data?.data?.qr_code)
                }
              }
            }
          )
        ),
        {
          loading: 'Generating QR',
          success: 'Ready to scan',
          error: 'Failed to get QR'
        }
      )
    }
  }, [])

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full items-center justify-center p-6">
        <div className="relative z-50 w-full max-w-[550px] rounded-lg border border-border bg-background">
          <div className="l:items-end flex flex-col justify-between gap-4 border-b p-4 lg:flex-row">
            <div className="flex items-center">
              <div className="mr-3 grid size-10 place-content-center rounded-md border bg-secondary">
                <IconWallet className="size-6 shrink-0" />
              </div>
              <div className="space-y-1">
                <CardTitle>Payment Gateway</CardTitle>
                <CardDescription>Secure payment with PG Dana</CardDescription>
              </div>
            </div>
            <div className="space-y-4 text-end text-sm [&_div]:font-semibold [&_label]:text-muted-fg">
              <div>
                <label>Total Bill</label>
                <div>
                  {paymentData?.amount
                    ? //Format idr
                      new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0
                      }).format(paymentData?.amount)
                    : '-'}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 border-b border-border p-4">
            <Note intent="secondary">
              <NoteTitle>Info</NoteTitle>
              <NoteDescription>
                Please dont refresh this page, your payment will be processed
                automatically
              </NoteDescription>
            </Note>
            <div className="flex items-center justify-center">
              {qr && <Image src={qr} alt="QR" width={300} height={300} />}
              {!qr && (
                <div className="flex flex-col items-center py-8">
                  <IconGalleryFill className="size-32 text-muted-fg" />
                  <p className="text-sm text-muted-fg">
                    Please wait while we generate the QR code
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2 p-4">
            <Button
              onPress={() => {
                toast.promise(
                  waitForApiResponse(
                    confirmPaymet({
                      id: paymentData?._id
                    })
                  ),
                  {
                    loading: 'Please Wait...',
                    success: 'Payment confirmed',
                    error: 'Failed to confirm payment'
                  }
                )
              }}
              isDisabled={!qr || isPending}
              intent="light/dark"
              className="w-full"
            >
              {isPending ? 'Please Wait...' : 'Confirm Payment'}
            </Button>
            <p className="text-center text-xs text-muted-fg">
              Allready paid ? Click this button to confirm your payment
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default PaymentSection
