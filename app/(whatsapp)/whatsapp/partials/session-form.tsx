'use client'

import { useCreateWhatsapp } from '@/app/api/whatsapp/create-whatsapp'
import { useGenerateQRCode } from '@/app/api/whatsapp/scan-whatsapp'
import { waitForApiResponse } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from 'ui/button'
import { Form } from 'ui/form'
import { TextField } from 'ui/text-field'

export function WhatsappSessionForm() {
  const [form, setForm] = useState<WhatsappSessionFormProps>({
    whatsapp_number: ''
  })

  //Data fetching
  const { mutateAsync } = useCreateWhatsapp()
  const { mutateAsync: mutateGenerateQrCode } = useGenerateQRCode()
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        //change from string to number
        const whatsapp_number = parseInt(form.whatsapp_number)
        console.log(whatsapp_number)

        toast.promise(
          waitForApiResponse(
            mutateAsync(
              {
                whatsapp_number: whatsapp_number
              },
              {
                onSuccess: (data) => {
                  if (data?.status === 200) {
                    console.log('Success')
                    console.log(data)
                    toast.promise(
                      waitForApiResponse(
                        mutateGenerateQrCode({
                          whatsapp_number: whatsapp_number
                        })
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
            success: 'Whatsapp Number Added  Successfully',
            error: 'Failed to Added Whatsapp Number'
          }
        )
      }}
      className="space-y-4"
    >
      <TextField
        isRequired
        label="Whatsapp Number"
        prefix={'+62'}
        placeholder="812*****"
        value={form.whatsapp_number}
        name="whatsapp_number"
        validate={(e) => {
          const whatsapp_number = e
          const whatsapp_number_regex = /^[0-9]{10,13}$/
          if (!whatsapp_number.match(whatsapp_number_regex)) {
            return 'Please enter a valid phone number (10-13 digits) and start with 8'
          }
        }}
        onChange={(e) => setForm({ ...form, whatsapp_number: e })}
        errorMessage={'Please enter a valid phone number'}
      />

      <Button type="submit" intent="light/dark">
        Generate QR Code
      </Button>
    </Form>
  )
}

interface WhatsappSessionFormProps {
  whatsapp_number: string
}
