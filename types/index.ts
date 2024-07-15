import { Metadata } from 'next'

export interface SelectItemProps {
  value: string
  label: string
}

export interface PerformanceData {
  ram: string
  cpu: string
  storage: string
  uptime: string
}

export interface NetworkData {
  incomingTraffic: string
  outgoingTraffic: string
  bandwidth: string
  packetLoss: string
  latency: string
}

export interface SecurityData {
  activeConnections: string
  blockedAttacks: string
  sslCertStatus: string
  firewallStatus: string
}

export interface ServicesData {
  webServer: string
  databaseServer: string
  mailServer: string
  ftpServer: string
}

export interface ServerStatistics {
  performance: PerformanceData
  network: NetworkData
  security: SecurityData
  services: ServicesData
}

export interface SectionTitle {
  title: string | Metadata['title']
  description?: string | Metadata['description']
  className?: string
}

export type ItemProps = Record<'value' | 'label', string>
