'use client'

import {
  Button,
  buttonStyles,
  cn,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Select,
  SelectItem
} from 'ui'
import {
  IconBack,
  IconDotsVertical,
  IconDownload,
  IconNext,
  IconRotateRight,
  IconX
} from '@irsyadadl/paranoid'

export function Attr() {
  return (
    <div className="flex items-center justify-end gap-2 px-6 [&_svg]:size-4 [&_svg]:shrink-0">
      <div className="hidden items-center gap-x-1 sm:flex">
        <Button size="square-petite" appearance="outline">
          <IconBack />
        </Button>
        <Button size="square-petite" appearance="outline">
          <IconNext />
        </Button>
        <Button size="square-petite" appearance="outline">
          <IconDownload />
        </Button>
        <Button size="square-petite" appearance="outline">
          <IconRotateRight />
        </Button>
        <Button size="square-petite" appearance="outline">
          <IconX />
        </Button>
      </div>
      <Select placeholder="View Log">
        <SelectItem id="nginx-e">Nginx Error</SelectItem>
        <SelectItem id="nginx-a">Nginx Access</SelectItem>
        <SelectItem id="redis">Redis</SelectItem>
        <SelectItem id="ssh-auth">SSH Auth</SelectItem>
        <SelectItem id="php-8.2">PHP 8.2</SelectItem>
        <SelectItem id="php-8.3">PHP 8.3</SelectItem>
      </Select>
      <Menu>
        <MenuTrigger
          className={cn(
            buttonStyles({
              appearance: 'outline'
            }),
            'w-8 sm:hidden'
          )}
        >
          <IconDotsVertical className="size-5 text-muted-fg" />
        </MenuTrigger>
        <MenuContent
          placement="bottom end"
          className="min-w-56 [&_svg]:text-muted-fg"
        >
          <MenuItem>
            <IconBack />
            <span>Previous</span>
          </MenuItem>
          <MenuItem>
            <IconNext />
            <span>Next</span>
          </MenuItem>
          <MenuItem>
            <IconDownload />
            <span>Download</span>
          </MenuItem>
          <MenuItem>
            <IconRotateRight />
            <span>Refresh</span>
          </MenuItem>
          <MenuItem>
            <IconX />
            <span>Clear</span>
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  )
}
