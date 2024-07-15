'use client'
import {
  TextArea as TextAreaPrimitive,
  TextField as TextFieldPrimitive,
  TextFieldProps as TextFieldPrimitiveProps,
  ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { Description, FieldError, Label } from './field'
import { ctr, focusStyles } from './primitive'

export interface TextareaProps extends TextFieldPrimitiveProps {
  autoSize?: boolean
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const texareaVariants = tv({
  extend: focusStyles,
  base: 'w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-2 text-base shadow-sm outline-none transition duration-200 disabled:bg-secondary sm:text-sm'
})

export function Textarea({
  label,
  description,
  errorMessage,
  ...props
}: TextareaProps) {
  return (
    <TextFieldPrimitive
      {...props}
      className={ctr(props.className, 'flex flex-col gap-1')}
    >
      {label && <Label>{label}</Label>}
      <TextAreaPrimitive className={texareaVariants} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TextFieldPrimitive>
  )
}
