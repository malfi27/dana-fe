'use client'

import * as React from 'react'
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
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
import { IconChevronDown } from '@irsyadadl/paranoid'
import dataTeam from '@/data/team.json'
import { title } from '@/lib/utils'
import { dataSites } from '@/app/(in)/sites/partials/list-sites'

interface RoleCount {
  role: string
  count: number
}

const countRoles = (data: typeof dataTeam): RoleCount[] => {
  const roleCounts = data.reduce<Record<string, number>>((acc, { roles }) => {
    roles.forEach((role) => {
      acc[role] = acc[role] ? acc[role] + 1 : 1
    })
    return acc
  }, {})

  return Object.entries(roleCounts).map(([role, count]) => ({
    role,
    count
  }))
}

export interface Team {
  id: number
  joined: string
  name: string
  roles: any[]
  image_url: string
  status: string
}

const data: Team[] = dataTeam

export function ListTeam() {
  const allKeys = Array.from(new Set(dataSites.flatMap(Object.keys)))

  const menuItems = allKeys.map((key) => ({ label: key }))
  return (
    <>
      <div className="flex items-center gap-x-2 py-4">
        <SearchField placeholder="Search..." className="max-w-sm" />
        <Menu>
          <Button appearance="outline" className="ml-auto bg-background">
            Columns <IconChevronDown className="ml-2 size-4" />
          </Button>
          <MenuContent items={menuItems} placement="bottom end">
            {(item) => (
              <MenuCheckboxItem id={item.label}>
                {title(item.label)}
              </MenuCheckboxItem>
            )}
          </MenuContent>
        </Menu>
      </div>
      <div className="overflow-hidden rounded-lg border bg-background">
        <Table aria-label="Teams" selectionMode="multiple">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Joined</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Roles</TableColumn>
            <TableColumn>Image_url</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.joined}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.roles}</TableCell>
                <TableCell>{item.image_url}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-fg">
          {/*{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)*/}
          {/*selected.*/}
        </div>
        <Pagination>
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
      </div>
    </>
  )
}
