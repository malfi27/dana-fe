'use client'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator
} from 'ui'

import { useGetListRacks } from '@/app/api/server-center/rack/get-list-rack'
import { wait, waitForApiResponse } from '@/lib/utils'
import {
  IconDevices,
  IconDotsVertical,
  IconOpenLink,
  IconRefresh,
  IconStorage,
  IconTrash
} from '@irsyadadl/paranoid'
import { toast } from 'sonner'
import { CreateRack } from './create-rack'
import { useConnectAdb } from '@/app/api/adb/post-connect'

export function ListRacks() {
  //Data fetching
  const { data, isLoading } = useGetListRacks()
  const { mutateAsync: mutateConnectAdb } = useConnectAdb()

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <CardHeader className="p-0">
          <CardTitle>Rack</CardTitle>
          <CardDescription>
            View all the rack that you have created.
          </CardDescription>
        </CardHeader>
        <div className="hidden items-center gap-x-1 sm:flex">
          <CreateRack />
        </div>
      </div>
      <div
        className={`grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5`}
      >
        {data?.data?.data?.map((ctx: any, index: number) => (
          <Card
            className={`relative flex flex-col justify-between overflow-hidden`}
            key={index}
          >
            <div className="flex-1">
              <CardHeader>
                <div className="flex items-center">
                  <div className="mr-3 grid size-8 place-content-center rounded-full border bg-secondary">
                    <IconStorage className="size-4 shrink-0" />
                  </div>
                  <CardTitle className="text-sm">{`Rack ${ctx?.rack_number}`}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul
                  className={`block space-y-2 [&_li]:flex [&_li]:justify-between [&_li]:text-xs lg:[&_li]:text-sm`}
                >
                  <li>
                    <span className="text-muted-fg">Box</span>
                    <span className="font-medium">{ctx?.box?.length}</span>
                  </li>
                  <li>
                    <span className="text-muted-fg">Device</span>
                    <span className="font-medium">{ctx?.device?.length}</span>
                  </li>
                  <li>
                    <span className="text-muted-fg">Server IP</span>
                    <span className="font-medium">{ctx?.server_ip}</span>
                  </li>
                </ul>
              </CardContent>
            </div>
            <CardFooter
              className={`justify-between gap-x-1 border-t bg-muted/30 py-3`}
            >
              <div className="space-y-1">
                <p className="text-xs text-muted-fg">Added By</p>
                <p className="text-xs font-semibold text-muted-fg">
                  {ctx?.created_by?.name}
                </p>
              </div>
              <Menu>
                <Button
                  appearance="plain"
                  className={`-mr-4 grid place-content-center`}
                >
                  <IconDotsVertical className="size-4" />
                </Button>
                <MenuContent className="min-w-48" placement="bottom end">
                  <MenuSection>
                    <MenuHeader separator>Manage</MenuHeader>
                  </MenuSection>
                  <MenuItem
                    onAction={() => {
                      toast.promise(wait(1500), {
                        loading: 'Refreshing rack...',
                        success: `Rack successfully refreshed.`,
                        error: `Failed to refresh rack.`
                      })
                    }}
                  >
                    <span className="flex items-center gap-x-2">
                      <IconRefresh className="size-4" />
                      Refresh
                    </span>
                  </MenuItem>
                  <MenuItem href={`/hardware/box?rackId=${ctx?._id}`}>
                    <IconOpenLink className="size-4" />
                    View Details
                  </MenuItem>
                  <MenuItem
                    onAction={() => {
                      toast.promise(
                        waitForApiResponse(
                          mutateConnectAdb({
                            rackId: ctx?._id
                          })
                        ),
                        {
                          loading: 'Connecting to Device...',
                          success: 'Successfully connected to Device.',
                          error: (data) => {
                            const response = data?.response?.data?.message
                            const message = `Failed to connect to Device ${response ? response : ''}. Please try again.`
                            return message
                          }
                        }
                      )
                    }}
                  >
                    <IconDevices className="size-4" />
                    Connect Devices
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem isDanger>
                    <IconTrash className="size-4" />
                    Delete
                  </MenuItem>
                </MenuContent>
              </Menu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
