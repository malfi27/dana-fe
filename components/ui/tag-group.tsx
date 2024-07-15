'use client'
import {
  Tag as TagPrimitive,
  TagGroup as TagGroupPrimitive,
  TagGroupProps as AriaTagGroupProps,
  TagList,
  TagListProps,
  TagProps as AriaTagProps,
  Text
} from 'react-aria-components'
import { tv } from 'tailwind-variants'
import { badgeStyles } from './badge'
import { Button } from './button'
import { Label } from './field'

const tagGroup = tv({
  slots: {
    root: 'flex flex-col gap-1.5 text-sm',
    list: 'flex flex-wrap gap-1.5',
    tag: [
      badgeStyles.base,
      'cursor-pointer ring-1 ring-inset ring-fg/5 transition-colors',
      'disabled:cursor-default disabled:opacity-50', // disabled
      'hover:bg-secondary hover:text-secondary-fg', // hover
      'selected:bg-primary selected:text-primary-fg selected:hover:bg-primary/80 selected:focus-visible:bg-primary/80', // selected
      'focus:outline-none focus-visible:bg-secondary focus-visible:text-secondary-fg' // focus-visible
    ]
  }
})

const { root, list, tag } = tagGroup()

interface TagGroupProps<T>
  extends Omit<AriaTagGroupProps, 'children'>,
    Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  label?: string
  description?: string
  errorMessage?: string
}

const TagGroup = <T extends object>({
  label,
  className,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) => (
  <TagGroupPrimitive className={root({ className })} {...props}>
    {label && <Label>{label}</Label>}
    <TagList
      className={list()}
      items={items}
      renderEmptyState={renderEmptyState}
    >
      {children}
    </TagList>
    {description && (
      <Text className="text-sm" slot="description">
        {description}
      </Text>
    )}
    {errorMessage && (
      <Text className="text-critical text-sm" slot="errorMessage">
        {errorMessage}
      </Text>
    )}
  </TagGroupPrimitive>
)

const Tag = ({
  children,
  className,
  ...props
}: AriaTagProps & { className?: string }) => {
  let textValue = typeof children === 'string' ? children : undefined
  return (
    <TagPrimitive
      className={tag({ className })}
      textValue={textValue}
      {...props}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && <Button slot="remove">ⓧ</Button>}
        </>
      )}
    </TagPrimitive>
  )
}

export { Tag, TagGroup }
