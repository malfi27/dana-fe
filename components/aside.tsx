'use client'

import { Logo } from '@/components/logo'
import {
  IconDatabase,
  IconDeviceDesktop,
  IconHome,
  IconMoon,
  IconSearch,
  IconStorage,
  IconSun,
  IconSwitchHorizontal,
  IconToolbox,
  IconWallet
} from '@irsyadadl/paranoid'
import { useTheme } from 'next-themes'
import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { FC, SVGProps, useEffect, useState } from 'react'
import {
  Badge,
  ButtonPrimitive,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandKeyboard,
  CommandList,
  CommandModal,
  CommandSection
} from 'ui'
import { AccordionMenu, AccordionMenuItem } from 'ui/accordion-menu'
import { cn } from 'ui/primitive'

export const navigations = [
  { label: 'Dashboard', href: '/dashboard', icon: IconHome, badge: false },
  {
    label: 'Hardware',
    href: '/hardware',
    icon: IconStorage,
    badge: false
  },
  {
    label: 'Transaction',
    href: '/transaction',
    icon: IconWallet,
    badge: false
  },

  {
    id: 'tools',
    label: 'Tools',
    icon: IconToolbox,
    isExpanded: true,
    children: [
      { label: 'History', href: '/tools/history', badge: false },
      { label: 'Automation', href: '/tools/automation', badge: false }
    ]
  }
]

function CommandTrigger(props: { onPress: () => void }) {
  return (
    <ButtonPrimitive
      onPress={props.onPress}
      className="relative flex h-10 w-full items-center rounded-md border bg-background text-muted-fg shadow-sm focus:outline-none"
    >
      <span className="border-r px-3">
        <IconSearch className="size-5 shrink-0" />
      </span>

      <span className="ml-4">Search...</span>

      <span className="absolute right-4 text-sm">
        <kbd>⌘</kbd> <kbd>K</kbd>
      </span>
    </ButtonPrimitive>
  )
}

export function Aside() {
  return (
    <aside className="bg-aside hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <AsideContent />
    </aside>
  )
}

interface AsideLinkProps extends LinkProps {
  icon?: FC<SVGProps<SVGSVGElement>>
  children?: React.ReactNode
  badge?: React.ReactNode
  className?: string
}

export function AsideLink({
  className,
  icon: Icon,
  href,
  children,
  badge,
  ...props
}: AsideLinkProps) {
  const pathname = usePathname()
  return (
    <li>
      <Link
        {...props}
        href={href}
        className={cn(
          'group flex items-center justify-between rounded-md px-2.5 py-[0.390rem] text-sm leading-6 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          pathname === href
            ? 'bg-muted/70 text-fg hover:bg-muted/50'
            : 'border-transparent',
          className
        )}
      >
        <span className="flex items-center gap-x-3">
          {Icon ? (
            <Icon className="size-[1.115rem] shrink-0" />
          ) : (
            <span
              className={cn(
                'ml-[1.60rem] size-2.5 rounded-full border border-fg/10 bg-secondary',
                pathname === href ? 'bg-fg' : 'bg-secondary'
              )}
            />
          )}
          {children}
        </span>

        {badge && (
          <span
            className={cn(
              'grid size-5 place-content-center rounded bg-background text-[0.70rem] font-semibold shadow-sm ring-1 transition dark:shadow-none',
              pathname === href
                ? 'bg-fg/20 text-fg shadow-none ring-fg/30'
                : 'text-muted-fg ring-fg/20'
            )}
          >
            {badge}
          </span>
        )}
      </Link>
    </li>
  )
}

