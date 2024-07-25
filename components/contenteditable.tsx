'use client'

import * as React from 'react'
import { cn } from 'ui/primitive'

const Contenteditable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onChange?: (value: string) => void
    onBlur?: (value: string) => void
  }
>(({ className, onChange, onBlur, ...props }, ref) => {
  const [isEditable, setIsEditable] = React.useState(false)

  const handleInput = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      if (onChange) {
        onChange(event.currentTarget.textContent || '')
      }
    },
    [onChange]
  )

  const handleDoubleClick = () => {
    setIsEditable(true)
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setIsEditable(false)
    if (onBlur) {
      onBlur(event.currentTarget.textContent || '')
    }
  }

  return (
    <div
      ref={ref}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      onInput={handleInput}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      className={cn(
        'max-h-96 overflow-y-auto whitespace-pre-wrap rounded-md border bg-zinc-900 p-6 font-mono text-xs leading-relaxed shadow-sm transition duration-200 focus:border-fg/70 focus:outline-none focus:ring-[0.20rem] focus:ring-ring',
        className,
        { '': !isEditable }
      )}
      {...props}
    />
  )
})

Contenteditable.displayName = 'Contenteditable'

export { Contenteditable }
