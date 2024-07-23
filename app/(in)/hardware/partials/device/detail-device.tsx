'use client'

import { useGetAccounts } from '@/app/api/account/get-accounts'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Menu,
  MenuContent,
  MenuItem,
  SearchField,
  SectionTitle,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@/components/ui'
import { wait } from '@/lib/utils'
import {
  IconArrowLeft,
  IconBulletFill,
  IconChevronLgLeft,
  IconChevronLgRight,
  IconChevronsLgLeft,
  IconChevronsLgRight,
  IconDevicePhoneFill,
  IconDotsVertical,
  IconDuplicate,
  IconTrash
} from '@irsyadadl/paranoid'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { CreateAccount } from './create-account'

export function DetailDevice() {
  const Routes = useRouter()
  const searchParams = useSearchParams()
  //Get Box ID,Rack Id and Device Id from URL
  const boxId = searchParams.get('boxId')
  const rackId = searchParams.get('rackId')
  const deviceId = searchParams.get('deviceId')

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  })
  const [search, setSearch] = useState('')
  const [balanceRange, setBalanceRange] = useState('')

  //Data fetching
  const { data, isLoading } = useGetAccounts({
    page: pagination.page,
    limit: pagination.limit,
    deviceId: deviceId ? deviceId : '',
    search: search,
    balanceRange: balanceRange
  })

  return (
    <div className="space-y-6">
      <Button
        onPress={() => {
          Routes.back()
        }}
        intent="secondary"
      >
        <IconArrowLeft />
        Back
      </Button>
      <SectionTitle
        className="p-0"
        title={'Device Detail'}
        description="Here you can manage your accounts. You can search, filter, and manage your accounts."
      />
      <Card>
        <CardHeader className="border-b border-border">
          <div className="gpa-4 flex items-center">
            <div className="mr-3 grid size-12 place-content-center rounded-md border bg-secondary">
              <IconDevicePhoneFill className="size-8 shrink-0 text-muted-fg" />
            </div>
            <div>
              <CardTitle>Device Information</CardTitle>
              <CardDescription>
                this is where the device information will be displayed
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-6 space-y-4 text-sm [&_div]:font-semibold [&_label]:text-muted-fg">
            <div>
              <label>Device Number</label>
              <div>
                {data?.data?.deviceInfo?.device_number
                  ? data?.data?.deviceInfo?.device_number
                  : '0'}
              </div>
            </div>

            <div>
              <label>Box</label>
              <div>
                {data?.data?.deviceInfo?.box?.box_number
                  ? data?.data?.deviceInfo?.box?.box_number
                  : '0'}
              </div>
            </div>
            <div>
              <label>Rack</label>
              <div>
                {data?.data?.deviceInfo?.rack?.rack_number
                  ? data?.data?.deviceInfo?.rack?.rack_number
                  : '0'}
              </div>
            </div>
            <div>
              <label>Server IP</label>
              <div>
                {data?.data?.deviceInfo?.rack?.server_ip
                  ? data?.data?.deviceInfo?.rack?.server_ip
                  : '0'}
              </div>
            </div>
            <div>
              <label>Device Ip</label>
              <div>
                {data?.data?.deviceInfo?.device_ip
                  ? data?.data?.deviceInfo?.device_ip
                  : '0'}
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label>Status</label>
              <Badge
                className={`w-fit capitalize [&_svg]:size-3`}
                intent={data?.data?.deviceInfo?.port ? 'secondary' : 'success'}
              >
                <IconBulletFill />
                {data?.data?.deviceInfo?.port ? 'On Task' : 'Ready'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-end justify-between">
            <div>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Here you can manage your accounts. You can search, filter, and
                manage your accounts.
              </CardDescription>
            </div>
            <CreateAccount device_id={deviceId} />
          </div>
        </CardHeader>
        <div className="space-y-4 px-6 pb-6">
          {/* Filter */}
          <div className="flex items-end justify-between gap-x-2">
            <div className="hidden gap-2 lg:flex">
              <Select
                label={'Balance Range'}
                className={`w-40`}
                name="user"
                onSelectionChange={(e) => {
                  setBalanceRange(e?.toString())
                }}
                defaultSelectedKey={balanceRange}
                placeholder={balanceRange || 'All'}
              >
                <SelectItem id="">All</SelectItem>
                <SelectItem id="lt100000">{`< Rp 100.000`}</SelectItem>
                <SelectItem id="gt100000">{`> Rp 100.000`}</SelectItem>
                <SelectItem id="gt500000">{`> Rp 500.000`}</SelectItem>
                <SelectItem id="gt1000000">{`> Rp 1.000.000`}</SelectItem>
              </Select>
            </div>
            <SearchField
              aria-label="Search sites"
              placeholder="Search..."
              className="w-full lg:max-w-52"
              onChange={(e) => {
                wait(500).then(() => {
                  setSearch(e)
                })
              }}
            />
          </div>
          {/* Table */}
          <div className="overflow-hidden rounded-md border bg-background">
            <Table
              aria-label="account"
              selectionMode="none"
              aria-describedby="account"
              aria-labelledby="account"
            >
              <TableHeader>
                <TableColumn className={`text-nowrap`}>
                  Phone Number
                </TableColumn>
                <TableColumn className={`text-nowrap`}>Balance</TableColumn>
                <TableColumn className={`text-nowrap`}>Name</TableColumn>
                <TableColumn className={`text-nowrap`}>NIK</TableColumn>
                <TableColumn className={`text-nowrap`}>Email</TableColumn>
                <TableColumn className={`text-nowrap`}>PIN</TableColumn>
                <TableColumn className={`text-nowrap`}></TableColumn>
              </TableHeader>
              <TableBody
                renderEmptyState={() => (
                  <div className="p-2 text-center">No data found.</div>
                )}
                items={data?.data?.data}
              >
                {isLoading ? (
                  <TableRow>
                    <TableCell>Searching Data...</TableCell>
                  </TableRow>
                ) : (
                  (item: any) => {
                    return (
                      <TableRow id={item?._id}>
                        <TableCell className={`font-semibold`}>
                          {item?.phone_number ? item?.phone_number : '-'}
                        </TableCell>
                        <TableCell>
                          {item?.balance
                            ? //curency idr
                              new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0
                              }).format(item?.balance)
                            : '-'}
                        </TableCell>
                        <TableCell>{item?.name ? item?.name : '-'}</TableCell>
                        <TableCell>{item?.nik ? item?.nik : '-'}</TableCell>
                        <TableCell>{item?.email ? item?.email : '-'}</TableCell>
                        <TableCell>{item?.pin ? item?.pin : '-'}</TableCell>
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
                              <MenuItem
                                onAction={() => {
                                  navigator.clipboard.writeText(
                                    item.phone_number
                                  )
                                  toast.success(
                                    'Phone Number copied to clipboard'
                                  )
                                }}
                              >
                                <IconDuplicate />
                                Copy Phone Number
                              </MenuItem>
                              <MenuItem onAction={() => {}} isDanger>
                                <IconTrash />
                                Delete
                              </MenuItem>
                            </MenuContent>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    )
                  }
                )}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="flex w-full items-center justify-between">
            <Select
              aria-labelledby="limit"
              aria-describedby="limit"
              className={`w-16`}
              name="limit"
              onSelectionChange={(e) => {
                setPagination({ ...pagination, limit: parseInt(e.toString()) })
              }}
              placeholder={pagination?.limit.toString() || '10'}
            >
              <SelectItem id="10">10</SelectItem>
              <SelectItem id="20">20</SelectItem>
              <SelectItem id="50">50</SelectItem>
              <SelectItem id="100">100</SelectItem>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                appearance="plain"
                isDisabled={pagination.page === 1}
                onPress={() => {
                  setPagination({ ...pagination, page: 1 })
                }}
              >
                <IconChevronsLgLeft />
              </Button>
              <Button
                appearance="plain"
                isDisabled={pagination.page === 1}
                onPress={() => {
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }}
              >
                <IconChevronLgLeft />
              </Button>
              <div className="text-xs">{`${pagination?.page} / ${data?.data?.totalPages ? data?.data?.totalPages : '1'}`}</div>
              <Button
                isDisabled={pagination.page === data?.data?.totalPages}
                appearance="plain"
                onPress={() => {
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }}
              >
                <IconChevronLgRight />
              </Button>
              <Button
                isDisabled={pagination.page === data?.data?.totalPages}
                appearance="plain"
                onPress={() => {
                  setPagination({ ...pagination, page: data?.data?.totalPages })
                }}
              >
                <IconChevronsLgRight />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
