'use client'
import React from 'react'
import {
  Slider as SliderPrimitive,
  SliderOutput,
  SliderProps as AriaSliderProps,
  SliderThumb,
  SliderTrack
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { ctr, focusStyles } from './primitive'
import { Label } from './field'

const trackStyles = tv({
  base: 'rounded-full',
  variants: {
    orientation: {
      horizontal: 'h-1 w-full',
      vertical: 'ml-[50%] h-full w-1 -translate-x-[50%]'
    },
    isDisabled: {
      false: 'bg-muted forced-colors:bg-[ButtonBorder]',
      true: 'bg-secondary forced-colors:bg-[GrayText]'
    }
  }
})

const thumbStyles = tv({
  extend: focusStyles,
  base: 'size-5 rounded-full border-[1.5px] border-red-700 bg-gray-50 group-orientation-horizontal:mt-5 group-orientation-vertical:ml-3 dark:border-gray-300 dark:bg-zinc-900',
  variants: {
    isDragging: {
      true: 'bg-primary dark:border-primary dark:bg-primary/60 forced-colors:bg-[ButtonBorder]'
    },
    isDisabled: {
      true: 'border-input forced-colors:border-[GrayText]'
    }
  }
})

interface SliderProps<T> extends AriaSliderProps<T> {
  label?: string
  thumbLabels?: string[]
}

function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <SliderPrimitive
      {...props}
      className={ctr(
        props.className,
        'grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:grid orientation-horizontal:w-64 orientation-vertical:flex'
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="text-sm font-medium text-gray-500 orientation-vertical:hidden dark:text-zinc-400">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </SliderOutput>
      <SliderTrack className="group col-span-2 flex items-center orientation-horizontal:h-6 orientation-vertical:h-64 orientation-vertical:w-6">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </SliderPrimitive>
  )
}

export { Slider, type SliderProps }
