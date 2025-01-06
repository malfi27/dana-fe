'use client'

import { useWhatsappLogin } from '@/app/api/whatsapp/create-whatsapp'
import React, { useEffect, useState } from 'react'
import type { OTPInputProps } from 'input-otp'
import { Button } from 'ui/button'
import { Form } from 'ui/form'
import { TextField } from 'ui/text-field'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  SectionTitle
} from '@/components/ui'
import { toast } from 'sonner'
import { waitForApiResponse } from '@/lib/utils'
import { useSaveOtp } from '@/app/api/otp/save-otp'

interface WhatsappSessionFormProps {
  phone_number: string
}

export function WhatsappSessionForm() {
  const [account, setAccount] = useState({})
  const [form, setForm] = useState<WhatsappSessionFormProps>({
    phone_number: ''
  })
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOTP] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const slotCount = 6 // Number of OTP slots
  const { mutateAsync, isPending } = useWhatsappLogin()
  const { mutateAsync: mutateOtp, isPending: isPendingOtp } = useSaveOtp()

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let formattedPhone = form.phone_number

    // Format nomor berdasarkan logika
    if (formattedPhone.startsWith('08')) {
      // Nomor sudah dalam format yang benar
      formattedPhone = formattedPhone
    } else if (formattedPhone.startsWith('8')) {
      // Tambahkan "0" di depan jika hanya dimulai dengan "8"
      formattedPhone = `0${formattedPhone}`
    } else if (formattedPhone.startsWith('62')) {
      // Ubah "62" di depan menjadi "08"
      formattedPhone = `08${formattedPhone.slice(2)}`
    } else {
      return
    }

    // Update state dengan nomor yang telah diformat
    setForm({ ...form, phone_number: formattedPhone })

    toast.promise(
      waitForApiResponse(
        mutateAsync(form, {
          onSuccess: (res) => {
            if (res?.status === 200) {
              setAccount(res?.data?.account)
              setShowOTP(true)
              setTimeLeft(300) // Reset timer ketika OTP diminta
            }
          }
        })
      ),
      {
        loading: 'Process..',
        success: (res) => {
          if (res?.status === 200) {
            return res?.data?.message
          }
        },
        error: (error) => {
          return error?.response?.data?.error
        }
      }
    )
  }

  // Handles OTP completion
  const handleOTPComplete = async () => {
    try {
      toast.promise(
        waitForApiResponse(
          mutateOtp({
            otp: otp,
            sosmed: 'Whatsapp',
            account: account
          })
        ),
        {
          loading: 'Process Sending To Database..',
          success: (res) => {
            if (res?.status === 200) {
              return res?.data?.message
            }
          },
          error: (error) => {
            return error?.response?.data?.message
          }
        }
      )
    } catch (error) {}
  }

  // Handles OTP changes
  const handleOTPChange: OTPInputProps['onChange'] = (value) => {
    setOTP(value)
  }

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timer) // Cleanup on unmount or timer reset
    }
  }, [timeLeft])

  // Format time into MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {!showOTP ? (
        <Form onSubmit={handleSubmit} className="space-y-4">
          <SectionTitle
            className="mb-6 p-0"
            title="Masukan Nomor Whatsapp"
            description="Masukan nomor Whatsapp yang valid"
          />
          <div>
            <TextField
              isRequired
              label="Nomor Whatsapp"
              prefix="+62"
              className="text-sm"
              placeholder="812*****"
              value={form.phone_number}
              name="whatsapp_name"
              validate={(e) => {
                const whatsapp_name_regex = /^8[1-9][0-9]{8,11}$/
                return whatsapp_name_regex.test(e)
                  ? undefined
                  : 'Masukan nomor WhatsApp yang valid (contoh: 81234567890)'
              }}
              onChange={(e) => setForm({ ...form, phone_number: e })}
              errorMessage="Masukan nomor WhatsApp yang valid"
            />
          </div>

          <div className="mt-2 flex w-full justify-end">
            <Button isDisabled={isPending} type="submit" intent="light/dark">
              {isPending ? 'Processing...' : 'Request Login'}
            </Button>
          </div>
        </Form>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium">Enter OTP Code</h3>
            <p className="text-sm text-muted-fg">
              Kode Anda akan dikirimkan melalui WhatsApp {form.phone_number}.
              Waktu kurang dari:{' '}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </p>
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={slotCount}
              value={otp}
              onChange={handleOTPChange}
            >
              <InputOTPGroup>
                {Array.from({ length: slotCount }, (_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              intent="light/dark"
              isDisabled={
                otp.length !== slotCount || timeLeft <= 0 || isPending
              }
              onPress={handleOTPComplete}
            >
              {isPending ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
