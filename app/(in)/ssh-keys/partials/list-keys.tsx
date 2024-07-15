'use client'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Popover,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverFooter,
  PopoverOverlay,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import { format } from 'date-fns'
import { Dialog } from 'react-aria-components'

export const dataKeys: Keys[] = [
  {
    name: 'ROG Flow Z13',
    user: 'jdoyle',
    status: false,
    created_at: '2024-02-29 09:26:53'
  },
  {
    name: 'Macbook M2',
    user: 'kwiegand',
    status: true,
    created_at: '2024-03-02 09:26:53'
  },
  {
    name: 'Surface Laptop 4',
    user: 'x4kak',
    status: false,
    created_at: '2024-03-29 09:26:53'
  }
]

export type Keys = {
  name: string
  user: string
  status: boolean
  created_at: string
}

export function ListKeys() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>List SSH Keys</CardTitle>
        <CardDescription>
          View all the SSH keys that you have created on this server.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Users</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Created at</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody
            items={dataKeys}
            renderEmptyState={() => <>No SSH keys found.</>}
          >
            {(key) => (
              <TableRow id={key.name}>
                <TableCell>{key.name}</TableCell>
                <TableCell>{key.user}</TableCell>
                <TableCell>
                  <Switch />
                </TableCell>
                <TableCell>
                  {format(new Date(key.created_at), 'PPPP')}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Popover>
                      <Button intent="danger" size="extra-small">
                        Remove
                      </Button>
                      <PopoverOverlay className="backdrop-blur-sm">
                        <PopoverContent placement="left">
                          <Dialog role={'alertdialog'}>
                            {({ close }) => (
                              <>
                                <PopoverBody>
                                  Are you sure you want to remove this SSH key?
                                </PopoverBody>
                                <PopoverFooter>
                                  <PopoverClose size="small">
                                    Cancel
                                  </PopoverClose>
                                  <Button
                                    size="small"
                                    onPress={close}
                                    intent="danger"
                                  >
                                    Remove
                                  </Button>
                                </PopoverFooter>
                              </>
                            )}
                          </Dialog>
                        </PopoverContent>
                      </PopoverOverlay>
                    </Popover>
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
