'use client'

import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger
} from 'ui/menu'

import { Avatar } from 'ui/avatar'
import {
  IconCirclePerson,
  IconCreditCard,
  IconDeviceDesktop,
  IconLogout,
  IconMoon,
  IconPeople,
  IconSun
} from '@irsyadadl/paranoid'
import { useTheme } from 'next-themes'
import { SubmenuTrigger } from 'react-aria-components'

export function UserDropdownMenu() {
  const { theme, setTheme } = useTheme()
  return (
    <Menu>
      <MenuTrigger className="rounded-full">
        <Avatar
          className="size-8"
          // src="https://github.com/malfi27.png"
          initials="PG"
        />
      </MenuTrigger>
      <MenuContent showArrow className="min-w-56" placement="bottom end">
        <MenuSection>
          <MenuHeader separator>
            <div className="font-medium">PG Dana</div>
            <p className="text-sm font-normal text-muted-fg">
              breaknolimit@gmail.com
            </p>
          </MenuHeader>
          <MenuItem href={'/account'}>
            <IconCirclePerson />
            Profile
          </MenuItem>
          <MenuItem href={'/account/billing'}>
            <IconCreditCard />
            Billing
          </MenuItem>
          <MenuItem href={'/account/team'}>
            <IconPeople />
            Team
          </MenuItem>
        </MenuSection>
        <MenuSection className="hidden lg:block">
          <SubmenuTrigger>
            <MenuItem>
              {theme === 'light' && (
                <>
                  <IconSun />
                  Light
                </>
              )}
              {theme === 'dark' && (
                <>
                  <IconMoon />
                  Dark
                </>
              )}
              {theme === 'system' && (
                <>
                  <IconDeviceDesktop />
                  System
                </>
              )}
            </MenuItem>
            <MenuContent>
              <MenuItem onAction={() => setTheme('light')}>
                <IconSun />
                Light
              </MenuItem>
              <MenuItem onAction={() => setTheme('dark')}>
                <IconMoon />
                Dark
              </MenuItem>
              <MenuItem onAction={() => setTheme('system')}>
                <IconDeviceDesktop />
                System
              </MenuItem>
            </MenuContent>
          </SubmenuTrigger>
        </MenuSection>
        <MenuSeparator />
        <MenuItem href={'/login'}>
          <IconLogout />
          Logout
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
