'use client'

import {
  Badge,
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
  MenuSeparator,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Tooltip,
  TooltipContent
} from 'ui'

import {
  IconAdapter,
  IconBarsTwo2,
  IconBulletFill,
  IconDeviceDesktop,
  IconDotsVertical,
  IconGrid4,
  IconHdd,
  IconOpenLink,
  IconRefresh,
  IconSdCard,
  IconStorage,
  IconTrash,
  IconUsbC
} from '@irsyadadl/paranoid'
import React, { FC, SVGProps } from 'react'
import { toast } from 'sonner'
import { cn, wait } from '@/lib/utils'
import { CreateServer } from '@/app/(in)/servers/partials/create-server'
import { twJoin } from 'tailwind-merge'

export function ListServers() {
  const formatKey = (key: string) => key.replace(/_/g, ' ')
  const [gridView, setGridView] = React.useState(true)
  const [modalData, setModalData] = React.useState<ServerDetails | null>(null)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [servers, setServers] = React.useState<ServerDetails[]>(serverDetails)
  const [loading, setLoading] = React.useState(false)

  function deleteServer(srv: Omit<ServerDetails, 'icon'>) {
    setLoading(true)
    toast.promise(wait(2000), {
      loading: `Deleting ${srv.name}...`,
      success: `${srv.name} has been deleted.`,
      error: `${srv.name} failed to be deleted.`,
      finally: () => {
        setServers(servers.filter((server) => server.name !== srv.name))
        setLoading(false)
        closeModal()
      }
    })
  }

  const handleAction = (selectedId: any) => {
    const data = servers.find((server) => server.id === selectedId)
    if (data) {
      setModalData(data)
      setIsOpen(true)
    }
  }

  function closeModal() {
    setModalData(null)
    setIsOpen(false)
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <CardHeader className="p-0">
          <CardTitle>Servers</CardTitle>
          <CardDescription>
            View all the servers that you have created.
          </CardDescription>
        </CardHeader>
        <div className="hidden items-center gap-x-1.5 sm:flex">
          <Tooltip>
            <Button appearance="outline" onPress={() => setGridView(!gridView)}>
              {gridView ? (
                <IconBarsTwo2 className="size-4" />
              ) : (
                <IconGrid4 className="size-4" />
              )}
              <span className="sr-only">
                {gridView ? 'Switch to list view' : 'Switch to grid view'}
              </span>
            </Button>
            <TooltipContent>
              {gridView ? 'Switch to list view' : 'Switch to grid view'}
            </TooltipContent>
          </Tooltip>

          <CreateServer />
        </div>
      </div>
      <div
        className={cn(
          'grid',
          gridView
            ? 'gap-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 divide-x-0 divide-y divide-border overflow-hidden rounded-lg border'
        )}
      >
        {servers.map(({ icon: Icon, ...srv }, index) => (
          <Card
            className={cn(
              'relative',
              gridView
                ? 'flex flex-col justify-between overflow-hidden'
                : 'rounded-none border-transparent'
            )}
            key={index}
          >
            <div className="flex-1">
              <CardHeader>
                <div className="flex items-center">
                  <div className="mr-3 grid size-8 place-content-center rounded-full border bg-secondary">
                    <Icon className="size-4 shrink-0" />
                  </div>
                  <CardTitle className="lg:text-sm">{srv.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul
                  className={cn(
                    'lg:[&_li]:text-sm',
                    gridView
                      ? 'block space-y-2 [&_li]:flex [&_li]:justify-between'
                      : 'flex justify-between gap-x-6 [&>li_span:first-child]:after:content-[":"] [&>li_span]:mr-2'
                  )}
                >
                  {Object.entries(srv.features).map(
                    ([featureKey, featureValue], featureIndex) => {
                      if (Array.isArray(featureValue)) return null
                      return (
                        <li key={featureIndex}>
                          <span className="text-muted-fg">
                            {formatKey(featureKey)}
                          </span>
                          <span className="font-medium">{featureValue}</span>
                        </li>
                      )
                    }
                  )}
                </ul>
              </CardContent>
            </div>
            <CardFooter
              className={cn(
                'justify-between gap-x-1 border-t bg-muted/30 py-3',
                !gridView && 'border-none p-0'
              )}
            >
              <Badge
                className={cn(
                  !gridView && 'absolute right-12 top-4',
                  '[&_svg]:size-3'
                )}
                intent={
                  srv.status === 'connected'
                    ? 'success'
                    : srv.status === 'disconnected'
                      ? 'danger'
                      : srv.status === 'archived'
                        ? 'warning'
                        : 'secondary'
                }
              >
                <IconBulletFill />
                {srv.status}
              </Badge>
              <Menu>
                <Button
                  appearance="plain"
                  className={twJoin(
                    '-mr-4 grid place-content-center',
                    gridView ? '' : 'absolute right-6 top-2'
                  )}
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
                        loading: 'Refreshing status...',
                        success: `${srv.name} is ${srv.status}.`,
                        error: `${srv.name} failed to refresh status.`
                      })
                    }}
                  >
                    <span className="flex items-center gap-x-2">
                      <IconRefresh className="size-4" />
                      Refresh Status
                    </span>
                  </MenuItem>
                  <MenuItem href="/">
                    <IconOpenLink className="size-4" />
                    View Details
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem isDanger onAction={() => handleAction(srv.id)}>
                    <IconTrash className="size-4" />
                    Delete
                  </MenuItem>
                </MenuContent>
              </Menu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {modalData !== null && (
        <ModalOverlay isOpen={isOpen} onOpenChange={closeModal}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Delete {modalData.name} ?</ModalTitle>
              <ModalDescription>
                This action cannot be undone. This will remove the site
                permanently.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button intent="danger" onPress={() => deleteServer(modalData)}>
                Continue
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  )
}

interface ServerFeatures {
  PHP_Version?: string
  MySQL_Version?: string
  NodeJS_Version?: string
  Python_Version?: string
  Storage: string
  Bandwidth: string
  RAM: string
  Deployments: string
  Additional_Features?: string[]
}

interface ServerDetails {
  id: number | string
  name: string
  status?: string
  icon: FC<SVGProps<SVGSVGElement>>
  features: ServerFeatures
}

export const serverDetails: ServerDetails[] = [
  {
    id: 1,
    name: 'cloudy',
    icon: IconAdapter,
    status: 'connected',
    features: {
      PHP_Version: '8.3',
      MySQL_Version: '8.0',
      Storage: '25GB SSD',
      Bandwidth: '1TB',
      RAM: '2GB',
      Deployments: 'Unlimited'
    }
  },
  {
    id: 2,
    name: 'sunny',
    icon: IconDeviceDesktop,
    status: 'connected',
    features: {
      NodeJS_Version: '20.x',
      Storage: '30GB SSD',
      Bandwidth: '2TB',
      RAM: '3GB',
      Deployments: 'Unlimited'
    }
  },
  {
    id: 3,
    name: 'stormy',
    icon: IconHdd,
    status: 'disconnected',
    features: {
      Python_Version: '3.8',
      Storage: '40GB SSD',
      Bandwidth: '3TB',
      RAM: '4GB',
      Deployments: 'Unlimited'
    }
  },
  {
    id: 4,
    name: 'windy',
    icon: IconStorage,
    status: 'archived',
    features: {
      PHP_Version: '8.0',
      NodeJS_Version: '14.x',
      Python_Version: '3.7',
      Storage: '50GB SSD',
      Bandwidth: '4TB',
      RAM: '8GB',
      Deployments: 'Unlimited'
    }
  },
  {
    id: 5,
    name: 'frosty',
    icon: IconSdCard,
    status: 'connected',
    features: {
      Storage: '60GB SSD',
      Bandwidth: '5TB',
      RAM: '16GB',
      Deployments: 'Unlimited'
    }
  },
  {
    id: 6,
    name: 'misty',
    icon: IconUsbC,
    status: 'halted',
    features: {
      Storage: '100GB SSD',
      Bandwidth: '10TB',
      RAM: '32GB',
      Deployments: 'Unlimited'
    }
  }
]
