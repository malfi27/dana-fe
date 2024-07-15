'use client'

import React from 'react'
import {
  composeRenderProps,
  Link as LinkPrimitive,
  LinkProps as LinkPrimitiveProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

interface LinkProps extends LinkPrimitiveProps {
  intent?: 'primary' | 'secondary'
}

const styles = tv({
  base: 'rounded transition focus:outline-none disabled:cursor-default disabled:no-underline lg:text-sm forced-colors:disabled:text-[GrayText]',
  variants: {
    intent: {
      unstyled: 'text-fg',
      primary:
        'text-primary hover:text-primary-400 dark:text-primary-400 dark:hover:text-primary-300',
      secondary:
        'text-gray-700 underline decoration-gray-700/50 hover:decoration-gray-700 dark:text-zinc-400 dark:decoration-zinc-300/70 dark:hover:decoration-zinc-300'
    }
  },
  defaultVariants: {
    intent: 'unstyled'
  }
})

function Link(props: LinkProps) {
  return (
    <LinkPrimitive
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({
          ...renderProps,
          className,
          intent: props.href ? props.intent : 'secondary'
        })
      )}
    />
  )
}

export { Link, LinkPrimitive, type LinkProps, type LinkPrimitiveProps }
