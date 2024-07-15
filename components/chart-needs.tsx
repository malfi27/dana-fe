'use client'

import React from 'react'

interface Props {
  id: string
  from: string
  to: string
  fromOffset?: string
  toOffset?: string
  fromOpacity?: number
  toOpacity?: number
}

export function LinearGradient({
  id,
  from,
  to,
  fromOffset = '5%',
  toOffset = '95%',
  fromOpacity = 0.8,
  toOpacity = 0
}: Props) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset={fromOffset} stopColor={from} stopOpacity={fromOpacity} />
      <stop offset={toOffset} stopColor={to} stopOpacity={toOpacity} />
    </linearGradient>
  )
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-fg/30 bg-secondary p-2 font-mono text-[0.750rem] shadow-lg [&>p:first-child_svg]:mr-0 [&_p:last-child]:mb-0 [&_p]:mb-1 [&_p]:text-fg [&_svg]:mr-2 [&_svg]:inline [&_svg]:size-3.5">
      {children}
    </div>
  )
}
