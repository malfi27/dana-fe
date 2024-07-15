import React from 'react'
import { Card, CardContent, SectionTitle } from 'ui'
import { ServerStatistics } from '@/types'

const serverStatisticsData: ServerStatistics = {
  performance: {
    ram: '8GB of 16GB',
    cpu: '35%',
    storage: '250GB of 500GB SSD',
    uptime: '48 days, 4 hours, 22 minutes'
  },
  network: {
    incomingTraffic: '150GB',
    outgoingTraffic: '200GB',
    bandwidth: '1Gbps',
    packetLoss: '0.01%',
    latency: '15ms'
  },
  security: {
    activeConnections: '120',
    blockedAttacks: '5 in the last 24 hours',
    sslCertStatus: 'Valid',
    firewallStatus: 'Enabled'
  },
  services: {
    webServer: 'Online',
    databaseServer: 'Online',
    mailServer: 'Online',
    ftpServer: 'Online'
  }
}

export function Stats() {
  return (
    <>
      <SectionTitle
        title="Server"
        description="Server statistics and performance."
        className="mb-6 p-0"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {Object.entries(serverStatisticsData).map(([category, values]) => (
          <Card key={category}>
            <SectionTitle
              title={category.charAt(0).toUpperCase() + category.slice(1)}
            />
            <CardContent>
              <div className="flex flex-col space-y-2.5">
                {Object.entries(values).map(([key, value]) => (
                  <div className="flex justify-between" key={key}>
                    <span className="text-sm text-muted-fg">
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-sm">{value as React.ReactNode}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
