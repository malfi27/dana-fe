'use client'

import { IconCircleInfoFill, IconTriangleInfoFill } from '@irsyadadl/paranoid'
import * as React from 'react'
import { Heading, HeadingProps, Text, TextProps } from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from './primitive'

const noteStyles = tv({
  base: [
    'relative rounded-lg p-4 ring-1 ring-border dark:ring-inset [&_a:hover]:underline [&_a]:font-medium',
    '[&_svg]:absolute [&_svg]:right-4 [&_svg]:top-4 [&_svg]:size-6'
  ],
  variants: {
    intent: {
      primary: [
        'bg-blue-50/50 leading-4 text-blue-900 ring-blue-500/20 [&_a]:text-blue-600 [&_svg]:text-blue-600',
        'dark:bg-blue-500/5 dark:text-blue-200 dark:[&_a]:text-blue-50 dark:[&_svg]:text-blue-400'
      ],
      secondary: [
        'bg-zinc-50/50 leading-4 text-zinc-900 ring-zinc-500/20 [&_a]:text-zinc-600 [&_svg]:text-zinc-500',
        'dark:bg-zinc-500/5 dark:text-zinc-200 dark:[&_a]:text-zinc-50 dark:[&_svg]:text-zinc-50'
      ],
      info: [
        'bg-lime-50/50 leading-4 text-lime-900 ring-lime-500/20 [&_a]:text-lime-600 [&_svg]:text-lime-500',
        'dark:bg-lime-500/5 dark:text-lime-200 dark:[&_a]:text-lime-50 dark:[&_svg]:text-lime-400'
      ],
      warning: [
        'bg-amber-50/50 leading-4 text-amber-900 ring-amber-500/20 [&_a]:text-amber-600 [&_svg]:text-amber-500',
        'dark:bg-amber-500/5 dark:text-amber-200 dark:[&_a]:text-amber-50 dark:[&_svg]:text-amber-400'
      ],
      danger: [
        'bg-red-50/50 leading-4 text-red-900 ring-red-500/20 [&_a]:text-red-600 [&_svg]:text-red-500',
        'dark:bg-red-500/5 dark:text-red-200 dark:[&_a]:text-red-50 dark:[&_svg]:text-red-400'
      ],
      success: [
        'bg-emerald-50/50 leading-4 text-emerald-900 ring-emerald-500/20 [&_a]:text-emerald-600 [&_svg]:text-emerald-600',
        'dark:bg-emerald-500/5 dark:text-emerald-200 dark:[&_a]:text-emerald-50 dark:[&_svg]:text-emerald-400'
      ]
    }
  },
  defaultVariants: {
    intent: 'secondary'
  }
})

interface NoteProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof noteStyles> {}

const Note = ({ intent = 'primary', className, ...props }: NoteProps) => {
  return (
    <div className={noteStyles({ intent, className })} {...props}>
      {['info', 'primary', 'secondary'].includes(intent) ? (
        <IconCircleInfoFill />
      ) : (
        <IconTriangleInfoFill />
      )}
      {props.children}
    </div>
  )
}

const NoteTitle = ({ className, ...props }: HeadingProps) => {
  return (
    <Heading
      className={cn('mb-1 pr-2 font-medium sm:text-base', className)}
      level={3}
      {...props}
    />
  )
}

const NoteDescription = ({ className, ...props }: TextProps) => {
  return (
    <Text
      slot="description"
      {...props}
      className={cn('nd text-sm', className)}
    />
  )
}

export { Note, NoteDescription, NoteTitle }
