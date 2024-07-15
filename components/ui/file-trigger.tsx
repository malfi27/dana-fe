'use client'

import { IconCamera, IconFolder, IconPaperclip } from '@irsyadadl/paranoid'
import React from 'react'
import {
  FileTrigger as FileTriggerPrimitive,
  FileTriggerProps as FileTriggerPrimitiveProps
} from 'react-aria-components'
import { Button, buttonStyles } from './button'

interface FileTriggerProps extends FileTriggerPrimitiveProps {
  size?: keyof (typeof buttonStyles)['variants']['size']
  appearance?: keyof (typeof buttonStyles)['variants']['appearance']
  intent?: keyof (typeof buttonStyles)['variants']['intent']
  withIcon?: boolean
}

const FileTrigger: React.FC<FileTriggerProps> = ({
  intent = 'primary',
  appearance = 'outline',
  withIcon = true,
  size = 'medium',
  ...props
}) => {
  return (
    <>
      <FileTriggerPrimitive {...props}>
        <Button intent={intent} appearance={appearance}>
          {withIcon && (
            <>
              {props.defaultCamera ? (
                <IconCamera />
              ) : props.acceptDirectory ? (
                <IconFolder />
              ) : (
                <IconPaperclip className="rotate-45" />
              )}
            </>
          )}
          {props.children ? (
            props.children
          ) : (
            <>
              {props.allowsMultiple
                ? 'Browse a files'
                : props.acceptDirectory
                  ? 'Browse'
                  : 'Browse a file'}
              ...
            </>
          )}
        </Button>
      </FileTriggerPrimitive>
    </>
  )
}

export { FileTrigger }
