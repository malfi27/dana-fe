'use client'

import * as React from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  SearchField,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import receipts from '@/data/receipts.json'
import {
  IconChevronDown,
  IconDotsVertical,
  IconDuplicate,
  IconHighlight,
  IconTrash
} from '@irsyadadl/paranoid'
import { title } from '@/lib/utils'

export function Receipts() {
  // @ts-ignore
  const allKeys = [...new Set(data.flatMap(Object.keys))]

  const menuItems = allKeys.map((key) => ({ label: key }))
  return (
    <Card id="receipts" className="hidden md:block">
      <CardHeader>
        <CardTitle>Receipts</CardTitle>
      </CardHeader>
      <div className="flex items-center border-y p-6">
        <SearchField />
        <Menu>
          <Button appearance="outline" className="ml-auto">
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
      <Table
        aria-label="Receipts"
        className="max-h-96 overflow-y-auto rounded-md"
      >
        <TableHeader>
          <TableColumn>Order number</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>When</TableColumn>
          <TableColumn />
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow
              id={item.order_number}
              data-state={item.status === 'success' && 'selected'}
            >
              <TableCell>{item.order_number}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.when}</TableCell>
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
                    <MenuItem isDanger>
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
    </Card>
  )
}

const data: ReceiptsProps[] = receipts

export type ReceiptsProps = {
  order_number: string
  amount: number
  status: string
  when: string
}
