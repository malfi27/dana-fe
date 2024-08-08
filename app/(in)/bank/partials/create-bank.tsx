'use client'

import { useCreateBank } from '@/app/api/database/bank/post-create-bank'
import { useCreateGroup } from '@/app/api/group/create-group'
import { waitForApiResponse } from '@/lib/utils'
import {
  IconCirclePlusFill,
  IconFolderBox,
  IconMoneybag
} from '@irsyadadl/paranoid'
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

export function CreateBank() {
  const [open, setOpen] = useState(false)

  //Datafetching
  const [form, setForm] = useState({
    nama_bank: '',
    code_bank: ''
  })
  const { mutateAsync } = useCreateBank()

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button intent="light/dark" className="hidden md:flex">
        Add New Bank
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconMoneybag className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Added A New Bank</ModalTitle>
                <ModalDescription>
                  Fill in the form below to add a new group to manage your
                  accounts in here
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>

          <Form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(waitForApiResponse(mutateAsync(form)), {
                loading: 'Processing your request',
                success: 'Bank added successfully',
                error: 'Failed to added bank'
              })
            }}
          >
            <ModalBody className="space-y-4">
              <TextField
                label="Bank Name"
                name="nama_bank"
                value={form.nama_bank}
                onChange={(value) => setForm({ ...form, nama_bank: value })}
                type="text"
                description="Example: BCA, BNI, Bank Mandiri, etc."
                isRequired
              />
              <TextField
                label="Code Bank"
                name="code_bank"
                value={form.code_bank}
                onChange={(value) => setForm({ ...form, code_bank: value })}
                type="text"
                pattern="[0-9]*"
                errorMessage={`Code bank must be a number`}
                description="Example: 014, 009, 008, etc."
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
