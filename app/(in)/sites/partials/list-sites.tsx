'use client'

import { formatRelative, subDays } from 'date-fns'
import * as React from 'react'
import { SVGProps, useState } from 'react'

import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  SearchField,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import {
  IconBrandGithub,
  IconChevronDown,
  IconDotsVertical,
  IconDuplicate,
  IconHighlight,
  IconTrash
} from '@irsyadadl/paranoid'
import { title, wait } from '@/lib/utils'
import { toast } from 'sonner'
import { Selection } from 'react-aria-components'

export function ListSites() {
  const allKeys = Array.from(new Set(dataSites.flatMap(Object.keys)))

  const menuItems = allKeys.map((key) => ({ label: key }))
  const [isOpen, setIsOpen] = useState<boolean>(false)
  let [selected, setSelected] = React.useState<Selection>(new Set(['id']))
  return (
    <>
      <div className="flex items-center gap-x-2 py-4">
        <SearchField
          aria-label="Search sites"
          placeholder="Search..."
          className="max-w-sm"
        />
        <Menu>
          <Button appearance="outline" className="ml-auto bg-background">
            Columns <IconChevronDown className="ml-2 size-4" />
          </Button>
          <MenuContent
            selectionMode="multiple"
            onSelectionChange={setSelected}
            selectedKeys={selected}
            items={menuItems}
            placement="bottom end"
          >
            {(item) => (
              <MenuCheckboxItem id={item.label}>
                {title(item.label)}
              </MenuCheckboxItem>
            )}
          </MenuContent>
        </Menu>
      </div>
      <div className="overflow-hidden rounded-md border bg-background">
        <Table aria-label="Sites">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Deployed</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Repo</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody items={dataSites}>
            {(item) => (
              <TableRow href={`/sites/${item.id}`} id={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.deployed}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <item.icon className="mr-1.5 inline size-4" />
                  {item.repo}
                </TableCell>
                <TableCell className="flex justify-end">
                  <Menu>
                    <Button
                      className="ml-auto h-8 w-6"
                      appearance="plain"
                      size="square-petite"
                    >
                      <IconDotsVertical />
                    </Button>
                    <MenuContent placement="left top">
                      <MenuItem>
                        <IconDuplicate />
                        Copy ID
                      </MenuItem>
                      <MenuItem>
                        <IconHighlight />
                        Edit
                      </MenuItem>
                      <MenuItem onAction={() => setIsOpen(true)} isDanger>
                        <IconTrash />
                        Delete
                      </MenuItem>
                    </MenuContent>
                  </Menu>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-6 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="sm:max-w-sm">
          <ModalHeader>
            <ModalTitle>Are you absolutely sure?</ModalTitle>
            <ModalDescription>
              This action cannot be undone. This will remove the site
              permanently.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose>Cancel</ModalClose>
            <Button
              intent="danger"
              onPress={() => {
                toast.promise(wait(1500), {
                  loading: 'Deleting site...',
                  success: 'Site deleted.',
                  error: 'Failed to delete a site.',
                  finally: () => setIsOpen(false)
                })
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </>
  )
}

export const dataSites: Sites[] = [
  {
    id: 'ftbbpblcmjrtwgc8',
    deployed: formatRelative(subDays(new Date(), 0), new Date()),
    status: 'success',
    name: 'provision.com',
    repo: 'irsyadadl/provision.com',
    icon: IconBrandGithub
  },
  {
    id: 'kg0kxhl72c3w09do',
    deployed: formatRelative(subDays(new Date(), 1), new Date()),
    status: 'success',
    name: 'example.com',
    repo: 'irsyadadl/example.com',
    icon: IconBrandGithub
  },
  {
    id: 'jdl2s3j23muqxeud',
    deployed: formatRelative(subDays(new Date(), 2), new Date()),
    status: 'processing',
    name: 'meac.com',
    repo: 'irsyadadl/meac.com',
    icon: IconBrandGithub
  },
  {
    id: 'ruhby3thxfjvwvlq',
    deployed: formatRelative(subDays(new Date(), 5), new Date()),
    status: 'success',
    name: 'parsinta.com',
    repo: 'irsyadadl/parsinta.com',
    icon: IconBrandGithub
  },
  {
    id: 'onuz9lqdzrlem00y',
    deployed: formatRelative(subDays(new Date(), 6), new Date()),
    status: 'failed',
    name: 'karteil.com',
    repo: 'irsyadadl/karteil.com',
    icon: IconBrandGithub
  }
]

export type Sites = {
  id: string
  deployed: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  name: string
  repo: string
  icon: React.ComponentType<SVGProps<SVGSVGElement>>
}
