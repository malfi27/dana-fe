'use client'

import { useGetAllAccounts } from '@/app/api/account/get-all-accounts'
import { useGetListBank } from '@/app/api/database/bank/get-list-bank'
import { useCreateGateway } from '@/app/api/gateway/create-gateway'
import {
  Button,
  Card,
  CardContent,
  Form,
  NumberField,
  SearchField,
  SectionTitle,
  Select,
  SelectItem,
  TextField
} from '@/components/ui'
import { wait, waitForApiResponse } from '@/lib/utils'
import {
  IconCircleCheckFill,
  IconLoader,
  IconPeople
} from '@irsyadadl/paranoid'
import { useState } from 'react'
import { toast } from 'sonner'

export const AutomationPage = () => {
  const [form, setForm] = useState({
    action: 'Transfer',
    amount: 0,
    account: '',
    account_number: '',
    destinationBankCode: 'BCA'
  })
  const [searchAccount, setSearchAccount] = useState({
    search: ''
  })

  //Datafetch
  const { mutateAsync } = useCreateGateway()
  //Get list Account
  const { data: resListAccounts, isLoading: loadingListAccount } =
    useGetAllAccounts(searchAccount)
  //Get list bank
  const { data: resListBank, isLoading: isLoadingListBank } = useGetListBank()

  return (
    <>
      <SectionTitle
        title="Transfer"
        description="Select the account you want to transfer from and to, and the amount you want to transfer."
        className="px-0"
      />
      <Card>
        <CardContent className="pt-6">
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              toast.promise(waitForApiResponse(mutateAsync(form)), {
                loading: 'Creating Task...',
                success: 'Task successful created',
                error: 'Failed to create task'
              })
            }}
            className="space-y-4"
          >
            <SearchField
              aria-label="Search Account"
              placeholder="Search Account..."
              className="w-full"
              description="You can search account by their name or phone number"
              onChange={(e) => {
                wait(500).then(() => {
                  setSearchAccount({
                    search: e
                  })
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
                {resListAccounts?.data?.data?.map((acc: any, index: number) => {
                  return (
                    <div
                      onClick={() => {
                        setForm({
                          ...form,
                          account: acc?._id
                        })
                      }}
                      key={index}
                      className="relative flex w-full cursor-pointer items-start rounded-md border border-border bg-secondary p-1"
                    >
                      {form?.account === acc?._id ? (
                        <IconCircleCheckFill className="absolute -right-2 -top-2" />
                      ) : (
                        ''
                      )}

                      <div className="mr-3 grid size-8 place-content-center rounded-full border bg-secondary">
                        <IconPeople className="size-4 shrink-0" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold lg:text-sm">
                          {acc?.name}
                        </p>
                        <p className="hidden text-xs text-muted-fg md:block">
                          {acc?.phone_number}
                        </p>
                        <p className="hidden text-xs text-muted-fg md:block">
                          {
                            //balance rp acc?.balance
                            new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              maximumFractionDigits: 0
                            }).format(acc?.balance)
                          }
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            <NumberField
              label="Amount"
              value={form.amount}
              onChange={(e) => {
                setForm({
                  ...form,
                  amount: e
                })
              }}
              description="Enter the amount you want to transfer money"
            />
            <Select
              label="Bank Name"
              placeholder="Select Bank"
              items={resListBank?.data?.data}
              isRequired
              defaultSelectedKey={form?.destinationBankCode}
              errorMessage={`Please select a bank `}
              onSelectionChange={(item) => {
                setForm({
                  ...form,
                  destinationBankCode: item.toString()
                })
              }}
            >
              {(item: any) => (
                <SelectItem id={item.nama_bank} textValue={item.nama_bank}>
                  {item.nama_bank}
                </SelectItem>
              )}
            </Select>
            <TextField
              label="Bank Number"
              value={form.account_number}
              onChange={(e) => {
                setForm({
                  ...form,
                  account_number: e
                })
              }}
              pattern="[0-9]*"
              description="Enter the client number you want to transfer money example : 1234567890"
            />
            <Button type="submit" intent="light/dark">
              Submit
            </Button>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
