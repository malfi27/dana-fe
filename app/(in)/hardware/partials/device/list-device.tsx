'use client'

import { useGetListDevice } from '@/app/api/server-center/device/get-list-device'
import {
  Badge,
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
  IconArrowLeft,
  IconBulletFill,
  IconDevicePhone,
  IconLoader,
  IconOpenLink
} from '@irsyadadl/paranoid'
import { useRouter, useSearchParams } from 'next/navigation'
import { CreateDevice } from './create-device'

export function ListDevice() {
  const Router = useRouter()
  const searchParams = useSearchParams()
  //Get Box ID from URL
  const query = searchParams.get('boxId')
  const rackId = searchParams.get('rackId')

  //Datafetching
  const { data, isLoading } = useGetListDevice(query ? query : '')

  return (
    <div className="space-y-4">
      <Button
        onPress={() => {
          Router.back()
        }}
        intent="secondary"
      >
        <IconArrowLeft />
        Back
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-end justify-between">
            <div>
              <CardTitle>List Device</CardTitle>
              <CardDescription>List of all devices in this box</CardDescription>
            </div>
            <CreateDevice
              rackId={rackId ? rackId : ''}
              boxId={query ? query : ''}
            />
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
                <TableColumn>Device</TableColumn>
                <TableColumn>Device Ip</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn />
              </TableHeader>
              <TableBody
                items={data?.data?.data}
                renderEmptyState={() => (
                  <div className="py-2 text-center">
                    No Device found in this box.
                  </div>
                )}
              >
                {(key: any) => {
                  return (
                    <TableRow id={key._id}>
                      <TableCell>
                        <div className={`flex h-full items-center gap-2`}>
                          <IconDevicePhone className="size-4" />
                          {`Device ${key?.device_number}`}
                        </div>
                      </TableCell>
                      <TableCell>{key?.device_ip}</TableCell>
                      <TableCell>
                        <Badge
                          className={`capitalize [&_svg]:size-3`}
                          intent={key.port ? 'secondary' : 'success'}
                        >
                          <IconBulletFill />
                          {key.port ? 'On Task' : 'Ready'}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-4">
                          <Button
                            onPress={() => {
                              Router.push(
                                `/hardware/device/device-detail?rackId=${rackId}&boxId=${query}&deviceId=${key._id}`
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
    </div>
  )
}
