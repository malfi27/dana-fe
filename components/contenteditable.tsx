'use client'

import * as React from 'react'
import { cn } from 'ui/primitive'

const Contenteditable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    contentEditable={true}
    suppressContentEditableWarning={true}
    className={cn(
      'max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md border bg-zinc-900 p-6 font-mono text-xs leading-relaxed text-white shadow-sm transition duration-200 focus:border-fg/70 focus:outline-none focus:ring-[0.20rem] focus:ring-ring',
      className
    )}
    {...props}
  />
))

Contenteditable.displayName = 'Contenteditable'

export { Contenteditable }
