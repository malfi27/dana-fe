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
import { IconGalleryFill, IconWallet } from '@irsyadadl/paranoid'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const PaymentSection = () => {
  const query = useSearchParams()
  const merchantId = query.get('merchantId')
  const merchantReferenceNum = query.get('merchantReferenceNum')

  const { data, isLoading } = useGetPGDetail({
    merchantId: merchantId ? merchantId : '',
    merchantReferenceNum: merchantReferenceNum ? merchantReferenceNum : ''
  })
  const { mutateAsync: confirmPaymet, isPending } = useConfirmPayment()

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
                <CardDescription>Secure payment with Dana</CardDescription>
              </div>
            </div>
            <div className="space-y-4 text-end text-sm [&_div]:font-semibold [&_label]:text-muted-fg">
              <div>
                <label>Jumlah Tagihan</label>
                <div>
                  {data?.data?.amount
                    ? //Format idr
                      new Intl.NumberFormat('id-ID', {
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
            <Note intent="secondary">
              <NoteTitle>Perhatian</NoteTitle>
              <NoteDescription className="text-xs">
                Jangan merefresh halaman ini. Pembayaran Anda akan diproses
                secara otomatis. Silakan scan QR dibawah ini menggunakan
                aplikasi DANA dan lakukan aktivitas transfer dana dari akun Anda
                menuju akun yang sudah kami tentukan.
              </NoteDescription>
            </Note>
            <div className="flex items-center justify-center">
              {data?.data?.qrCode && (
                <Image
                  src={data?.data?.qrCode}
                  alt="QR"
                  width={300}
                  height={300}
                />
              )}
              {!data?.data?.qrCode && (
                <div className="flex flex-col items-center py-8">
                  <IconGalleryFill className="size-32 text-muted-fg" />
                  <p className="text-sm text-muted-fg">
                    Mohon Tunggu QR Sedang Diproses... 🤖
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2 p-4">
            <p className="text-center text-xs text-muted-fg">
              Apabila transfer dana sudah selesai, silakan menekan tombol
              dibawah ini untuk menyelesaikan pembayaran Anda.
            </p>
            <Button
              onPress={() => {
                toast.promise(
                  waitForApiResponse(
                    confirmPaymet({
                      id: data?.data?._id
                    })
                  ),
                  {
                    loading: 'Loading...',
                    success: 'Konfirmasi pembayaran berhasil..',
                    error: 'Gagal konfirmasi pembayaran'
                  }
                )
              }}
              isDisabled={!data?.data?.qrCode || isLoading || isPending}
              intent="light/dark"
              className="w-full"
            >
              {isPending
                ? 'Mohon Tunggu...'
                : 'Saya Sudah Transfer, Konfirmasi Pembayaran'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default PaymentSection
