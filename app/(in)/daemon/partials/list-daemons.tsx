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
  MenuSeparator,
  MenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import { useState } from 'react'
import { toast } from 'sonner'
import { IconDotsVertical } from '@irsyadadl/paranoid'

export function ListDaemons() {
  const [daemons, setDaemons] = useState<ListDaemons[]>(dataDaemons)

  function remove(id: number) {
    setDaemons(daemons.filter((daemon) => daemon.id !== id))
    toast.success('Daemon has been removed.')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>List Daemons</CardTitle>
        <CardDescription>List of daemons to use in your sites.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table aria-label="Daemons">
          <TableHeader>
            <TableRow>
              <TableColumn className="w-0">ID</TableColumn>
              <TableColumn>Command</TableColumn>
              <TableColumn>Directory</TableColumn>
              <TableColumn>User</TableColumn>
              <TableColumn>Processes</TableColumn>
              <TableColumn />
            </TableRow>
          </TableHeader>
          <TableBody items={daemons}>
            {(daemon) => (
              <TableRow id={daemon.id}>
                <TableCell>{daemon.id}</TableCell>
                <TableCell>{daemon.command}</TableCell>
                <TableCell>{daemon.directory}</TableCell>
                <TableCell>{daemon.user}</TableCell>
                <TableCell>{daemon.nop}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Menu>
                      <MenuTrigger>
                        <IconDotsVertical />
                      </MenuTrigger>
                      <MenuContent placement="left">
                        <MenuItem>Edit</MenuItem>
                        <MenuSeparator />
                        <MenuItem isDanger>Delete</MenuItem>
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

type ListDaemons = {
  id: number
  command: string
  directory: string
  user: string
  nop: number
  start_seconds: number
  stop_seconds: number
  stop_signals: string
}

const dataDaemons: ListDaemons[] = [
  {
    id: 492939,
    command: 'pm2 start',
    directory: '/home/irsyad.co',
    user: 'root',
    nop: 4,
    start_seconds: 1,
    stop_seconds: 5,
    stop_signals: 'SIGQUIT'
  },
  {
    id: 3121234,
    command: '/usr/bin/bun run start',
    directory: '/home/acme.co',
    user: 'root',
    nop: 1,
    start_seconds: 1,
    stop_seconds: 10,
    stop_signals: 'SIGTERM'
  }
]