export function AsideContent() {
  const [commandOpen, setCommandOpen] = useState(false)
  return (
    <>
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
      <div className="border-b bg-background px-6 pb-6 shadow-sm focus-visible:outline-none xl:mb-6">
        <Link
          href="/dashboard"
          className="flex h-16 shrink-0 items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Logo className="mr-2 size-5 shrink-0 text-fg" />
          <span className="font-mono text-sm font-semibold tracking-tighter">
            PG Dana
          </span>
        </Link>
        <CommandTrigger onPress={() => setCommandOpen(!commandOpen)} />
      </div>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto xl:px-6">
        <nav className="flex flex-1 flex-col p-4 xl:px-0 xl:py-1">
          <ul role="list" className="flex flex-1 flex-col gap-y-1">
            {navigations.map((nav, i) => {
              if (nav.children) {
                return (
                  <li key={i}>
                    <AccordionMenu
                      isExpanded={nav.isExpanded}
                      icon={nav.icon}
                      trigger={nav.label}
                    >
                      {nav.children.map((child, i) => (
                        <AccordionMenuItem
                          badge={child.badge}
                          href={child.href ?? '#'}
                          key={i}
                        >
                          {child.label}
                        </AccordionMenuItem>
                      ))}
                    </AccordionMenu>
                  </li>
                )
              } else {
                return (
                  <AsideLink
                    icon={nav.icon}
                    href={nav.href ?? '#'}
                    key={i}
                    badge={nav.badge}
                  >
                    {nav.label}
                  </AsideLink>
                )
              }
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}

const themes = [
  {
    name: 'dark',
    label: 'Dark',
    icon: IconMoon
  },
  {
    name: 'light',
    label: 'Light',
    icon: IconSun
  },
  {
    name: 'system',
    label: 'Sistem',
    icon: IconDeviceDesktop
  }
]

export function CommandPalette({
  open,
  setOpen
}: {
  open: any
  setOpen: (open: any) => void
}) {
  const { theme, setTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<string | null | undefined>(null)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isEditable =
        activeElement &&
        (activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement.getAttribute('contenteditable') === 'true')

      const isShortcutActive = open && !filterType && !isEditable

      if (e.key === 'k' && (e.metaKey || e.ctrlKey) && !isEditable) {
        e.preventDefault()
        setOpen((open: any) => !open)
      } else if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey) && open) {
        e.preventDefault()
        setFilterType(null)
        setQuery('')
      } else if (isShortcutActive) {
        if (e.key === 't') {
          e.preventDefault()
          setFilterType('theme')
        }
      }
    }

    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [filterType, setOpen, open])

  function toggleTheme(theme: any) {
    setTheme(theme.name)
    setFilterType(null)
    setOpen(false)
    setQuery('')
  }

  function changeFilterType(value: string | null | undefined) {
    setFilterType(value)
    setQuery('')
  }

  function go(s: string) {
    router.push(s)

    setOpen(false)
  }

  return (
    <CommandModal isOpen={open} onOpenChange={setOpen}>
      <CommandInput
        autoFocus
        value={query}
        onValueChange={setQuery}
        placeholder={`Search anything...`}
      />
      {query !== '' && (
        <CommandEmpty>
          Pencarian untuk <q className="font-medium">{query}</q> tidak
          ditemukan.
        </CommandEmpty>
      )}
      <CommandList>
        {!filterType && (
          <CommandSection heading="">
            <>
              {navigations
                .filter((nav) => !nav.children)
                .map((nav) => (
                  <CommandItem
                    key={nav.label}
                    value={nav.label}
                    onSelect={() => go(nav.href ? nav.href : '#')}
                  >
                    <nav.icon />
                    {nav.label}
                  </CommandItem>
                ))}

              <CommandItem
                className="justify-between"
                value="switch theme | theme"
                onSelect={() => changeFilterType('theme')}
              >
                <span className="flex items-center">
                  <IconSwitchHorizontal />
                  Switch Theme
                </span>
                <CommandKeyboard>T</CommandKeyboard>
              </CommandItem>
            </>
          </CommandSection>
        )}

        {['theme', 'switch', 'light', 'dark'].some((term) =>
          query.includes(term)
        ) ? (
          <>
            {themes.map((t: any) => (
              <CommandItem
                key={t.name}
                value={`Switch theme to ${t.name}`}
                onSelect={() => toggleTheme(t)}
                className="justify-between"
              >
                <div className="flex items-center">
                  <t.icon />
                  <span className="line-clamp-1">
                    Switch theme to {t.label}
                  </span>
                </div>
              </CommandItem>
            ))}
          </>
        ) : null}

        {filterType === 'theme' && (
          <CommandSection heading="Switch theme">
            {themes.map((t: any) => (
              <CommandItem
                className="group justify-between"
                key={t.name}
                value={t.name}
                onSelect={() => toggleTheme(t)}
              >
                <div className="flex items-center">
                  <t.icon />
                  <span className="line-clamp-1">{t.label}</span>
                </div>

                {t.name === theme && <Badge intent="secondary">Current</Badge>}
              </CommandItem>
            ))}
          </CommandSection>
        )}
      </CommandList>
    </CommandModal>
  )
}
