'use client'

import React, { useEffect, useState } from 'react'
import type { OTPInputProps } from 'input-otp'
import { toast } from 'sonner'

import { Button } from 'ui/button'
import { Form } from 'ui/form'
import { TextField } from 'ui/text-field'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  SectionTitle
} from '@/components/ui'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalDescription,
  ModalClose
} from '@/components/ui'
import { useWhatsappLogin } from '@/app/api/whatsapp/create-whatsapp'
import { useSaveOtp } from '@/app/api/otp/save-otp'
import { useGetDetailWhatsappLogin } from '@/app/api/whatsapp/get-detail-whatsapp-login'
import { waitForApiResponse } from '@/lib/utils'
import {
  IconCheck,
  IconDateTime,
  IconLoader2,
  IconLock,
  IconMessage,
  IconTriangleInfo,
  IconX,
  IconDevices,
  IconDevicePhone,
  IconPeople,
  IconBrandWhatsapp
} from '@irsyadadl/paranoid'

// Types
interface WhatsappSessionFormProps {
  phone_number: string
}

interface WhatsappLoginResponse {
  status: number
  data: {
    message: string
    account: {
      _id: string
      phone_number: string
      name: string | null
      email: string | null
      balance: number
      device?: {
        device_number: string
        device_ip: string
      }
    }
    whatsappLogin: {
      _id: string
      status: string
      reason: string | null
    }
    onlineInstances: Array<{
      name: string
      serial_no: string
      status: string
    }>
  }
}

interface AutomationDetails {
  data: {
    data: {
      status: string
      reason: string | null
      account: {
        phone_number: string
        name: string | null
        balance: number
      }
      worker?: {
        name: string
        serial_name: string
      }
      created_at: string
      updated_at: string
    }
  }
}

interface OtpSubmitData {
  otp: string
  sosmed: string
  account: any
}

