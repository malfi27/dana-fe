'use client'

import { IconLoader } from '@irsyadadl/paranoid'
import * as React from 'react'
import {
  TextField as TextFieldPrimitive,
  TextFieldProps as TextFieldPrimitiveProps,
  ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { Description, FieldError, FieldGroup, Input, Label } from './field'
import { ctr, focusStyles } from './primitive'

interface TextFieldProps extends TextFieldPrimitiveProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  isLoading?: boolean
  indicatorPlace?: 'prefix' | 'suffix'
}

const inputStyles = tv({
  extend: focusStyles,
  base: [
    'group-data-focus:outline-none h-10 w-full min-w-0 rounded-lg border border-input bg-background p-2.5 text-base shadow-sm transition duration-200 sm:text-sm',
    'disabled:bg-secondary'
  ],
  variants: {
    isFocusVisible: { false: 'border-input', true: 'border-primary' },
    isFocused: { false: 'border-input', true: 'border-primary' }
  }
})

const TextField = ({
  label,
  description,
  errorMessage,
  placeholder,
  prefix,
  suffix,
  isLoading,
  indicatorPlace,
  ...props
}: TextFieldProps) => {
  return (
    <TextFieldPrimitive
      {...props}
      className={ctr(props.className, 'group flex flex-col gap-1')}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup
        data-loading={isLoading ? 'true' : undefined}
        className="flex items-center group-invalid:border-danger group-invalid:focus-within:ring-danger/20"
      >
        {isLoading && indicatorPlace === 'prefix' ? (
          <IconLoader className="isPfx animate-spin" />
        ) : prefix ? (
          <span className="atrs isPfx">{prefix}</span>
        ) : null}
        <Input className="px-2.5" placeholder={placeholder} />
        {isLoading && indicatorPlace === 'suffix' ? (
          <IconLoader className="isSfx animate-spin" />
        ) : suffix ? (
          <span className="atrs isSfx">{suffix}</span>
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  )
}

export { inputStyles, TextField, TextFieldPrimitive }
export type { TextFieldProps }
