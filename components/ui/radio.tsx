'use client'
import { ReactNode } from 'react'
import {
  Radio as RadioPrimitive,
  RadioGroup as RadioGroupPrimitive,
  RadioGroupProps as RACRadioGroupProps,
  RadioProps,
  ValidationResult
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { ctr } from './primitive'
import { Description, FieldError, Label } from './field'

interface RadioGroupProps extends Omit<RACRadioGroupProps, 'children'> {
  label?: string
  children?: ReactNode
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

function RadioGroup(props: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      {...props}
      className={ctr(props.className, 'group flex flex-col gap-2')}
    >
      <Label>{props.label}</Label>
      <div className="flex gap-2 group-orientation-horizontal:gap-4 group-orientation-vertical:flex-col">
        {props.children}
      </div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </RadioGroupPrimitive>
  )
}

const styles = tv({
  base: 'size-4 rounded-full border bg-secondary transition',
  variants: {
    isSelected: {
      false: 'border-toggle',
      true: 'border-[4.5px] border-primary'
    },
    isFocused: {
      true: [
        'border-primary bg-primary/20 ring-4 ring-primary/20',
        'group-invalid:border-danger/70 group-invalid:bg-danger/20 group-invalid:text-danger-fg group-invalid:ring-danger/20'
      ]
    },
    isInvalid: {
      true: 'border-danger/70 bg-danger/20'
    },
    isDisabled: {
      true: 'opacity-50'
    }
  }
})

function Radio(props: RadioProps) {
  return (
    <RadioPrimitive
      {...props}
      className={ctr(
        props.className,
        'group flex items-center gap-2 text-sm text-fg transition invalid:text-danger disabled:text-fg/50 forced-colors:disabled:text-[GrayText]'
      )}
    >
      {(renderProps) => (
        <>
          <div className={styles(renderProps)} />
          {props.children}
        </>
      )}
    </RadioPrimitive>
  )
}

export { Radio, RadioGroup }
