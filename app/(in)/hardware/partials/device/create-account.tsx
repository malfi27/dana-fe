'use client'

import { useCreateAccount } from '@/app/api/account/post-create-account'
import { waitForApiResponse } from '@/lib/utils'
import { IconCirclePlusFill, IconStorage } from '@irsyadadl/paranoid'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  NumberField,
  TextField
} from 'ui'

interface CreateAccountProps {
  phone_number: string
  nik: string
  name: string
  email: string
  pin: number
  balance: number
  device: string
}
export function CreateAccount({ device_id }: any) {
  const [open, setOpen] = useState(false)

  //Datafetching
  const [form, setForm] = useState({
    phone_number: '',
    nik: '',
    name: '',
    email: '',
    pin: 0,
    balance: 0,
    device: device_id
  })
  const { mutateAsync } = useCreateAccount()

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button intent="light/dark" className="hidden md:flex">
        <IconCirclePlusFill />
        Add Account
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconStorage className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Add Account</ModalTitle>
                <ModalDescription>
                  Add new account to this device to start using it for
                  transaction process in the future.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>

          <Form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(waitForApiResponse(mutateAsync(form)), {
                loading: 'Adding Account Process...',
                success: 'Account added successfully',
                error: 'Failed to added account'
              })
            }}
          >
            <ModalBody className="space-y-4">
              <TextField
                label="Phone Number"
                placeholder="08xxxxxx"
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e })}
                validate={(e) => {
                  if (e.length < 10) {
                    return 'Phone number must be at least 10 characters'
                  }
                  //regex for phone number
                  if (!/^\d+$/.test(e)) {
                    return 'Phone number must be numeric'
                  }
                  if (!/^0/.test(e)) {
                    return 'Phone number must be start with 0'
                  }
                  //Maximum phone number length
                  if (e.length > 13) {
                    return 'Phone number must be less than 13 characters'
                  }
                }}
                isRequired
              />
              <TextField
                label="NIK"
                placeholder="327xxxxxxxxx"
                value={form.nik}
                onChange={(e) => setForm({ ...form, nik: e })}
                isRequired
              />
              <TextField
                label="Name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e })}
                isRequired
              />
              <TextField
                label="Email"
                placeholder="email@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e })}
                validate={(e) => {
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
                    return 'Email must be valid'
                  }
                }}
                isRequired
              />
              <TextField
                label="PIN"
                placeholder="123456"
                onChange={(e) => setForm({ ...form, pin: parseInt(e) })}
                validate={(e) => {
                  if (e.length < 6) {
                    return 'PIN must be at least 6 characters'
                  }
                  if (!/^\d+$/.test(e)) {
                    return 'PIN must be numeric'
                  }
                }}
                isRequired
              />
              <NumberField
                label="Balance"
                placeholder="100.000"
                description="The current balance on DANA account"
                onChange={(e) => setForm({ ...form, balance: e })}
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button intent="light/dark" type="submit">
                <IconCirclePlusFill />
                Add Now
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
