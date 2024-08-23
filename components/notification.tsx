'use client'

import {
  IconBell,
  IconBellFill,
  IconTriangleInfoFill,
  IconX
} from '@irsyadadl/paranoid'
import React from 'react'
import { cn } from 'ui/primitive'
import { ButtonPrimitive } from 'ui/button'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from 'ui/popover'
import { Collection } from 'react-aria-components'

export function Notification() {
  const [notifications, setNotifications] = React.useState(dataNotifications)

  function kick(id: number) {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    )
  }

  return (
    <Popover>
      <PopoverTrigger className="group relative focus:outline-none">
        <IconBell className="size-4" />
        <div className="absolute -right-2 -top-2 grid size-4 scale-90 place-content-center rounded bg-primary text-[8px] font-semibold text-primary-fg transition-transform group-hover:scale-125">
          5
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 sm:max-w-sm">
        <PopoverHeader className="mb-0 p-4">
          <PopoverTitle>Notifications</PopoverTitle>
        </PopoverHeader>
        <>
          <Collection items={notifications}>
            {(notification) => (
              <div className="relative flex p-4 outline-none [&_svg]:shrink-0">
                <div
                  className={cn(
                    'mr-3 grid size-10 shrink-0 place-content-center rounded-full border bg-background text-fg shadow-sm [&_svg]:size-5',
                    notification.status === 'unread'
                      ? '[&_svg]:text-primary'
                      : '[&_svg]:text-muted-fg'
                  )}
                >
                  {notification.noted ? (
                    <IconTriangleInfoFill />
                  ) : (
                    <IconBellFill />
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <p className="text-xs text-muted-fg">
                    {notification.description}
                  </p>
                </div>

                <ButtonPrimitive
                  onPress={() => kick(notification.id)}
                  className="absolute right-2 top-2 text-muted-fg hover:text-fg"
                >
                  <IconX className="size-4" />
                </ButtonPrimitive>
              </div>
            )}
          </Collection>
        </>
      </PopoverContent>
    </Popover>
  )
}

const dataNotifications = [
  {
    id: 1,
    title: 'Welcome to PG Dana',
    description:
      'We are happy to have you on board. We are looking forward to working with you.',
    status: 'unread',
    noted: true
  }
]
