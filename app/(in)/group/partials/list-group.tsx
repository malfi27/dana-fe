'use client'

import { useGetAllAccounts } from '@/app/api/account/get-all-accounts'
import { useGetListGroup } from '@/app/api/group/get-list-group'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  Label,
  Menu,
  MenuContent,
  MenuItem,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  NumberField,
  SearchField,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TextField
} from '@/components/ui'
import { wait, waitForApiResponse } from '@/lib/utils'
import {
  IconChevronLgLeft,
  IconChevronLgRight,
  IconChevronsLgLeft,
  IconChevronsLgRight,
  IconCircleCheckFill,
  IconCirclePlusFill,
  IconDotsVertical,
  IconFolderBox,
  IconLoader,
  IconLogin,
  IconPeople,
  IconPlus,
  IconTrash,
  IconTrashPaper
} from '@irsyadadl/paranoid'
import { useState } from 'react'
import { CreateGroup } from './create-group'
import { toast } from 'sonner'
import { useAddAccountToGroup } from '@/app/api/group/add-account-to-group'
import { Contenteditable } from '@/components/contenteditable'
import { useUpdateGroup } from '@/app/api/group/put-update-group'

export const ListGroup = () => {
  const [modalAddAccount, setModalAddAccount] = useState(false)
  const [modalDetailGroup, setModalDetailGroup] = useState(false)
  const [searchAccount, setSearchAccount] = useState({
    search: ''
  })
  const [groupData, setGroupData] = useState<any>({})
  const [formAddAccount, setFormAddAccount] = useState<any>({
    group_id: '',
    account_ids: []
  })
  const [state, setState] = useState<any>({
    page: 1,
    limit: 10,
    search: ''
  })
  //Get list group
  const { data, isLoading, refetch } = useGetListGroup(state)
  //Get list Account
  const { data: resListAccounts, isLoading: loadingListAccount } =
    useGetAllAccounts(searchAccount)
  //Add account to group
  const { mutateAsync } = useAddAccountToGroup()
  //Update group
  const { mutateAsync: updateGroup } = useUpdateGroup()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Group</CardTitle>
          <CardDescription>
            You can group all accounts based on their groups by having a maximum
            balance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4">
            {/* Filter */}
            <div className="flex items-end justify-between gap-x-2">
              <div className="hidden gap-2 lg:flex"></div>
              <div className="flex gap-2">
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
                <CreateGroup />
              </div>
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
                  <TableColumn className={`text-nowrap`}>
                    Group Name
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Maximum Balance
                  </TableColumn>
                  <TableColumn className={`text-nowrap`}>
                    Total Accounts
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
                          <TableCell>
                            {item?.group_name ? item?.group_name : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.maximum_balance
                              ? //Rupiah
                                new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                  maximumFractionDigits: 0
                                }).format(item?.maximum_balance)
                              : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.accounts
                              ? `${item?.accounts?.length} Account`
                              : '0 Account'}
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
                                    setGroupData(item)
                                    setModalDetailGroup(true)
                                  }}
                                >
                                  <IconLogin />
                                  Detail
                                </MenuItem>
                                <MenuItem
                                  onAction={() => {
                                    setModalAddAccount(true)
                                    setFormAddAccount({
                                      ...formAddAccount,
                                      group_id: item?._id
                                    })
                                  }}
                                >
                                  <IconPlus />
                                  Add Account
                                </MenuItem>

                                <MenuItem onAction={() => {}} isDanger>
                                  <IconTrash />
                                  Delete Group
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

      {/* Modal Add Account to Group */}
      <Modal isOpen={modalAddAccount} onOpenChange={setModalAddAccount}>
        <ModalOverlay isDismissable={false}>
          <ModalContent className="sm:max-w-2xl">
            <ModalHeader className="text-left">
              <div className="flex">
                <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                  <IconFolderBox className="size-5" />
                </div>
                <div>
                  <ModalTitle className="text-base">
                    Added Account to Group
                  </ModalTitle>
                  <ModalDescription>
                    Add account to group to manage the account easier
                  </ModalDescription>
                </div>
              </div>
            </ModalHeader>

            <Form
              onSubmit={(e) => {
                e.preventDefault()
                toast.promise(waitForApiResponse(mutateAsync(formAddAccount)), {
                  loading: 'Adding account to group...',
                  success: 'Account added to group successfully',
                  error: 'Failed to add account to group'
                })
              }}
            >
              <ModalBody className="space-y-4">
                <SearchField
                  aria-label="Search Account"
                  placeholder="Search Account..."
                  className="w-full"
                  description="You can search account by their name or phone number"
                  onChange={(e) => {
                    wait(500).then(() => {
                      setSearchAccount({ ...state, search: e })
                    })
                  }}
                />
                {loadingListAccount ? (
                  <div className="flex items-start justify-center text-sm">
                    <IconLoader className="mr-1 size-3 animate-spin text-muted-fg" />
                    Loading Accounts...
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {resListAccounts?.data?.data?.map(
                      (acc: any, index: number) => {
                        return (
                          <div
                            onClick={() => {
                              if (
                                formAddAccount.account_ids.includes(acc._id)
                              ) {
                                setFormAddAccount({
                                  ...formAddAccount,
                                  account_ids:
                                    formAddAccount.account_ids.filter(
                                      (item: any) => item !== acc._id
                                    )
                                })
                              } else {
                                setFormAddAccount({
                                  ...formAddAccount,
                                  account_ids: [
                                    ...formAddAccount.account_ids,
                                    acc._id
                                  ]
                                })
                              }
                            }}
                            key={index}
                            className="relative flex w-full cursor-pointer items-center rounded-md border border-border bg-secondary p-1"
                          >
                            {
                              // for check icon
                              formAddAccount.account_ids.includes(acc._id) && (
                                <IconCircleCheckFill className="absolute -right-2 -top-2" />
                              )
                            }

                            <div className="mr-3 grid size-8 place-content-center rounded-full border bg-secondary">
                              <IconPeople className="size-4 shrink-0" />
                            </div>
                            <div>
                              <p className="max-w-[80px] truncate text-xs lg:text-sm">
                                {acc?.name}
                              </p>
                              <p className="hidden text-xs text-muted-fg md:block">
                                {acc?.phone_number}
                              </p>
                            </div>
                          </div>
                        )
                      }
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <ModalClose>Cancel</ModalClose>
                <Button intent="light/dark" type="submit">
                  <IconCirclePlusFill />
                  Add Now
                </Button>
              </ModalFooter>
            </Form>
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {/* Modal Detail Group */}
      <Modal isOpen={modalDetailGroup} onOpenChange={setModalDetailGroup}>
        <ModalOverlay isDismissable={false}>
          <ModalContent className="sm:max-w-xl">
            <ModalHeader className="text-left">
              <div className="flex">
                <div className="mr-3 grid h-11 w-12 place-content-center rounded-md border bg-secondary">
                  <IconFolderBox className="size-5" />
                </div>
                <div>
                  <ModalTitle className="text-base">Group</ModalTitle>
                  <ModalDescription>Detail Group Information</ModalDescription>
                </div>
              </div>
            </ModalHeader>

            <ModalBody className="space-y-4">
              <div className="space-y-1">
                <Label>Group Name</Label>
                <Contenteditable
                  className="bg-background px-4 py-2"
                  onBlur={(e) => {
                    wait(500).then(() => {
                      toast.promise(
                        waitForApiResponse(
                          updateGroup({
                            group_id: groupData?._id,
                            group_name: e
                          })
                        ),
                        {
                          loading: 'Update Process...',
                          success: (data) => {
                            if (data?.status === 200) {
                              refetch()
                            }

                            const successMessage = `Data Update successfully`
                            return successMessage
                          },

                          error:
                            'Failed to update data. Please try again later.'
                        }
                      )
                    })
                  }}
                >
                  {groupData?.group_name ? groupData?.group_name : '-'}
                </Contenteditable>
              </div>
              <div className="space-y-1">
                <Label>Maximum Balance</Label>
                <Contenteditable
                  className="bg-background px-4 py-2"
                  onBlur={(e) => {
                    wait(500).then(() => {
                      toast.promise(
                        waitForApiResponse(
                          updateGroup({
                            group_id: groupData?._id,
                            maximum_balance: e
                          })
                        ),
                        {
                          loading: 'Update Process...',
                          success: (data) => {
                            if (data?.status === 200) {
                              refetch()
                            }

                            const successMessage = `Data Update successfully`
                            return successMessage
                          },

                          error:
                            'Failed to update data. Please try again later.'
                        }
                      )
                    })
                  }}
                >
                  {groupData?.maximum_balance
                    ? groupData?.maximum_balance
                    : '-'}
                </Contenteditable>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Accounts</p>
                {groupData?.accounts?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {groupData?.accounts?.map((acc: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="relative flex w-full cursor-pointer items-center rounded-md border border-border bg-secondary p-1"
                        >
                          <div className="mr-3 grid size-8 place-content-center rounded-full border bg-secondary">
                            <IconPeople className="size-4 shrink-0" />
                          </div>
                          <div>
                            <p className="max-w-[80px] truncate text-xs lg:text-sm">
                              {acc?.name}
                            </p>
                            <p className="hidden text-xs text-muted-fg md:block">
                              {acc?.phone_number}
                            </p>
                            <p className="hidden text-xs text-muted-fg md:block">
                              {acc?.balance}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <IconTrashPaper className="size-8 text-muted-fg" />
                    <p className="text-center text-xs text-muted-fg">
                      No Account Found in this group
                    </p>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
