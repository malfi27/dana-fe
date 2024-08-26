'use client'

import { useGetPaymentStatistic } from '@/app/api/payment/get-statistic-payment'
import { Select, SelectItem } from '@/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import * as React from 'react'
import type { Key } from 'react-aria-components'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
  paidAmount: {
    label: 'Paid Amount',
    color: 'hsl(var(--chart-2))'
  },
  totalAmount: {
    label: 'Total Amount',
    color: 'hsl(var(--chart-1))'
  },
  unpaidAmount: {
    label: 'Unpaid Amount',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

export function TransactionStatistic() {
  const [state, setState] = React.useState({
    time_range: '30d'
  })
  const [timeRange, setTimeRange] = React.useState<Key>('30d')
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 180
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '1d') {
      daysToSubtract = 1
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  const { data } = useGetPaymentStatistic(state)

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transaction Chart</CardTitle>
          <CardDescription>
            Showing transaction data by requested time range
          </CardDescription>
        </div>
        <Select
          aria-label="Time Range"
          className="max-w-[16rem]"
          selectedKey={timeRange}
          onSelectionChange={(e) => {
            setState({ time_range: e.toString() })
          }}
        >
          <SelectItem id="6m">Last 6 months</SelectItem>
          <SelectItem id="30d">Last 30 days</SelectItem>
          <SelectItem id="1d">Last Day</SelectItem>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={data?.data}>
            <defs>
              <linearGradient id="fillpaidAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-paidAmount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-paidAmount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filltotalAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalAmount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalAmount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillunpaidAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-unpaidAmount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-unpaidAmount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="paidAmount"
              type="natural"
              fill="url(#fillpaidAmount)"
              stroke="var(--color-paidAmount)"
              stackId="a"
            />
            <Area
              dataKey="totalAmount"
              type="natural"
              fill="url(#filltotalAmount)"
              stroke="var(--color-totalAmount)"
              stackId="a"
            />
            <Area
              dataKey="unpaidAmount"
              type="natural"
              fill="url(#fillunpaidAmount)"
              stroke="var(--color-unpaidAmount)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const chartData: {
  date: string
  paidAmount: number
  totalAmount: number
  unpaidAmount: number
}[] = []
const generateRandomData = (startDate: Date, days: number) => {
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    chartData.push({
      date: currentDate.toISOString().split('T')[0],
      paidAmount: Math.floor(Math.random() * 500),
      totalAmount: Math.floor(Math.random() * 300),
      unpaidAmount: Math.floor(Math.random() * 50)
    })
  }
}

const startDate = new Date()
startDate.setMonth(startDate.getMonth() - 3)
const days = 90

generateRandomData(startDate, days)
