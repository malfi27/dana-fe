'use client'

import { useGetDetailWhatsappSession } from '@/app/api/whatsapp/detail-whatsapp-session'
import { useGetListWhatsappAccount } from '@/app/api/whatsapp/get-whatsapp'
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
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
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
import {
  IconBarcode,
  IconBulletFill,
  IconChevronLgLeft,
  IconChevronLgRight,
  IconChevronsLgLeft,
  IconChevronsLgRight,
  IconDotsVertical,
  IconDuplicate
} from '@irsyadadl/paranoid'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

export const ListWhatsappManagementAccount = () => {
  const [stateModalDetailSession, setStateModalDetailSession] = useState(false)
  const [stateId, setStateId] = useState<any>({
    id: ''
  })
  const [state, setState] = useState<any>({
    status: '',
    page: 1,
    limit: 25
  })
  //Get list group
  const { data, isLoading } = useGetListWhatsappAccount(state)
  //Detail Whatsapp Session
  const { data: resDetailSession, isLoading: isLoadingDetailSession } =
    useGetDetailWhatsappSession(stateId)

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
              label={'Status'}
              className={`w-40`}
              name="user"
              onSelectionChange={(e) => {
                setState({ ...state, status: e.toString() })
              }}
              defaultSelectedKey={state?.status}
              placeholder={state?.status || 'All'}
            >
              <SelectItem id="all">All</SelectItem>
              <SelectItem id="WORKING">{`Active`}</SelectItem>
              <SelectItem id="SCAN_QR_CODE">{`QR Code`}</SelectItem>
              <SelectItem id="FAILED">{`Failed`}</SelectItem>
              <SelectItem id="STARTING">{`Starting`}</SelectItem>
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
                    Worker Name
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Whatsapp Status
                  </TableColumn>
                  <TableColumn
                    className={`flex justify-end text-nowrap text-end`}
                  >
                    Action
                  </TableColumn>
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
                        <TableRow id={item?.session_name}>
                          <TableCell>
                            {item?.session_name ? item?.session_name : '-'}
                          </TableCell>

                          <TableCell className={`capitalize`}>
                            {item?.worker_name ? item?.worker_name : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.status ? (
                              <Badge
                                shape="circle"
                                className={`capitalize [&_svg]:size-3`}
                                intent={
                                  item?.status === 'SCAN_QR_CODE'
                                    ? 'warning'
                                    : item?.status === 'WORKING'
                                      ? 'success'
                                      : 'danger'
                                }
                              >
                                <IconBulletFill />
                                {item.status
                                  ? item?.status === 'SCAN_QR_CODE'
                                    ? 'Scan QR'
                                    : item?.status === 'WORKING'
                                      ? 'Active'
                                      : 'Non Active'
                                  : '-'}
                              </Badge>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="flex justify-center">
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
                                      item.session_name
                                    )
                                    toast.success(
                                      'Phone Number copied to clipboard'
                                    )
                                  }}
                                >
                                  <IconDuplicate />
                                  Copy Phone Number
                                </MenuItem>
                                <MenuItem
                                  onAction={() => {
                                    setStateId({ id: item.session_name })
                                    setStateModalDetailSession(true)
                                  }}
                                >
                                  <IconBarcode />
                                  Detail
                                </MenuItem>
                                {/* <MenuItem onAction={() => {}} isDanger>
                                  <IconTrash />
                                  Delete
                                </MenuItem> */}
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
                placeholder={state?.limit.toString() || '25'}
              >
                <SelectItem id="25">25</SelectItem>
                <SelectItem id="50">50</SelectItem>
                <SelectItem id="100">100</SelectItem>
                <SelectItem id="200">200</SelectItem>
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
                <div className="text-xs">{`${state?.page} / ${data?.data?.pagination?.totalPages ? data?.data?.pagination?.totalPages : '1'}`}</div>
                <Button
                  isDisabled={state.page === data?.data?.pagination?.totalPages}
                  appearance="plain"
                  onPress={() => {
                    setState({ ...state, page: state.page + 1 })
                  }}
                >
                  <IconChevronLgRight />
                </Button>
                <Button
                  isDisabled={state.page === data?.data?.pagination?.totalPages}
                  appearance="plain"
                  onPress={() => {
                    setState({
                      ...state,
                      page: data?.data?.pagination?.totalPages
                    })
                  }}
                >
                  <IconChevronsLgRight />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ModalOverlay
        isDismissable={false}
        isOpen={stateModalDetailSession}
        onOpenChange={setStateModalDetailSession}
      >
        <ModalContent size="2xl">
          <ModalHeader>
            <ModalTitle>
              Detail Whatsapp Session
              <span className="font-bold">
                {' '}
                {resDetailSession?.data?.data?.whatsapp_name
                  ? resDetailSession?.data?.data?.whatsapp_name
                  : ''}
              </span>
            </ModalTitle>
            <ModalDescription>
              Detail information about whatsapp session account in here ...
            </ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center space-y-4 pt-8">
              {isLoadingDetailSession ? (
                <p className="text-center text-sm text-muted-fg">Loading...</p>
              ) : (
                <>
                  <ul
                    className={`block w-full max-w-sm space-y-2 [&_li]:flex [&_li]:justify-between [&_li]:text-xs lg:[&_li]:text-sm`}
                  >
                    <li>
                      <span className="text-muted-fg">Phone Number : </span>
                      <span className="font-medium">
                        {resDetailSession?.data?.data?.whatsapp_name
                          ? resDetailSession?.data?.data?.whatsapp_name
                          : '-'}
                      </span>
                    </li>
                    <li>
                      <span className="text-muted-fg">Status : </span>
                      <span className="font-medium">
                        {resDetailSession?.data?.data?.instance_status
                          ? resDetailSession?.data?.data?.instance_status
                          : '-'}
                      </span>
                    </li>
                  </ul>
                  {resDetailSession?.data?.data?.qr_code_image ? (
                    <Image
                      alt="QR Code"
                      src={resDetailSession?.data?.data?.qr_code_image}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  ) : (
                    <p className="text-center text-sm text-muted-fg">No QR</p>
                  )}
                </>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="pt-4">
            <ModalClose>Close</ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </>
  )
}
