'use client'

import { useCreateDevice } from '@/app/api/server-center/device/post-create-device'
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

interface CreateDeviceProps {
  boxId: string
  rackId: string
}
export function CreateDevice({ rackId, boxId }: CreateDeviceProps) {
  const [open, setOpen] = useState(false)

  //Datafetching
  const [form, setForm] = useState({
    device_number: 1,
    device_ip: ''
  })
  const { mutateAsync } = useCreateDevice()

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button intent="light/dark" className="hidden md:flex">
        <IconCirclePlusFill />
        Create Device
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconStorage className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Create Device</ModalTitle>
                <ModalDescription>
                  Fill in the form below to create a new device
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
                    device_number: form.device_number,
                    device_ip: form.device_ip,
                    boxId: boxId,
                    rackId: rackId
                  })
                ),
                {
                  loading: 'Creating device...',
                  success: 'Device created successfully',
                  error: 'Failed to create device'
                }
              )
            }}
          >
            <ModalBody className="space-y-4">
              <NumberField
                label="Device Number"
                name="device_number"
                value={form.device_number}
                onChange={(value) => setForm({ ...form, device_number: value })}
                validate={(value) => {
                  if (value < 1) {
                    return 'Box number must be greater than 0'
                  }
                }}
                description="The number of the box. Example: 1"
                isRequired
              />
              <TextField
                label="Device IP"
                name="device_ip"
                value={form.device_ip}
                onChange={(value) => setForm({ ...form, device_ip: value })}
                description="The IP address of the device. Example: 127.0.0.1:5000"
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
