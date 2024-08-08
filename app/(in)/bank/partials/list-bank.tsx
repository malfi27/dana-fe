'use client'
import { useGetListBank } from '@/app/api/database/bank/get-list-bank'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Image from 'next/image'
import { CreateBank } from './create-bank'

export const ListBank = () => {
  const { data, isLoading } = useGetListBank()

  const calculateColumns = (data: any) => {
    if (!data) return [[], [], []]
    const totalItems = data.length
    if (totalItems <= 3) {
      return [data.slice(0, 1), data.slice(1, 2), data.slice(2, 3)]
    } else {
      const column1 = data.slice(0, Math.ceil(totalItems / 3))
      const column2 = data.slice(
        Math.ceil(totalItems / 3),
        Math.ceil((2 * totalItems) / 3)
      )
      const column3 = data.slice(Math.ceil((2 * totalItems) / 3))
      return [column1, column2, column3]
    }
  }

  const [column1, column2, column3] = calculateColumns(data?.data?.data)

  const BankItem = ({ bank }: any) => (
    <div className="mb-4 rounded-md border border-border p-2">
      <div className="flex items-center">
        <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted p-1">
          <Image
            src={
              bank?.code_bank === '014'
                ? `/bank/logo-bca.png`
                : bank?.code_bank === '008'
                  ? `/bank/logo-mandiri.png`
                  : bank?.code_bank === '009'
                    ? `/bank/logo-bni.png`
                    : `/bank/logo-bri.png`
            }
            width={100}
            height={100}
            alt="Logo"
          />
        </div>
        <div>
          <p className="text-sm font-semibold lg:text-lg">{bank.nama_bank}</p>
          <p className="text-xs font-semibold text-muted-fg lg:text-sm">
            Code Bank : {bank.code_bank}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <CardTitle>Database Bank</CardTitle>
            <CardDescription>
              List of bank data from database, you can add, edit, and delete
              bank data for using the automation feature
            </CardDescription>
          </div>
          <CreateBank />
        </div>
      </CardHeader>
      <CardContent>
        {data?.data?.data?.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm font-semibold text-muted-fg">
              No bank data found
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1">
              {column1?.map((bank: any, index: number) => (
                <BankItem key={index} bank={bank} />
              ))}
            </div>
            {column2.length > 0 && (
              <>
                <div className="mx-4 hidden w-px bg-gray-200 sm:block"></div>
                <div className="flex-1">
                  {column2?.map((bank: any, index: number) => (
                    <BankItem key={index} bank={bank} />
                  ))}
                </div>
              </>
            )}
            {column3.length > 0 && (
              <>
                <div className="mx-4 w-px bg-gray-200 lg:block"></div>
                <div className="flex-1 lg:block">
                  {column3?.map((bank: any, index: number) => (
                    <BankItem key={index} bank={bank} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ListBank
