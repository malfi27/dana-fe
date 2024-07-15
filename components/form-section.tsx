'use client'

import React, { FormHTMLAttributes, PropsWithChildren } from 'react'

type Props = FormHTMLAttributes<HTMLFormElement> &
  PropsWithChildren<{
    className?: string
    onSubmit(): void
  }>

export function FormSection({
  className,
  onSubmit,
  children,
  ...props
}: Props) {
  return (
    <form
      {...props}
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      {children}
    </form>
  )
}
