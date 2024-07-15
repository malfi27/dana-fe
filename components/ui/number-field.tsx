'use client'

import { IconChevronDown, IconChevronUp } from '@irsyadadl/paranoid'
import {
  Button,
  ButtonProps,
  NumberField as NumberFieldPrimitive,
  NumberFieldProps as AriaNumberFieldProps,
  ValidationResult
} from 'react-aria-components'
import {
  Description,
  fieldBorderStyles,
  FieldError,
  FieldGroup,
  Input,
  Label
} from './field'
import { ctr } from './primitive'

export interface NumberFieldProps extends AriaNumberFieldProps {
  label?: string
  description?: string
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function NumberField({
  label,
  placeholder,
  description,
  errorMessage,
  ...props
}: NumberFieldProps) {
  return (
    <NumberFieldPrimitive
      {...props}
      className={ctr(props.className, 'group flex flex-col gap-1')}
    >
      <Label>{label}</Label>
      <FieldGroup>
        {(renderProps) => (
          <>
            <Input placeholder={placeholder} />
            <div
              className={fieldBorderStyles({
                ...renderProps,
                className: 'grid h-full flex-col place-content-center border-s'
              })}
            >
              <StepperButton slot="increment">
                <IconChevronUp aria-hidden className="size-4" />
              </StepperButton>
              <div
                className={fieldBorderStyles({
                  ...renderProps,
                  className: 'border-b'
                })}
              />
              <StepperButton slot="decrement">
                <IconChevronDown aria-hidden className="size-4" />
              </StepperButton>
            </div>
          </>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </NumberFieldPrimitive>
  )
}

function StepperButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="h-5 cursor-default px-0.5 text-muted-fg pressed:bg-primary pressed:text-primary-fg group-disabled:opacity-50 forced-colors:group-disabled:text-[GrayText]"
    />
  )
}
