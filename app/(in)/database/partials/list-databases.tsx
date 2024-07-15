'use client'
import {
  Button,
  buttonStyles,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverOverlay,
  PopoverTitle,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import { IconRefresh } from '@irsyadadl/paranoid'
import { toast } from 'sonner'
import { wait } from '@/lib/utils'
import { Dialog } from 'react-aria-components'

export function ListDatabases() {
  return (
    <Card id="list-databases">
      <CardHeader>
        <CardTitle>List Databases</CardTitle>
        <CardDescription>
          View all the databases that you have created on this server.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto p-0">
        <Table aria-label="Databases">
          <TableHeader>
            <TableColumn>Database</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody items={dataDatabases}>
            {(database) => (
              <TableRow id={database.name}>
                <TableCell className="font-medium">{database.name}</TableCell>
                <TableCell className="flex justify-end">
                  <Popover>
                    <Button intent="danger" size="extra-small">
                      Remove
                    </Button>
                    <PopoverOverlay className="backdrop-blur-sm">
                      <PopoverContent placement="left" className="sm:max-w-sm">
                        <Dialog>
                          {({ close }) => (
                            <>
                              <PopoverHeader>
                                <PopoverTitle>
                                  Are you absolutely sure?
                                </PopoverTitle>
                                <PopoverDescription>
                                  This action cannot be undone. This will
                                  permanently delete your database.
                                </PopoverDescription>
                              </PopoverHeader>
                              <PopoverFooter>
                                <PopoverClose size="small">Cancel</PopoverClose>
                                <Button
                                  intent="danger"
                                  size="small"
                                  onPress={() => {
                                    toast.promise(wait(2000), {
                                      loading: 'Deleting database...',
                                      success: 'Database deleted.',
                                      error: 'Failed to delete database.'
                                    })
                                    close()
                                  }}
                                >
                                  Continue
                                </Button>
                              </PopoverFooter>
                            </>
                          )}
                        </Dialog>
                      </PopoverContent>
                    </PopoverOverlay>
                  </Popover>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="gap-x-2">
        <a className={buttonStyles()} href="#create-database">
          Add Database
        </a>
        <Button
          onPress={() => {
            toast.promise(wait(1000), {
              loading: 'Syncing database...',
              success: 'Database synced.',
              error: 'Failed to sync database.'
            })
          }}
          className="shadow-none dark:shadow"
        >
          <IconRefresh />
          Sync Database
        </Button>
      </CardFooter>
    </Card>
  )
}

export const dataDatabases = [
  { name: 'parsinta' },
  { name: 'karteil' },
  { name: 'provision' },
  { name: 'example' },
  { name: 'doctor_st' },
  { name: 'hospital' },
  { name: 'clinic' },
  { name: 'pharmacy' },
  { name: 'patient' },
  { name: 'nurse' },
  { name: 'doctor' },
  { name: 'sys' }
]
