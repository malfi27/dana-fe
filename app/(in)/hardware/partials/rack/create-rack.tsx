'use client'

import { useCreateRack } from '@/app/api/server-center/rack/post-create-rack'
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

export function CreateRack() {
  const [open, setOpen] = useState(false)

  //Datafetching
  const [form, setForm] = useState({
    rack_number: 0,
    server_ip: ''
  })
  const { mutateAsync } = useCreateRack()

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button intent="light/dark" className="hidden md:flex">
        <IconCirclePlusFill />
        Create Rack
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconStorage className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Create Rack</ModalTitle>
                <ModalDescription>
                  Fill in the form below to create a new rack.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>

          <Form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(waitForApiResponse(mutateAsync(form)), {
                loading: 'Creating rack...',
                success: 'Rack created successfully',
                error: 'Failed to create rack'
              })
            }}
          >
            <ModalBody className="space-y-4">
              <NumberField
                label="Rack Number"
                name="rack_number"
                value={form.rack_number}
                onChange={(value) => setForm({ ...form, rack_number: value })}
                validate={(value) => {
                  if (value < 1) {
                    return 'Rack number must be greater than 0'
                  }
                }}
                description="The number of the rack. Example: 1"
                isRequired
              />
              <TextField
                label="Server Ip"
                name="server_ip"
                value={form.server_ip}
                onChange={(value) => setForm({ ...form, server_ip: value })}
                type="text"
                description="The server IP address of the rack. Example: 127.0.0.1"
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