// Utility Functions
const formatPhoneNumber = (phone: string): string => {
  if (phone.startsWith('08')) {
    return phone
  } else if (phone.startsWith('8')) {
    return `0${phone}`
  } else if (phone.startsWith('62')) {
    return `08${phone.slice(2)}`
  }
  return phone
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const getStatusColor = (status: string | undefined): string => {
  switch (status?.toLowerCase()) {
    case 'success':
      return 'text-green-700 bg-green-50'
    case 'failed':
      return 'text-red-700 bg-red-50'
    case 'on progress':
      return 'text-blue-700 bg-blue-50'
    default:
      return 'text-gray-700 bg-gray-50'
  }
}

// Main Component
export function WhatsappSessionForm() {
  // State Management
  const [account, setAccount] = useState<any>({})
  const [whatsappLoginId, setWhatsappLoginId] = useState('')
  const [form, setForm] = useState<WhatsappSessionFormProps>({
    phone_number: ''
  })
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOTP] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const slotCount = 6

  // Hooks
  const { mutateAsync, isPending } = useWhatsappLogin()
  const { mutateAsync: mutateOtp, isPending: isPendingOtp } = useSaveOtp()
  const { data: automationDetails, isLoading: isLoadingDetails } =
    useGetDetailWhatsappLogin({
      id: whatsappLoginId
    })

  // Icons based on status
  const getStatusIcon = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return <IconCheck className="size-5 text-green-500" />
      case 'failed':
        return <IconX className="size-5 text-red-500" />
      case 'on progress':
        return <IconLoader2 className="size-5 animate-spin text-blue-500" />
      default:
        return <IconBrandWhatsapp className="size-5 text-gray-500" />
    }
  }

  const handleCloseOTP = () => {
    setShowOTP(false)
    setOTP('')
  }

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formattedPhone = formatPhoneNumber(form.phone_number)
    setForm({ ...form, phone_number: formattedPhone })

    toast.promise(
      waitForApiResponse(
        mutateAsync(form, {
          onSuccess: (res: WhatsappLoginResponse) => {
            if (res?.status === 200) {
              setAccount(res?.data?.account)
              setWhatsappLoginId(res?.data?.whatsappLogin?._id)
              setShowOTP(true)
              setTimeLeft(300) // Reset timer
            }
          }
        })
      ),
      {
        loading: 'Memproses permintaan login...',
        success: (res: WhatsappLoginResponse) => {
          return res?.data?.message || 'Login request berhasil'
        },
        error: (error: any) => {
          return error?.response?.data?.error || 'Terjadi kesalahan'
        }
      }
    )
  }

  // OTP submission handler
  const handleOTPComplete = async () => {
    try {
      const otpData: OtpSubmitData = {
        otp,
        sosmed: 'Whatsapp',
        account
      }

      toast.promise(
        waitForApiResponse(
          mutateOtp(otpData, {
            onSuccess: () => {
              handleCloseOTP()
            }
          })
        ),
        {
          loading: 'Memverifikasi OTP...',
          success: (res: any) => {
            return res?.data?.message || 'OTP berhasil diverifikasi'
          },
          error: (error: any) => {
            return error?.response?.data?.message || 'Verifikasi OTP gagal'
          }
        }
      )
    } catch (error) {
      console.error('OTP verification error:', error)
    }
  }

  // OTP input handler
  const handleOTPChange: OTPInputProps['onChange'] = (value) => {
    setOTP(value)
  }

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && showOTP) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleCloseOTP()
    }
  }, [timeLeft, showOTP])

  return (
    <div className="space-y-6">
      {/* Automation Details */}
      {whatsappLoginId && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Status Card */}
          <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  Status Login WhatsApp
                </h3>
                {getStatusIcon(automationDetails?.data?.data?.status)}
              </div>
            </div>
            <div className="px-4 py-4">
              {isLoadingDetails ? (
                <div className="flex items-center space-x-2">
                  <IconLoader2 className="size-4 animate-spin" />
                  <span className="text-sm text-gray-500">
                    Memuat status...
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        automationDetails?.data?.data?.status
                      )}`}
                    >
                      {automationDetails?.data?.data?.status ||
                        'Tidak diketahui'}
                    </span>
                  </div>
                  {automationDetails?.data?.data?.reason && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Keterangan</span>
                      <span className="text-sm text-gray-900">
                        {automationDetails.data.data.reason}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Account Details Card */}
          {automationDetails?.data?.data && (
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Detail Akun
                </h3>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center space-x-2">
                  <IconDevicePhone className="size-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {automationDetails.data.data.account.phone_number}
                  </span>
                </div>
                {automationDetails.data.data.account.name && (
                  <div className="flex items-center space-x-2">
                    <IconPeople className="size-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {automationDetails.data.data.account.name}
                    </span>
                  </div>
                )}
                {automationDetails.data.data.worker && (
                  <div className="flex items-center space-x-2">
                    <IconDevices className="size-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Worker: {automationDetails.data.data.worker.name}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <IconDateTime className="size-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Last Updated:{' '}
                    {new Date(
                      automationDetails.data.data.updated_at
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Phone Number Input Form */}
      {!showOTP ? (
        <Form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center space-x-2">
              <IconMessage className="size-5 text-gray-600" />
              <h2 className="text-lg font-medium">Login WhatsApp</h2>
            </div>
            <div className="space-y-4">
              <TextField
                isRequired
                label="Nomor WhatsApp"
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
              <div className="flex justify-end">
                <Button
                  intent="primary"
                  isDisabled={isPending}
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  {isPending ? (
                    <div className="flex items-center space-x-2">
                      <IconLoader2 className="size-4 animate-spin" />
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    'Request Login'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      ) : (
        /* OTP Input Modal */
        <Modal isOpen onOpenChange={handleCloseOTP}>
          <ModalOverlay className="backdrop-blur-sm" />
          <ModalContent closeButton={false} className="sm:max-w-md">
            <ModalHeader>
              <ModalTitle className="flex items-center space-x-2">
                <IconLock className="size-5" />
                <span>Masukkan Kode OTP</span>
              </ModalTitle>
              <ModalDescription>
                Masukkan kode OTP yang dikirim ke WhatsApp Anda
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-center text-sm text-gray-600">
                  Kode akan dikirimkan ke WhatsApp {form.phone_number}
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <IconDateTime className="size-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="flex justify-center py-4">
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
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex w-full space-x-2">
                <Button
                  intent="primary"
                  isDisabled={
                    otp.length !== slotCount || timeLeft <= 0 || isPendingOtp
                  }
                  onPress={handleOTPComplete}
                  className="flex-1"
                >
                  {isPendingOtp ? (
                    <div className="flex items-center justify-center space-x-2">
                      <IconLoader2 className="size-4 animate-spin" />
                      <span>Memverifikasi...</span>
                    </div>
                  ) : (
                    'Verifikasi OTP'
                  )}
                </Button>
              </div>
              {timeLeft <= 0 && (
                <p className="mt-2 text-center text-sm text-red-600">
                  Waktu verifikasi habis. Silakan coba lagi.
                </p>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
