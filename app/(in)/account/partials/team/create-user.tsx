'use client'

import { useSignup } from '@/app/api/auth/create-user'
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
  Select,
  SelectItem,
  TextField
} from 'ui'

export function CreateUsers({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false)

  //Datafetching
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: ''
  })
  const { mutateAsync } = useSignup()

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button intent="light/dark" className="hidden md:flex">
        <IconCirclePlusFill />
        Create Users
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconFolderBox className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Added A New Users</ModalTitle>
                <ModalDescription>
                  Fill in the form below to add a new users to manage your
                  accounts in here
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>

          <Form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(waitForApiResponse(mutateAsync(form)), {
                loading: 'Creating users...',
                success: (data) => {
                  if (data?.status === 200) {
                    setOpen(false)
                    setTimeout(() => {
                      refetch()
                    }, 400)
                  }
                  return 'Users created successfully'
                },
                error: 'Failed to create users'
              })
            }}
          >
            <ModalBody className="space-y-4">
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={(value) => setForm({ ...form, name: value })}
                type="text"
                isRequired
              />
              <TextField
                label="Username"
                name="Username"
                value={form.username}
                onChange={(value) => setForm({ ...form, username: value })}
                isRequired
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={(value) => setForm({ ...form, email: value })}
                type="email"
                isRequired
              />
              <TextField
                label="Password"
                name="password"
                value={form.password}
                onChange={(value) => setForm({ ...form, password: value })}
                type="password"
                isRequired
              />
              <Select
                label="Roles"
                placeholder="Select Role"
                items={[
                  { id: 'asdqwe123', name: 'Admin' },
                  { id: 'asd123', name: 'User' },
                  { id: 'asdqwe123', name: 'Customer Service' }
                ]}
                isRequired
                defaultSelectedKey={form.role ? form.role : 'Select Role'}
                errorMessage={`Please select a role `}
                onSelectionChange={(item) => {
                  setForm({
                    ...form,
                    role: item.toString()
                  })
                }}
              >
                {(item: any) => (
                  <SelectItem id={item.name} textValue={item.name}>
                    {item.name}
                  </SelectItem>
                )}
              </Select>
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
