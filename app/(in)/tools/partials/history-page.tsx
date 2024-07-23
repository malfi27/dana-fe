'use client'

import { useGetListGateway } from '@/app/api/gateway/get-gateway'
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
  IconBulletFill,
  IconCalendarClockFill,
  IconChevronLgLeft,
  IconChevronLgRight,
  IconChevronsLgLeft,
  IconChevronsLgRight,
  IconDotsVertical,
  IconDuplicate,
  IconThumbsDownFill,
  IconTrash,
  IconTruckFill,
  IconYesFill
} from '@irsyadadl/paranoid'
import { useState } from 'react'
import { toast } from 'sonner'

export const HistoryGateway = () => {
  const [state, setState] = useState({
    page: 1,
    limit: 10,
    search: '',
    startDate: '',
    endDate: ''
  })
  const { data, isLoading } = useGetListGateway(state)
  return (
    <>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Statistic History</CardTitle>
          <CardDescription>
            View the history of your statistics. You can see the changes of your
            statistics over time.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
            <div className="flex flex-col gap-2 rounded-lg border border-border p-2 md:flex-row md:items-center md:gap-0">
              <div className="mr-3 grid size-8 place-content-center rounded-md border bg-secondary md:size-12">
                <IconYesFill className="size-4 shrink-0 text-success md:size-8" />
              </div>
              <div>
                <p className="text-sm font-bold md:text-2xl">
                  {data?.data?.statusStats?.Success
                    ? data?.data?.statusStats?.Success
                    : '0'}
                </p>
                <p className="text-xs text-muted-fg md:text-sm">
                  Transaction Succes
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-border p-2 md:flex-row md:items-center md:gap-0">
              <div className="mr-3 grid size-8 place-content-center rounded-md border bg-secondary md:size-12">
                <IconThumbsDownFill className="size-4 shrink-0 text-danger md:size-8" />
              </div>
              <div>
                <p className="text-sm font-bold md:text-2xl">
                  {' '}
                  {data?.data?.statusStats?.Failed
                    ? data?.data?.statusStats?.Failed
                    : '0'}
                </p>
                <p className="text-xs text-muted-fg md:text-sm">
                  Transaction Failed
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-border p-2 md:flex-row md:items-center md:gap-0">
              <div className="mr-3 grid size-8 place-content-center rounded-md border bg-secondary md:size-12">
                <IconCalendarClockFill className="size-4 shrink-0 text-muted-fg md:size-8" />
              </div>
              <div>
                <p className="text-sm font-bold md:text-2xl">
                  {data?.data?.statusStats?.['On Progress']
                    ? data?.data?.statusStats?.['On Progress']
                    : '0'}
                </p>
                <p className="text-xs text-muted-fg md:text-sm">
                  Transaction On Progress
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-border p-2 md:flex-row md:items-center md:gap-0">
              <div className="mr-3 grid size-8 place-content-center rounded-md border bg-secondary md:size-12">
                <IconTruckFill className="size-4 shrink-0 text-secondary-fg md:size-8" />
              </div>
              <div>
                <p className="text-sm font-bold md:text-2xl">
                  {data?.data?.statusStats?.Pending
                    ? data?.data?.statusStats?.Pending
                    : '0'}
                </p>
                <p className="text-xs text-muted-fg md:text-sm">
                  Transaction On Pending
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="space-y-4 px-6 pb-6 pt-6">
            {/* Filter */}
            <div className="flex items-end justify-between gap-x-2">
              <div className="hidden gap-2 lg:flex">
                {/* <Select
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
                </Select> */}
              </div>
              <SearchField
                aria-label="Search sites"
                placeholder="Search..."
                className="w-full lg:max-w-52"
                onChange={(e) => {
                  wait(500).then(() => {
                    setState({ ...state, search: e })
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
                  <TableColumn className={`text-nowrap`}>#ID</TableColumn>
                  <TableColumn className={`text-nowrap`}>Action</TableColumn>
                  <TableColumn className={`text-nowrap`}>Status</TableColumn>
                  <TableColumn className={`text-nowrap`}>Message</TableColumn>
                  <TableColumn className={`text-nowrap`}>Account</TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Client Number
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Account Register
                  </TableColumn>

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
                            {item?.id ? item?.id : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.action ? item?.action : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`capitalize [&_svg]:size-3`}
                              intent={
                                item?.status === 'Failed'
                                  ? 'danger'
                                  : item?.status === 'Success'
                                    ? 'success'
                                    : item?.status === 'On Progress'
                                      ? 'warning'
                                      : 'secondary'
                              }
                            >
                              <IconBulletFill />
                              {item.status ? item?.status : '-'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item?.result_message
                              ? item?.result_message.includes('element')
                                ? 'Contact developer for more information about this error'
                                : item?.result_message
                              : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.account ? item?.account?.phone_number : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.account_number ? item?.account_number : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.register_account
                              ? item?.register_account
                              : '-'}
                          </TableCell>
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
                                    navigator.clipboard.writeText(item.id)
                                    toast.success('ID copied to clipboard')
                                  }}
                                >
                                  <IconDuplicate />
                                  Copy ID
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
                  setState({ ...state, limit: parseInt(e.toString()), page: 1 })
                }}
                placeholder={state?.limit.toString() || '10'}
              >
                <SelectItem id="10">10</SelectItem>
                <SelectItem id="20">20</SelectItem>
                <SelectItem id="50">50</SelectItem>
                <SelectItem id="100">100</SelectItem>
              </Select>
              <div className="flex items-center gap-2">
                <Button
                  appearance="plain"
                  isDisabled={state.page === 1}
                  onPress={() => {
                    setState({ ...state, page: 1 })
                  }}
                >
                  <IconChevronsLgLeft />
                </Button>
                <Button
                  appearance="plain"
                  isDisabled={state.page === 1}
                  onPress={() => {
                    setState({ ...state, page: state.page - 1 })
                  }}
                >
                  <IconChevronLgLeft />
                </Button>
                <div className="text-xs">{`${state?.page} / ${data?.data?.totalPages ? data?.data?.totalPages : '1'}`}</div>
                <Button
                  isDisabled={state.page === data?.data?.totalPages}
                  appearance="plain"
                  onPress={() => {
                    setState({ ...state, page: state.page + 1 })
                  }}
                >
                  <IconChevronLgRight />
                </Button>
                <Button
                  isDisabled={state.page === data?.data?.totalPages}
                  appearance="plain"
                  onPress={() => {
                    setState({ ...state, page: data?.data?.totalPages })
                  }}
                >
                  <IconChevronsLgRight />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
