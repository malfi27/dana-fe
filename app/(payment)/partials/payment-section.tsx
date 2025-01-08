'use client'

import { useConfirmPayment } from '@/app/api/payment/confirm-payment'
import { useGetPGDetail } from '@/app/api/payment/get-pg-detail'
import {
  Button,
  CardDescription,
  CardTitle,
  Note,
  NoteDescription,
  NoteTitle
} from '@/components/ui'
import { waitForApiResponse } from '@/lib/utils'
import {
  IconGalleryFill,
  IconLoader2,
  IconMoneybagFill,
  IconVerifiedFill,
  IconWallet,
  IconClock,
  IconClockFill
} from '@irsyadadl/paranoid'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

const CountdownTimer = ({ expiresAt }: { expiresAt: string }) => {
  const [timeLeft, setTimeLeft] = useState('')
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    // Format the full date
    const formatDate = () => {
      const expireDate = new Date(expiresAt)
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }

      setFormattedDate(expireDate.toLocaleDateString('id-ID', options))
    }

    // Calculate remaining time
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const expireTime = new Date(expiresAt).getTime()
      const difference = expireTime - now

      if (difference <= 0) {
        setTimeLeft('0 Menit')
        return
      }

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft(
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      )
    }

    formatDate()
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  return (
    <div className="flex flex-row gap-1">
      <span className="font-semibold">
        {formattedDate} Sisa Waktu: {timeLeft}
      </span>
    </div>
  )
}

const ExpiredPaymentView = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center p-6">
      <div className="relative z-50 w-full max-w-[550px] rounded-lg border border-border bg-background p-8">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="text-red-500">
            <IconClockFill className="size-16" />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Pembayaran Kadaluarsa</h2>
            <p className="text-muted-foreground">
              Mohon maaf, batas waktu pembayaran Anda telah berakhir. Silakan
              lakukan pemesanan ulang untuk melanjutkan transaksi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PaymentSection = () => {
  const query = useSearchParams()
  const merchantId = query.get('merchantId')
  const merchantReferenceNum = query.get('merchantReferenceNum')

  const { data, isLoading, refetch } = useGetPGDetail({
    merchantId: merchantId ? merchantId : '',
    merchantReferenceNum: merchantReferenceNum ? merchantReferenceNum : ''
  })
  const { mutateAsync: confirmPaymet, isPending } = useConfirmPayment()

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-screen w-full items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <IconLoader2 className="size-12 animate-spin" />
          <p className="text-muted-fg">Memuat data pembayaran...</p>
        </div>
      </div>
    )
  }

  // Check if payment is expired
  if (data?.data?.expiresAt && new Date(data?.data?.expiresAt) < new Date()) {
    return <ExpiredPaymentView />
  }

  // If payment is already paid, show success message
  if (data?.data?.statusMessage === 'PAID') {
    return (
      <div className="mx-auto flex min-h-screen w-full items-center justify-center p-6">
        <div className="relative z-50 w-full max-w-[550px] rounded-lg border border-border bg-background p-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="text-green-500">
              <IconVerifiedFill className="size-16" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Pembayaran Berhasil!</h2>
              <p className="text-muted-fg">
                Terimakasih, pembayaran Anda telah diterima.
              </p>
              <p className="font-medium">
                Total Pembayaran:{' '}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0
                }).format(data?.data?.amount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Only show payment form if data is loaded and payment is not yet paid
  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center p-6">
      <div className="relative z-50 w-full max-w-[550px] rounded-lg border border-border bg-background">
        <div className="l:items-end flex flex-col justify-between gap-4 border-b p-4 lg:flex-row">
          <div className="flex items-center">
            <div className="mr-3 grid size-10 place-content-center rounded-md border bg-secondary">
              <IconWallet className="size-6 shrink-0" />
            </div>
            <div className="space-y-1">
              <CardTitle>Payment Gateway</CardTitle>
              <CardDescription>Secure payment with Dana</CardDescription>
            </div>
          </div>
          <div className="space-y-4 text-end text-sm [&_div]:font-semibold [&_label]:text-muted-fg">
            <div>
              <label>Jumlah Tagihan</label>
              <div>
                {data?.data?.amount
                  ? new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0
                    }).format(data?.data?.amount)
                  : '-'}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 border-b border-border p-4">
          {data?.data?.automation_id ? (
            <div className="flex flex-col items-center space-y-4 py-8">
              <IconMoneybagFill className="size-16" />
              <div className="text-center">
                <h3 className="text-lg font-medium">
                  Pembayaran Sedang Diproses
                </h3>
                <p className="mt-2 text-sm text-muted-fg">
                  Mohon tunggu hingga proses pembayaran selesai, pembayaran Anda
                  sedang diproses secara otomatis.
                </p>
              </div>
            </div>
          ) : (
            <>
              <Note intent="secondary">
                <NoteTitle>Perhatian</NoteTitle>
                <NoteDescription className="text-xs">
                  Pembayaran Anda akan diproses secara otomatis. Silakan scan QR
                  dibawah ini menggunakan aplikasi DANA dan lakukan aktivitas
                  transfer dana dari akun Anda menuju akun yang sudah kami
                  tentukan.
                </NoteDescription>
              </Note>

              <div className="flex items-center justify-center">
                {data?.data?.qrCode ? (
                  <Image
                    src={data?.data?.qrCode}
                    alt="QR"
                    width={300}
                    height={300}
                  />
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <IconGalleryFill className="size-32 text-muted-fg" />
                    <p className="text-sm text-muted-fg">
                      Mohon Tunggu QR Sedang Diproses... 🤖
                    </p>
                  </div>
                )}
              </div>
              {data?.data?.expiresAt && (
                <Note intent="danger" className="text-xs">
                  Lakukan pembayaran sebelum :{' '}
                  <CountdownTimer expiresAt={data?.data?.expiresAt} />
                </Note>
              )}
            </>
          )}
        </div>
        <div className="space-y-2 p-4">
          <p className="text-center text-xs text-muted-fg">
            {data?.data?.automation_id
              ? 'Mohon tunggu hingga pembayaran selesai diproses.'
              : 'Apabila transfer dana sudah selesai, silakan menekan tombol dibawah ini untuk menyelesaikan pembayaran Anda.'}
          </p>
          <Button
            onPress={() => {
              toast.promise(
                waitForApiResponse(
                  confirmPaymet(
                    {
                      id: data?.data?._id
                    },
                    {
                      onSuccess: (res) => {
                        if (res?.status === 200) {
                          refetch()
                        }
                      }
                    }
                  )
                ),
                {
                  loading: 'Loading...',
                  success: 'Konfirmasi pembayaran berhasil..',
                  error: 'Gagal konfirmasi pembayaran'
                }
              )
            }}
            isDisabled={
              !data?.data?.qrCode ||
              isLoading ||
              isPending ||
              data?.data?.automation_id ||
              (data?.data?.expiresAt &&
                new Date(data?.data?.expiresAt) < new Date()) // check if expired
            }
            intent="light/dark"
            className="w-full"
          >
            {isPending
              ? 'Mohon Tunggu...'
              : data?.data?.automation_id
                ? 'Pembayaran Sedang Diproses'
                : 'Saya Sudah Transfer, Konfirmasi Pembayaran'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSection
