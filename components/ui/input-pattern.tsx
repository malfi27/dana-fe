import { PatternFormat, PatternFormatProps } from 'react-number-format'
import React from 'react'
import { cn } from '@/lib/utils'

export function InputPattern({
  prefix,
  suffix,
  className,
  ...props
}: {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
} & PatternFormatProps) {
  return (
    <div
      className={cn(
        'flex items-center [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-muted-fg',
        (suffix || prefix) &&
          'rounded-md border border-input transition duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20',
        className
      )}
    >
      {prefix && <div className="-mr-2.5 px-2.5">{prefix}</div>}
      <PatternFormat
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 transition duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-fg focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[0.20rem] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 lg:text-sm',
          (prefix || suffix) && 'border-0 focus-visible:ring-0'
        )}
        {...props}
      />
      {suffix && <div className="px-2">{suffix}</div>}
    </div>
  )
}
