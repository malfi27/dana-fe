'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './accordion'
import Link, { LinkProps } from 'next/link'
import React, { FC, SVGProps, useId } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function AccordionMenu({
  trigger,
  children,
  icon: Icon,
  isExpanded = false
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  icon?: FC<SVGProps<SVGSVGElement>>
  isExpanded?: boolean
}) {
  const id = useId()
  return (
    <Accordion
      defaultValue={isExpanded ? `menu-${id}` : ''}
      type="single"
      collapsible
    >
      <AccordionItem className="border-b-0" value={`menu-${id}`}>
        <AccordionTrigger className="group rounded-md px-2.5 py-2 text-sm transition duration-200 hover:bg-fg/5 hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <span className="flex items-center gap-x-3">
            {Icon && (
              <Icon
                className={cn(
                  'size-[1.115rem] shrink-0 text-muted-fg transition duration-200 group-hover:text-fg'
                )}
              />
            )}
            {trigger}
          </span>
        </AccordionTrigger>
        <AccordionContent className="ml-4 mt-0.5 border-l px-0 pb-0.5">
          <ul>{children}</ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

interface AccordionMenuItemProps extends LinkProps {
  children?: React.ReactNode
  className?: string
  badge?: React.ReactNode
}

export function AccordionMenuItem({
  className,
  children,
  badge,
  ...props
}: AccordionMenuItemProps) {
  const pathname = usePathname()
  const active = pathname.startsWith(props.href as string)
  return (
    <li className="relative -ml-4 pr-0.5">
      {active && (
        <span className="absolute left-[14.75px] block h-9 w-[1.3px] bg-fg" />
      )}
      <Link
        className={cn(
          'relative flex w-full items-center justify-between rounded-md py-2 pl-10 pr-4 text-muted-fg hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          active && 'bg-fg/5 text-fg'
        )}
        {...props}
      >
        <span>{children}</span>
        {badge && (
          <span className="-mr-2 grid h-[1.15rem] place-content-center rounded border border-blue-500 bg-blue-500/[0.15] px-1 text-[10px] font-semibold text-blue-500 shadow">
            {badge}
          </span>
        )}
      </Link>
    </li>
  )
}
