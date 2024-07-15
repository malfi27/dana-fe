'use client'

import {
  Button,
  FileTrigger,
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  MultiSelect,
  TextField
} from 'ui'
import { IconCirclePlusFill } from '@irsyadadl/paranoid'
import * as React from 'react'
import { ItemProps } from '@/types'
import { Label } from 'recharts'
import { Group } from 'react-aria-components'

export function CreateTeam() {
  const [selected, setSelected] = React.useState<ItemProps[]>([])
  return (
    <Modal>
      <Button>
        <IconCirclePlusFill className="mr-2" />
        Create Team
      </Button>
      <ModalContent className="sm:max-w-2xl">
        <ModalHeader>
          <ModalTitle>Create Team</ModalTitle>
          <ModalDescription>
            Create a new team member by filling out the form below.
          </ModalDescription>
        </ModalHeader>

        <form>
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <FileTrigger />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField isRequired label="Name" />
              <TextField isRequired label="Email" type="email" />
              <Group className="space-y-1">
                <Label>Roles</Label>
                <div className="block">
                  <MultiSelect
                    placeholder="Select roles"
                    selected={selected}
                    setSelected={setSelected}
                    items={roles}
                  />
                </div>
              </Group>
            </div>

            {/*<div>*/}
            {/*    <Label htmlFor="status">Status</Label>*/}
            {/*    <div className="mt-1 space-y-2 rounded-md border bg-tertiary p-4">*/}
            {/*        <RadioGroup defaultValue="active" className="space-y-2">*/}
            {/*            <div className="flex items-center space-x-2">*/}
            {/*                <RadioGroupItem value="active" id="active" />*/}
            {/*                <Label htmlFor="active">Active</Label>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center space-x-2">*/}
            {/*                <RadioGroupItem value="inactive" id="inactive" />*/}
            {/*                <Label htmlFor="inactive">Inactive</Label>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center space-x-2">*/}
            {/*                <RadioGroupItem value="hold" id="hold" />*/}
            {/*                <Label htmlFor="hold">Hold</Label>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center space-x-2">*/}
            {/*                <RadioGroupItem value="leave" id="leave" />*/}
            {/*                <Label htmlFor="leave">Leave</Label>*/}
            {/*            </div>*/}
            {/*        </RadioGroup>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ModalFooter className="flex-row justify-end gap-2">
              <ModalClose>Cancel</ModalClose>

              <Button type="submit">Create</Button>
            </ModalFooter>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

const roles: ItemProps[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Support', value: 'support' }
]
