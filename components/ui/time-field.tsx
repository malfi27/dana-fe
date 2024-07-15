'use client'
import {
  TimeField as TimeFieldPrimitive,
  TimeFieldProps as TimeFieldPrimitiveProps,
  TimeValue,
  ValidationResult
} from 'react-aria-components'
import { ctr } from './primitive'
import { DateInput } from './date-field'
import { Description, FieldError, fieldGroupStyles, Label } from './field'
import { tv } from 'tailwind-variants'

export interface TimeFieldProps<T extends TimeValue>
  extends TimeFieldPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const timeFieldStyles = tv({
  extend: fieldGroupStyles,
  base: 'flex w-fit min-w-28 justify-around whitespace-nowrap px-2.5 py-2 lg:text-sm'
})

export function TimeField<T extends TimeValue>({
  label,
  description,
  errorMessage,
  ...props
}: TimeFieldProps<T>) {
  return (
    <TimeFieldPrimitive
      {...props}
      className={ctr(props.className, 'flex flex-col gap-1')}
    >
      <Label>{label}</Label>
      <DateInput className={timeFieldStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TimeFieldPrimitive>
  )
}
