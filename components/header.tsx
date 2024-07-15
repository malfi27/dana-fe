'use client'

import { UserDropdownMenu } from '@/components/user-dropdown-menu'
import { useTheme } from 'next-themes'
import { Button, ButtonPrimitive } from 'ui/button'
import { IconBarsThree2, IconMoonFill, IconSun } from '@irsyadadl/paranoid'
import { Separator } from 'ui/separator'
import { Notification } from '@/components/notification'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { usePathname } from 'next/navigation'
import { title } from '@/lib/utils'
import { SheetContent, SheetOverlay } from 'ui'
import { AsideContent } from '@/components/aside'

export function Header() {
  const { resolvedTheme, theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024)')
  const docTitle = usePathname().split('/')[1]
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {!isDesktop ? (
        <SheetOverlay isOpen={open} onOpenChange={setOpen}>
          <SheetContent side="left" role="dialog">
            <AsideContent />
          </SheetContent>
        </SheetOverlay>
      ) : null}

      <div className="sticky top-0 z-20 -mx-4 mb-6 border-b bg-background sm:-mx-6">
        <nav className="flex items-center justify-between px-4 py-1 sm:px-6 lg:py-3">
          <div className="flex items-center">
            <ButtonPrimitive
              className="h-12 w-9 focus:outline-none lg:hidden"
              onPress={() => setOpen(true)}
            >
              <IconBarsThree2 className="size-5" />
            </ButtonPrimitive>
            <Separator orientation="vertical" className="mr-4 h-6 lg:hidden" />
            <strong className="font-bold">{title(docTitle)}</strong>
          </div>

          <div className="flex items-center gap-x-4">
            <Button
              className="h-8 p-0 text-fg [&>[data-slot=icon]]:text-fg"
              appearance="plain"
              size="square-petite"
              onPress={() =>
                setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
              }
            >
              {resolvedTheme === 'light' ? <IconSun /> : <IconMoonFill />}
            </Button>
            <Notification />
            <Separator orientation="vertical" className="h-6" />
            <UserDropdownMenu />
          </div>
        </nav>
      </div>
    </>
  )
}
