import { useGetListPaymentTransaction } from '@/app/api/payment/get-payment'
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
  IconChevronLgLeft,
  IconChevronLgRight,
  IconChevronsLgLeft,
  IconChevronsLgRight,
  IconDotsVertical,
  IconDuplicate,
  IconTrash
} from '@irsyadadl/paranoid'
import { useState } from 'react'
import { toast } from 'sonner'

export const TransactionTable = () => {
  const [state, setState] = useState<any>({
    page: 1,
    limit: 10,
    search: '',
    period: 'all'
  })
  const { data, isLoading } = useGetListPaymentTransaction(state)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            This is the list of transaction history that has been made by the
            user payment request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4">
            {/* Filter */}
            <div className="flex items-end justify-between gap-x-2">
              <div className="hidden gap-2 lg:flex">
                <Select
                  label={'Period Time'}
                  className={`w-40`}
                  name="user"
                  onSelectionChange={(e) => {
                    setState({ ...state, period: e.toString() })
                  }}
                  defaultSelectedKey={state?.period}
                  placeholder={state?.period || 'All'}
                >
                  <SelectItem id="all">All</SelectItem>
                  <SelectItem id="day">{`This Day`}</SelectItem>
                  <SelectItem id="week">{`Week`}</SelectItem>
                  <SelectItem id="month">{`Month`}</SelectItem>
                  <SelectItem id="year">{`Year`}</SelectItem>
                </Select>
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
                aria-label="transaction"
                selectionMode="none"
                aria-describedby="transaction"
                aria-labelledby="transaction"
              >
                <TableHeader>
                  <TableColumn className={`text-nowrap`}>#ID</TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Invoice Number
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>Type</TableColumn>
                  <TableColumn className={`text-nowrap`}>Amount</TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Payment Status
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Automation Status
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
                            {item?.invoice_number ? item?.invoice_number : '-'}
                          </TableCell>
                          <TableCell>{item?.type ? item?.type : '-'}</TableCell>
                          <TableCell>
                            {item?.amount
                              ? //Rupiah
                                new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                  maximumFractionDigits: 0
                                }).format(item?.amount)
                              : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              shape="circle"
                              className={`capitalize [&_svg]:size-3`}
                              intent={
                                item?.status === 'UNPAID'
                                  ? 'danger'
                                  : item?.status === 'PAID'
                                    ? 'success'
                                    : 'secondary'
                              }
                            >
                              {item.status ? item?.status : '-'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item?.automation_status ? (
                              <Badge
                                shape="circle"
                                className={`capitalize [&_svg]:size-3`}
                                intent={
                                  item?.automation_status === 'Failed'
                                    ? 'danger'
                                    : item?.automation_status === 'Success'
                                      ? 'success'
                                      : 'secondary'
                                }
                              >
                                {item.automation_status
                                  ? item?.automation_status
                                  : '-'}
                              </Badge>
                            ) : (
                              '-'
                            )}
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
