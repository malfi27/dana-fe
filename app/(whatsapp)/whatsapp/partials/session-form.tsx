'use client'

import { useCreateWhatsapp } from '@/app/api/whatsapp/create-whatsapp'
import { useGetDetailWhatsappSession } from '@/app/api/whatsapp/detail-whatsapp-session'
import { Note, NoteDescription, NoteTitle } from '@/components/ui'
import { waitForApiResponse } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from 'ui/button'
import { Form } from 'ui/form'
import { TextField } from 'ui/text-field'

export function WhatsappSessionForm() {
  const [form, setForm] = useState<WhatsappSessionFormProps>({
    whatsapp_name: ''
  })
  const [stateId, setStateId] = useState<any>({
    id: ''
  })

  // Data fetching
  const { data: resAccount, mutateAsync, isPending } = useCreateWhatsapp()
  //Detail Whatsapp Session
  const { data: resDetailSession, isLoading: isLoadingDetailSession } =
    useGetDetailWhatsappSession(stateId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsapp_name = form.whatsapp_name

    toast.promise(
      waitForApiResponse(
        mutateAsync(
          { whatsapp_name },
          {
            onSuccess: (data) => {
              if (data?.response?.status === 400) {
                setStateId({ id: whatsapp_name })
              }
            }
          }
        )
      ),
      {
        loading: 'Processing...',
        success: 'Whatsapp number has been added',
        error: 'Failed to add whatsapp number'
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <TextField
          isRequired
          label="Nomor Whatsapp"
          prefix={'+62'}
          placeholder="812*****"
          value={form.whatsapp_name}
          name="whatsapp_name"
          validate={(e) => {
            const whatsapp_name = e
            const whatsapp_name_regex = /^8[1-9][0-9]{8,11}$/

            if (!whatsapp_name.match(whatsapp_name_regex)) {
              return 'Masukan nomor whatsapp yang valid (contoh: 81234567890)'
            }
          }}
          onChange={(e) => setForm({ ...form, whatsapp_name: e })}
          errorMessage={'Masukan nomor whatsapp yang valid'}
        />
        {resAccount?.response?.status === 400 && (
          <p className="mt-2 text-sm font-medium text-muted-fg">
            <span className="text-danger forced-colors:text-[Mark]">
              {resAccount?.response?.data?.message}
            </span>
          </p>
        )}
        {resAccount?.status === 200 || resAccount?.status === 201 ? (
          <div className="mt-4 flex flex-col items-center justify-center space-y-4">
            <Note intent="success" className="w-full">
              <NoteTitle>Success</NoteTitle>
              <NoteDescription>
                {resAccount?.data?.data?.message}
              </NoteDescription>
            </Note>
            <Image
              alt="QR Code"
              src={resAccount?.data?.data?.qrImage}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        ) : resDetailSession?.status === 200 || resAccount?.status === 201 ? (
          <div className="mt-4 flex flex-col items-center justify-center space-y-4">
            <Note intent="info" className="w-full">
              <NoteTitle>Success</NoteTitle>
              <NoteDescription>
                Status : {resDetailSession?.data?.data?.session_status}
              </NoteDescription>
            </Note>
            <Image
              alt="QR Code"
              src={resDetailSession?.data?.data?.qrImage}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex w-full justify-end">
        <Button isDisabled={isPending} type="submit" intent="light/dark">
          {isPending ? 'Process...' : 'Add Whatsapp'}
        </Button>
      </div>
    </Form>
  )
}

interface WhatsappSessionFormProps {
  whatsapp_name: string
}
