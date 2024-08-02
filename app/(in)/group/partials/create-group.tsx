'use client'

import { useCreateGroup } from '@/app/api/group/create-group'
import { waitForApiResponse } from '@/lib/utils'
import { IconCirclePlusFill, IconFolderBox } from '@irsyadadl/paranoid'
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

export function CreateGroup() {
  const [open, setOpen] = useState(false)

  //Datafetching
  const [form, setForm] = useState({
    group_name: '',
    maximum_balance: 0
  })
  const { mutateAsync } = useCreateGroup()

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button intent="light/dark" className="hidden md:flex">
        <IconCirclePlusFill />
        Create Group
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconFolderBox className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Added A New Group</ModalTitle>
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
                loading: 'Creating group...',
                success: 'Group created successfully',
                error: 'Failed to create group'
              })
            }}
          >
            <ModalBody className="space-y-4">
              <TextField
                label="Group Name"
                name="group_name"
                value={form.group_name}
                onChange={(value) => setForm({ ...form, group_name: value })}
                type="text"
                description="The name of the group"
                isRequired
              />
              <NumberField
                label="Maximum Balance"
                name="maximum_balance"
                value={form.maximum_balance}
                onChange={(value) =>
                  setForm({ ...form, maximum_balance: value })
                }
                description="The number of the maximum balance. in IDR"
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
