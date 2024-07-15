'use client'

import React, { ReactNode } from 'react'
import { CardDescription, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'

export interface SectionTitle {
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionTitle({ title, description, className }: SectionTitle) {
  return (
    <CardHeader className={cn(className)}>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  )
}
