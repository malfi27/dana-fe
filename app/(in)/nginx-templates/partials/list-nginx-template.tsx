'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import { IconDotsVertical, IconHighlight, IconTrash } from '@irsyadadl/paranoid'
import { toast } from 'sonner'
import { useState } from 'react'
import { wait } from '@/lib/utils'

export function ListNginxTemplate() {
  const [defaultTemplates, setDefaultTemplates] =
    useState<Templates[]>(templates)

  function destroy(id: number) {
    toast.promise(wait(1500), {
      loading: 'Deleting...',
      success: 'Template deleted',
      error: 'Failed to delete template',
      finally: () => {
        setDefaultTemplates((prev) =>
          prev.filter((template) => template.id !== id)
        )
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>List Nginx Template</CardTitle>
        <CardDescription>
          List of Nginx templates to use in your sites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableColumn className="w-0">ID</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Used</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody items={defaultTemplates}>
            {(template) => (
              <TableRow id={template.id}>
                <TableCell>{template.id}</TableCell>
                <TableCell>{template.name}</TableCell>
                <TableCell>{template.used} times</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Menu>
                      <MenuTrigger>
                        <IconDotsVertical />
                      </MenuTrigger>
                      <MenuContent placement="bottom end">
                        <MenuItem>
                          <IconHighlight className="mr-2 size-4" /> Edit
                        </MenuItem>
                        <MenuItem
                          isDanger
                          onAction={() => destroy(template.id)}
                        >
                          <IconTrash className="mr-2 size-4" /> Delete
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

type Templates = {
  id: number
  name: string
  used: number
}

const templates: Templates[] = [
  {
    id: 13232,
    name: 'Laravel',
    used: 3
  },
  {
    id: 324,
    name: 'Wordpress',
    used: 2
  },
  {
    id: 213244,
    name: 'Static',
    used: 1
  },
  {
    id: 25432,
    name: 'Next.js',
    used: 23
  },
  {
    id: 323112,
    name: 'Nuxt.js',
    used: 1
  }
]
