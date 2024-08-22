'use client'

import { useGetDashboardStatistic } from '@/app/api/dashboard/statistic'

const AutomationComponentDashboard = () => {
  const { data } = useGetDashboardStatistic()
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data?.data?.transaction?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="rounded-lg border border-border bg-background p-4"
            >
              <p className="text-2xl font-extrabold">
                {item?.count ? item?.count : '0'}
              </p>
              <p className="text-xs font-medium text-muted-fg">
                {item?.status ? `Transaction ${item?.status}` : ''}
              </p>
            </div>
          )
        })}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {data?.data?.automation?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="rounded-lg border border-border bg-background p-4"
            >
              <p className="text-2xl font-extrabold">
                {item?.count ? item?.count : '0'}
              </p>
              <p className="text-xs font-medium text-muted-fg">
                {item?.status ? `Automation ${item?.status}` : ''}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default AutomationComponentDashboard
