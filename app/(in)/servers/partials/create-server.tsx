'use client'

import {
  Button,
  Form,
  Heading,
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
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField
} from 'ui'
import { IconCirclePlusFill, IconServerFill } from '@irsyadadl/paranoid'
import React, { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { Collection } from 'react-aria-components'
import { wait } from '@/lib/utils'

interface Provider {
  id: string
  providerName: string
}

const providers: Provider[] = [
  { id: 'dgo', providerName: 'Digital Ocean' },
  { id: 'akm', providerName: 'Akamai' },
  { id: 'vlt', providerName: 'Vultr' },
  { id: 'htz', providerName: 'Hetzner' },
  { id: 'aws', providerName: 'Amazon Web Services' },
  { id: 'cst', providerName: 'Custom VPS' }
]

export function CreateServer() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    toast.promise(wait(2000), {
      loading: 'Creating server...',
      success: 'Server created.',
      error: 'Failed to create server.',
      finally: () => {
        setOpen(false)
        setLoading(false)
      }
    })
  }

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button className="hidden md:flex">
        <IconCirclePlusFill />
        Create Server
      </Button>
      <ModalOverlay isDismissable={false}>
        <ModalContent className="sm:max-w-2xl">
          <ModalHeader className="text-left">
            <div className="flex">
              <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                <IconServerFill className="size-5" />
              </div>
              <div>
                <ModalTitle className="text-base">Create Server</ModalTitle>
                <ModalDescription>
                  Create a new server for your application. You can use this
                  server to host your application's code and data.
                </ModalDescription>
              </div>
            </div>
          </ModalHeader>

          <Tabs>
            <TabList
              items={providers}
              className="flex overflow-x-auto sm:inline-flex sm:overflow-x-visible"
            >
              {(server) => <Tab id={server.id}>{server.providerName}</Tab>}
            </TabList>
            <Collection items={providers}>
              {(provider) => (
                <TabPanel id={provider.id.toString()}>
                  <Heading className="mb-4" level={2}>
                    {provider.providerName}
                  </Heading>
                  <Form onSubmit={handleSubmit}>
                    <ModalBody className="grid gap-4 lg:grid-cols-2">
                      <TextField
                        label="Name"
                        name="name"
                        type="text"
                        isRequired
                      />
                      <Select
                        label="Type"
                        name="type"
                        items={[
                          'app',
                          'worker',
                          'load_balancer',
                          'cache',
                          'database',
                          'system'
                        ].map((type) => ({
                          value: type,
                          label: type.replace(/_/g, ' ')
                        }))}
                      >
                        {(type) => (
                          <SelectItem id={type.value} textValue={type.label}>
                            {type.label}
                          </SelectItem>
                        )}
                      </Select>
                      <TextField
                        label="IP Address"
                        name="ipAddress"
                        type="text"
                        isRequired
                      />
                      <NumberField label="SSH Port" name="sshPort" isRequired />
                    </ModalBody>
                    <ModalFooter>
                      <ModalClose>Cancel</ModalClose>
                      <Button type="submit">
                        <IconCirclePlusFill />
                        Create
                      </Button>
                    </ModalFooter>
                  </Form>
                </TabPanel>
              )}
            </Collection>
          </Tabs>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
