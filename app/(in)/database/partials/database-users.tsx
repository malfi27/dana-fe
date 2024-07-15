'use client'
import {
  Badge,
  badgeStyles,
  Button,
  Card,
  CardContent,
  CardDescription,
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tag,
  TagGroup
} from 'ui'
import { dataDatabases } from '@/app/(in)/database/partials/list-databases'
import { toast } from 'sonner'
import { IconCheck } from '@irsyadadl/paranoid'
import { cn, wait } from '@/lib/utils'
import { Dialog } from 'react-aria-components'
import title from 'title'

const getRandomDatabases = (databases: { name: string }[], count: number) => {
  const shuffled = [...databases].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const users = [
  {
    name: 'berry86',
    database_access: getRandomDatabases(dataDatabases, 3)
  },
  {
    name: 'michael',
    database_access: getRandomDatabases(dataDatabases, 2)
  },
  {
    name: 'hcollier',
    database_access: getRandomDatabases(dataDatabases, 2)
  },
  {
    name: 'cweimann',
    database_access: getRandomDatabases(dataDatabases, 3)
  },
  {
    name: 'gmclaughlin',
    database_access: getRandomDatabases(dataDatabases, 5)
  },
  {
    name: 'jane',
    database_access: getRandomDatabases(dataDatabases, 2)
  },
  {
    name: 'daryl.tromp',
    database_access: getRandomDatabases(dataDatabases, 3)
  },
  {
    name: 'mills.clark',
    database_access: getRandomDatabases(dataDatabases, 4)
  }
]

export function DatabaseUsers() {
  return (
    <Card id="database-users">
      <CardHeader>
        <CardTitle>Database Users</CardTitle>
        <CardDescription>
          Manage the users that have access to your databases.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table aria-label="Database Users">
          <TableHeader>
            <TableRow>
              <TableColumn>Name</TableColumn>
              <TableColumn>Can access</TableColumn>
              <TableColumn />
            </TableRow>
          </TableHeader>
          <TableBody items={users}>
            {(user) => (
              <TableRow id={user.name}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <div className="block md:hidden">
                    <Badge className="inline-grid size-5 place-content-center p-0">
                      {user.database_access.length}
                    </Badge>
                    <Sheet>
                      <SheetTrigger
                        className={cn(badgeStyles(), 'ml-2 rounded-md')}
                      >
                        Show all
                      </SheetTrigger>
                      <SheetOverlay>
                        <SheetContent>
                          <SheetHeader className="text-left">
                            <SheetTitle>{user.name}</SheetTitle>
                            <SheetDescription>
                              This user can access the following databases:
                            </SheetDescription>
                          </SheetHeader>
                          <ul className="space-y-2 p-6">
                            {user.database_access.map((database, index) => (
                              <li className="flex items-center" key={index}>
                                <IconCheck className="mr-2 size-4" />
                                {database.name}
                              </li>
                            ))}
                          </ul>
                          <SheetFooter>
                            <SheetClose className="w-full">Close</SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </SheetOverlay>
                    </Sheet>
                  </div>
                  <div className="hidden gap-x-1 md:inline-flex">
                    <TagGroup
                      aria-label="Database Accessor"
                      items={user.database_access}
                    >
                      {(item) => <Tag id={item.name}>{title(item.name)}</Tag>}
                    </TagGroup>
                  </div>
                </TableCell>
                <TableCell className="flex justify-end">
                  <Popover>
                    <Button intent="warning" size="extra-small">
                      Detach
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
                                  permanently detach the user from the database.
                                </PopoverDescription>
                              </PopoverHeader>
                              <PopoverFooter>
                                <PopoverClose>Cancel</PopoverClose>
                                <Button
                                  intent="danger"
                                  onPress={() => {
                                    toast.promise(wait(1500), {
                                      loading: 'Detaching user...',
                                      success: 'User detached.',
                                      error: 'Failed to detach user.',
                                      finally: () => close()
                                    })
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
    </Card>
  )
}
