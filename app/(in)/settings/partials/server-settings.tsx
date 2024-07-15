'use client'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ComboBox,
  ComboBoxItem,
  Form,
  Label,
  MultiSelect,
  Select,
  SelectItem,
  TextField
} from 'ui'
import * as React from 'react'
import { ItemProps, SelectItemProps } from '@/types'

const stacks = [
  { value: 'laravel', label: 'Laravel' },
  { value: 'node', label: 'Node' },
  { value: 'bun', label: 'Bun' },
  { value: 'redis', label: 'Redis' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgres', label: 'Postgres' },
  { value: 'mongo', label: 'Mongo' },
  { value: 'nginx', label: 'Nginx' },
  { value: 'apache', label: 'Apache' },
  { value: 'docker', label: 'Docker' },
  { value: 's3', label: 'S3' }
]

export function ServerSettings({
  timezones
}: {
  timezones: { value: string; label: string }[]
}) {
  const [selected, setSelected] = React.useState<ItemProps[]>([
    stacks[0],
    stacks[2],
    stacks[3],
    stacks[4],
    stacks[10]
  ])
  return (
    <Card className="[&:has(.larhy3)]:overflow-visible">
      <CardHeader className="rounded-t-lg">
        <CardTitle>Server Settings</CardTitle>
        <CardDescription>
          You may add notes to your server to help you remember important
          information about it.
        </CardDescription>
      </CardHeader>

      <Form action={() => {}}>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              isRequired
              name="name"
              label="Name"
              placeholder="Server Name"
            />
            <TextField
              isRequired
              name="ssh-port"
              label="SSH Port"
              placeholder="SSH Port"
            />
            <TextField
              isRequired
              name="ip-address"
              label="IP Address"
              placeholder="IP Address"
            />
            <TextField
              isRequired
              name="private-ip-address"
              label="Private IP Address"
              placeholder="Private IP Address"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-4">
            <div className="space-y-1">
              <Label htmlFor="tz">Tags</Label>
              <div className="block">
                <Select items={tags}>
                  {(tag) => (
                    <SelectItem
                      className="capitalize"
                      id={tag.value}
                      textValue={tag.value}
                    >
                      {tag.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <ComboBox
              placeholder="Select a library"
              label="Timezone"
              name="tz"
              isRequired
              items={stacks}
            >
              {(item) => (
                <ComboBoxItem id={item.value} textValue={item.label}>
                  {item.label}
                </ComboBoxItem>
              )}
            </ComboBox>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="ds">Default stacks</Label>
              <div className="block">
                <MultiSelect
                  placeholder="Choose stacks"
                  selected={selected}
                  setSelected={setSelected}
                  items={stacks}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}

const tags: SelectItemProps[] = [
  {
    value: 'production',
    label: 'Production'
  },
  {
    value: 'staging',
    label: 'Staging'
  },
  {
    value: 'development',
    label: 'Development'
  }
]
