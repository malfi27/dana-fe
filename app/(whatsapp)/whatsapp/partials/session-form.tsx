'use client'

import { useCreateWhatsapp } from '@/app/api/whatsapp/create-whatsapp'
import { useGenerateQRCode } from '@/app/api/whatsapp/scan-whatsapp'
import { Note, NoteDescription, NoteTitle } from '@/components/ui'
import { waitForApiResponse } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from 'ui/button'
import { Form } from 'ui/form'
import { TextField } from 'ui/text-field'
import Cookies from 'js-cookie'

export function WhatsappSessionForm() {
  const [form, setForm] = useState<WhatsappSessionFormProps>({
    whatsapp_number: ''
  })

  const [countdown, setCountdown] = useState<number | null>(null)
  const [storedNumber, setStoredNumber] = useState<string | null>(null)

  useEffect(() => {
    const savedCountdown = Cookies.get('countdown-whatsapp-qr')
    const savedNumber = Cookies.get('countdown-whatsapp-number')
    if (savedCountdown && savedNumber) {
      setCountdown(parseInt(savedCountdown))
      setStoredNumber(savedNumber)
    }
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown !== null && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            Cookies.remove('countdown-whatsapp-qr')
            Cookies.remove('countdown-whatsapp-number')
            clearInterval(timer)
            return null
          }
          Cookies.set('countdown-whatsapp-qr', (prev - 1).toString(), {
            expires: new Date(Date.now() + 1000 * (prev - 1))
          })
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  // Data fetching
  const { data: resAccount, mutateAsync, isPending } = useCreateWhatsapp()
  const {
    data: resQr,
    mutateAsync: mutateGenerateQrCode,
    isPending: pendingGenerateQR
  } = useGenerateQRCode()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsapp_number = form.whatsapp_number

    // Check if the countdown should be applied for the same number
    if (
      storedNumber === whatsapp_number &&
      countdown !== null &&
      countdown > 0
    ) {
      toast.error(
        'Mohon tunggu selama ' +
          countdown +
          ' detik sebelum menghasilkan Kode QR baru untuk nomor yang sama, dan jika Anda sudah memindai Kode QR tersebut, harap tunggu selama 30 Detik setelah pemindaian.'
      )
      return
    }

    toast.promise(
      waitForApiResponse(
        mutateAsync(
          {
            whatsapp_number: whatsapp_number
          },
          {
            onSuccess: (data) => {
              if (data?.status === 200) {
                toast.promise(
                  waitForApiResponse(
                    mutateGenerateQrCode(
                      {
                        session: whatsapp_number,
                        requestType: 'connection'
                      },
                      {
                        onSuccess: () => {
                          setCountdown(30)
                          setStoredNumber(whatsapp_number)
                          Cookies.set('countdown-whatsapp-qr', '30', {
                            expires: new Date(Date.now() + 30000)
                          })
                          Cookies.set(
                            'countdown-whatsapp-number',
                            whatsapp_number,
                            {
                              expires: new Date(Date.now() + 30000)
                            }
                          )
                        }
                      }
                    )
                  ),
                  {
                    loading: 'Generating QR Code...',
                    success: 'QR Code Generated Successfully',
                    error: 'Failed to Generate QR Code'
                  }
                )
              } else if (
                data?.response?.status === 400 &&
                data?.response?.data?.message ===
                  'Whatsapp number already exists'
              ) {
                toast.promise(
                  waitForApiResponse(
                    mutateGenerateQrCode(
                      {
                        session: whatsapp_number,
                        requestType: 'connection'
                      },
                      {
                        onSuccess: () => {
                          setCountdown(30)
                          setStoredNumber(whatsapp_number)
                          Cookies.set('countdown-whatsapp-qr', '30', {
                            expires: new Date(Date.now() + 30000)
                          })
                          Cookies.set(
                            'countdown-whatsapp-number',
                            whatsapp_number,
                            {
                              expires: new Date(Date.now() + 30000)
                            }
                          )
                        }
                      }
                    )
                  ),
                  {
                    loading: 'Generating QR Code...',
                    success: 'QR Code Generated Successfully',
                    error: 'Failed to Generate QR Code'
                  }
                )
              }
            }
          }
        )
      ),
      {
        loading: 'Registering Whatsapp Number...',
        success: 'Whatsapp Number Added Successfully',
        error: 'Failed to Add Whatsapp Number'
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      {resQr?.status === 200 && resQr?.data?.message && (
        <Note intent={resQr?.data?.type === 'ready' ? 'success' : 'warning'}>
          <NoteTitle>Info Status Whatsapp</NoteTitle>
          <NoteDescription>{resQr?.data?.message}</NoteDescription>
        </Note>
      )}
      <div className="space-y-1">
        <TextField
          isRequired
          label="Nomor Whatsapp"
          prefix={'+62'}
          placeholder="812*****"
          value={form.whatsapp_number}
          name="whatsapp_number"
          validate={(e) => {
            const whatsapp_number = e
            const whatsapp_number_regex = /^8[1-9][0-9]{8,11}$/

            if (!whatsapp_number.match(whatsapp_number_regex)) {
              return 'Masukan nomor whatsapp yang valid (contoh: 81234567890)'
            }
          }}
          onChange={(e) => setForm({ ...form, whatsapp_number: e })}
          errorMessage={'Masukan nomor whatsapp yang valid'}
        />
        {resAccount?.response?.status === 400 && (
          <p className="text-sm font-medium text-muted-fg">
            <span className="text-danger forced-colors:text-[Mark]">
              {resAccount?.response?.data?.message},
            </span>{' '}
            But you can still generate a new QR
          </p>
        )}
      </div>

      {resQr?.data?.qrImage && (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            {
              //QR Code Image Expired after 60 seconds
              countdown !== null && countdown > 0 && (
                <Image
                  alt="QR Code"
                  src={resQr?.data?.qrImage}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              )
            }
          </div>
        </div>
      )}

      {
        //If Countdown is active and phone number is same as stored number
        countdown !== null &&
          countdown > 0 &&
          storedNumber === form.whatsapp_number && (
            <Note intent="danger">
              <NoteTitle>Informasi</NoteTitle>
              <NoteDescription>
                Mohon tunggu selama {countdown} detik sebelum menghasilkan Kode
                QR baru untuk nomor yang sama, dan jika Anda sudah memindai Kode
                QR tersebut, harap tunggu selama 30 Detik setelah pemindaian.
              </NoteDescription>
            </Note>
          )
      }

      <div className="flex justify-end">
        <Button
          isDisabled={
            isPending ||
            pendingGenerateQR ||
            (countdown !== null &&
              countdown > 0 &&
              storedNumber === form.whatsapp_number)
          }
          type="submit"
          intent="light/dark"
        >
          {isPending || pendingGenerateQR ? 'Process...' : 'Dapatkan QR Code'}
        </Button>
      </div>
    </Form>
  )
}

interface WhatsappSessionFormProps {
  whatsapp_number: string
}
