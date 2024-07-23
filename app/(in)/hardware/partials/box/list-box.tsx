'use client'

import { useGetListBox } from '@/app/api/server-center/box/get-list-box'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  Popover,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverFooter,
  PopoverOverlay,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@/components/ui'
import {
  IconInbox2Fill,
  IconLoader,
  IconOpenLink,
  IconStorage
} from '@irsyadadl/paranoid'
import { useRouter, useSearchParams } from 'next/navigation'
import { CreateBox } from './create-box'

export function ListBox() {
  const Router = useRouter()
  const searchParams = useSearchParams()
  //Get Rack ID from URL
  const query = searchParams.get('rackId')

  //Datafetching
  const { data, isLoading } = useGetListBox(query ? query : '')

  return (
    <>
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center">
            <div className="mr-3 grid size-12 place-content-center rounded-md border bg-secondary">
              <IconStorage className="size-8 shrink-0" />
            </div>
            <div className="space-y-1">
              <CardTitle>Rack Information</CardTitle>
              <CardDescription>
                You are now in Rack{' '}
                {data?.data?.data[0]?.rack?.rack_number
                  ? data?.data?.data[0]?.rack?.rack_number
                  : '-'}{' '}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col items-start gap-2 md:flex-row md:gap-4">
            <div className="space-y-1 text-sm text-muted-fg">
              <p className="font-semibold">Rack Number</p>
              <p>
                {' '}
                {data?.data?.data[0]?.rack?.rack_number
                  ? data?.data?.data[0]?.rack?.rack_number
                  : '-'}
              </p>
            </div>
            <div className="space-y-1 text-sm text-muted-fg">
              <p className="font-semibold">Total Box</p>
              <p>
                {' '}
                {data?.data?.data[0]?.rack?.box?.length
                  ? data?.data?.data[0]?.rack?.box?.length
                  : '-'}
              </p>
            </div>
            <div className="space-y-1 text-sm text-muted-fg">
              <p className="font-semibold">Total Device In This Rack</p>
              <p>
                {data?.data?.data?.reduce((acc: number, curr: any) => {
                  return acc + curr.device.length
                }, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-end justify-between">
            <div>
              <CardTitle>List Box</CardTitle>
              <CardDescription>View all box that in this rack.</CardDescription>
            </div>
            <CreateBox query={query} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-4 text-sm">
              <IconLoader className="size-4 animate-spin" />
              Loading...
            </div>
          ) : (
            <Table aria-labelledby="box" aria-label="box" selectionMode="none">
              <TableHeader>
                <TableColumn>Box</TableColumn>
                <TableColumn>Device</TableColumn>
                <TableColumn />
              </TableHeader>
              <TableBody
                items={data?.data?.data}
                renderEmptyState={() => (
                  <div className="py-2 text-center">
                    No box found in this rack.
                  </div>
                )}
              >
                {(key: any) => {
                  return (
                    <TableRow id={key._id}>
                      <TableCell>
                        <div className={`flex h-full items-center gap-2`}>
                          <IconInbox2Fill className="size-4" />
                          {`Box ${key?.box_number}`}
                        </div>
                      </TableCell>
                      <TableCell>{`${key?.device?.length} Device`}</TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-4">
                          <Button
                            onPress={() => {
                              Router.push(
                                `/hardware/device?rackId=${query}&boxId=${key._id}`
                              )
                            }}
                            intent="light/dark"
                            size="extra-small"
                          >
                            <IconOpenLink className="size-4" />
                            View Detail
                          </Button>
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
                                        Are you sure you want to remove this
                                        Box?
                                      </PopoverBody>
                                      <PopoverFooter>
                                        <PopoverClose size="small">
                                          Cancel
                                        </PopoverClose>
                                        <Button
                                          size="small"
                                          onPress={() => {
                                            close()
                                          }}
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
                  )
                }}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  )
}
