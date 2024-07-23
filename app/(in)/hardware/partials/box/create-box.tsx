'use client'

import { useCreateBox } from '@/app/api/server-center/box/post-create-box'
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
  NumberField
} from 'ui'

interface CreateBoxProps {
  query: any
}
export function CreateBox({ query }: CreateBoxProps) {
  const [open, setOpen] = useState(false)

  //Datafetching
  const [form, setForm] = useState({
    box_number: 1
  })
  const { mutateAsync } = useCreateBox()

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button intent="light/dark" className="hidden md:flex">
        <IconCirclePlusFill />
        Create Box
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconStorage className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Create Box</ModalTitle>
                <ModalDescription>
                  Fill in the form below to create a new box
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>

          <Form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(
                waitForApiResponse(
                  mutateAsync({
                    box_number: form.box_number,
                    rackId: query
                  })
                ),
                {
                  loading: 'Creating box...',
                  success: 'box created successfully',
                  error: 'Failed to create box'
                }
              )
            }}
          >
            <ModalBody className="space-y-4">
              <NumberField
                label="Box Number"
                name="box_number"
                value={form.box_number}
                onChange={(value) => setForm({ ...form, box_number: value })}
                validate={(value) => {
                  if (value < 1) {
                    return 'Box number must be greater than 0'
                  }
                }}
                description="The number of the box. Example: 1"
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
