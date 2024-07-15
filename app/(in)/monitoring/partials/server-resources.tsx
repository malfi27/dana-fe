'use client'

import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectItem
} from 'ui'
import React, { useState } from 'react'
import serverResources from '@/data/chart/server-resources.json'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from 'recharts'
import { IconBullet, IconCalendar2 } from '@irsyadadl/paranoid'
import { LinearGradient, TooltipContent } from '@/components/chart-needs'
import { type Key } from 'react-aria-components'

export interface ServerData {
  timestamp: string
  activeUsers: number
  requestCount: number
  exception: number
  dataTransfer: number
}

export function ServerResources() {
  const [selectedServer, setSelectedServer] = useState<Key>(
    serverResources[0].serverName
  )

  const selectedData =
    serverResources
      .find((server) => server.serverName === selectedServer)
      ?.data.map((item) => ({
        ...item,
        exception: item.exception
      })) || []

  return (
    <Card>
      <div className="flex items-center justify-between gap-6 p-6">
        <CardHeader className="p-0">
          <CardTitle>Resource</CardTitle>
          <CardDescription>
            Resource usage for every server that is currently active.
          </CardDescription>
        </CardHeader>
        <Select
          aria-label={`Select a server`}
          selectedKey={selectedServer}
          onSelectionChange={(v) => setSelectedServer(v)}
          placeholder="Select a server"
          items={serverResources}
        >
          {(item) => (
            <SelectItem id={item.serverName} textValue={item.serverName}>
              {item.serverName}
            </SelectItem>
          )}
        </Select>
      </div>

      <CardContent className="p-0">
        <div className="h-56 overflow-hidden sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={selectedData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <LinearGradient id="purple" from="#8884d8" to="#8884d8" />
                <LinearGradient id="green" from="#82ca9d" to="#82ca9d" />
                <LinearGradient id="pink" from="#ec4899" to="#f9a8d4" />
                <LinearGradient id="sky" from="#0ea5e9" to="#38bdf8" />
              </defs>
              <CartesianGrid
                vertical={true}
                horizontal={true}
                className="stroke-muted"
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                fill="url(#pink)"
                className="stroke-pink-500"
                type="monotone"
                dataKey="exception"
                stackId="1"
                stroke="current"
              />
              <Area
                fill="url(#green)"
                className="stroke-green-500"
                type="monotone"
                dataKey="activeUsers"
                stackId="1"
                stroke="current"
              />
              <Area
                fill="url(#purple)"
                className="stroke-purple-500"
                type="monotone"
                dataKey="requestCount"
                stackId="1"
                stroke="current"
              />
              <Area
                fill="url(#sky)"
                className="stroke-sky-500"
                type="monotone"
                dataKey="dataTransfer"
                stackId="1"
                stroke="current"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContent>
        <p className="font-semibold">
          <IconCalendar2 />{' '}
          {format(new Date(payload[0].payload.timestamp), 'd MMM, yyyy')}
        </p>
        <p>
          <IconBullet className="fill-sky-500/20 text-sky-500" />
          <span className="text-muted-fg">Data transfer: </span>
          <span>{payload[3].value}</span>
        </p>
        <p>
          <IconBullet className="fill-purple-500/20 text-purple-500" />

          <span className="text-muted-fg">Requests: </span>
          <span>{payload[1].value}</span>
        </p>
        <p>
          <IconBullet className="fill-green-500/20 text-green-500" />
          <span className="text-muted-fg">Active users:</span>
          <span>{payload[0].value}</span>
        </p>
        <p>
          <IconBullet className="fill-pink-500/20 text-pink-500" />
          <span className="text-muted-fg">Exception: </span>
          <span>{payload[2].value}</span>
        </p>
      </TooltipContent>
    )
  }
  return null
}
