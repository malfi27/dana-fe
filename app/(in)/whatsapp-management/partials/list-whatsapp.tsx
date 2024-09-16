'use client'

import { useGetListWhatsappAccount } from '@/app/api/whatsapp/get-whatsapp'
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Note,
  NoteDescription,
  NoteTitle,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@/components/ui'
import { useState } from 'react'

export const ListWhatsappManagementAccount = () => {
  const [state, setState] = useState<any>({
    whatsapp_status: ''
  })
  //Get list group
  const { data, isLoading } = useGetListWhatsappAccount(state)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Whatsapp Management</CardTitle>
          <CardDescription>
            Manage your session whatsapp account in
          </CardDescription>
          <div className="pt-4">
            <Note intent="info">
              <NoteTitle>Whatsapp Status Information</NoteTitle>
              <NoteDescription>
                If the status is active, it means the whatsapp account is still
                active and can be used. If the status is inactive, it means the
                whatsapp account session has expired and cannot be used. and
                please re-login to the whatsapp account. and dont log out the
                account from the device.
              </NoteDescription>
            </Note>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4">
            <Select
              label={'Period Time'}
              className={`w-40`}
              name="user"
              onSelectionChange={(e) => {
                setState({ ...state, whatsapp_status: e.toString() })
              }}
              defaultSelectedKey={state?.whatsapp_status}
              placeholder={state?.whatsapp_status || 'All'}
            >
              <SelectItem id="all">All</SelectItem>
              <SelectItem id="active">{`Active`}</SelectItem>
              <SelectItem id="inactive">{`In Active`}</SelectItem>
            </Select>
            {/* Table */}
            <div className="overflow-hidden rounded-md border bg-background">
              <Table
                aria-label="transaction"
                selectionMode="none"
                aria-describedby="transaction"
                aria-labelledby="transaction"
              >
                <TableHeader>
                  <TableColumn className={`text-nowrap`}>
                    Whatsapp Number
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Whatsapp Status
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Added Date
                  </TableColumn>
                </TableHeader>
                <TableBody
                  renderEmptyState={() => (
                    <div className="p-2 text-center">No data found.</div>
                  )}
                  items={data?.data}
                >
                  {isLoading ? (
                    <TableRow>
                      <TableCell>Searching Data...</TableCell>
                    </TableRow>
                  ) : (
                    (item: any) => {
                      return (
                        <TableRow id={item?._id}>
                          <TableCell>
                            {item?.whatsapp_number
                              ? item?.whatsapp_number
                              : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.whatsapp_status ? (
                              <Badge
                                shape="circle"
                                className={`capitalize [&_svg]:size-3`}
                                intent={
                                  item?.whatsapp_status === 'inactive'
                                    ? 'danger'
                                    : item?.whatsapp_status === 'active'
                                      ? 'success'
                                      : 'secondary'
                                }
                              >
                                {item.whatsapp_status
                                  ? item?.whatsapp_status
                                  : '-'}
                              </Badge>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {item?.createdAt
                              ? new Date(item.createdAt).toLocaleString(
                                  'id-ID',
                                  {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                  }
                                )
                              : '-'}
                          </TableCell>
                        </TableRow>
                      )
                    }
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
