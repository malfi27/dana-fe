'use client'

import {
  Badge,
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
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import {
  IconBulletFill,
  IconDotsVertical,
  IconHighlight,
  IconPlayFill,
  IconStopFill,
  IconTrash
} from '@irsyadadl/paranoid'
import { useState } from 'react'
import { toast } from 'sonner'
import { wait } from '@/lib/utils'

export function ListSchedules() {
  const [schedules, setSchedules] = useState<ListSchedules[]>(dataSchedules)

  function updateSchedule(
    id: number,
    status: 'Paused' | 'Active' | 'Inactive',
    message: string
  ) {
    const index = schedules.findIndex((schedule) => schedule.id === id)
    if (index !== -1) {
      schedules[index].status = status
      setSchedules([...schedules])
      toast.success(message)
    }
  }

  function remove(id: number) {
    const index = schedules.findIndex((schedule) => schedule.id === id)
    if (index !== -1) {
      toast.promise(wait(3000), {
        loading: 'Removing schedule...',
        success: 'Schedule removed',
        finally: () => {
          schedules.splice(index, 1)
          setSchedules([...schedules])
        }
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>List Schedules</CardTitle>
        <CardDescription>
          List of schedules to use in your sites.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table aria-label="Schedules">
          <TableHeader>
            <TableColumn className="w-0">ID</TableColumn>
            <TableColumn>Frequency</TableColumn>
            <TableColumn>Cron</TableColumn>
            <TableColumn>User</TableColumn>
            <TableColumn>Command</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody items={schedules}>
            {(schedule) => (
              <TableRow id={schedule.id}>
                <TableCell>{schedule.id}</TableCell>
                <TableCell>{schedule.frequency}</TableCell>
                <TableCell>
                  <span className="text-warning">{schedule.cron}</span>
                </TableCell>
                <TableCell>{schedule.user}</TableCell>
                <TableCell>
                  <Snippet text={schedule.command} />
                </TableCell>
                <TableCell>
                  <Badge
                    intent={
                      schedule.status === 'Active'
                        ? 'success'
                        : schedule.status === 'Paused'
                          ? 'warning'
                          : schedule.status === 'Inactive'
                            ? 'danger'
                            : 'secondary'
                    }
                  >
                    <IconBulletFill />
                    {schedule.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Menu>
                      <MenuTrigger>
                        <IconDotsVertical />
                      </MenuTrigger>
                      <MenuContent placement="left top">
                        <MenuItem>
                          <IconHighlight /> Edit
                        </MenuItem>

                        {schedule.status === 'Active' ? (
                          <MenuItem
                            onAction={() =>
                              updateSchedule(
                                schedule.id,
                                'Paused',
                                'Schedule paused'
                              )
                            }
                          >
                            <IconStopFill /> Pause
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onAction={() =>
                              updateSchedule(
                                schedule.id,
                                'Active',
                                'Schedule activated'
                              )
                            }
                          >
                            <IconPlayFill className="text-emerald-600" /> Start
                          </MenuItem>
                        )}
                        <MenuSeparator />
                        <MenuItem isDanger>
                          <IconTrash /> Remove
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

type ListSchedules = {
  id: number
  frequency: string
  cron: string
  user: string
  command: string
  status: string
}

const dataSchedules: ListSchedules[] = [
  {
    id: 1440259,
    frequency: 'Daily',
    cron: '0 0 * * *',
    user: 'root',
    command: '/usr/bin/bun upgrade',
    status: 'Active'
  },
  {
    id: 2905659,
    frequency: 'Daily',
    cron: '34 * * * 4',
    user: 'GtwEsGxA',
    command: '/usr/bin/composer update',
    status: 'Paused'
  },
  {
    id: 8182624,
    frequency: 'Monthly',
    cron: '14 8 * * *',
    user: 'axnVdbWG',
    command: 'sendmail user@example.com',
    status: 'Active'
  },
  {
    id: 6317144,
    frequency: 'Weekly',
    cron: '18 * * 4 0',
    user: 'rtJuJwNQ',
    command: 'curl -X GET https://acme.com/disposable-emails',
    status: 'Inactive'
  },
  {
    id: 3693494,
    frequency: 'Monthly',
    cron: '* * * 10 4',
    user: 'hzhIovBr',
    command: '/usr/bin/composer update',
    status: 'Active'
  }
]
