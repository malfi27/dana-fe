'use client'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  Menu,
  MenuContent,
  MenuItem,
  MenuKeyboard,
  MenuSeparator,
  MenuTrigger,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  SectionTitle,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import { toast } from 'sonner'
import React, { useState } from 'react'
import { IconDotsVertical } from '@irsyadadl/paranoid'
import { title, wait } from '@/lib/utils'

export function Versions() {
  const [versions, setVersions] = useState(versionsData)
  const [loading, setLoading] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [name, setName] = useState('')
  const [modalAction, setModalAction] = useState('')

  function getPatch(value: string) {
    setLoading(true)
    setName(value)
    let _duration = 2000

    toast.promise(
      wait(_duration).then(() => {
        setLoading(false)
        setVersions(
          versions.map((version) => {
            if (version.name === value) {
              version.patch = 'nope'
            }
            return version
          })
        )
      }),
      {
        loading: `Getting patch for ${value}...`,
        success: `${value} patched`,
        error: `Failed to get patch for ${value}`
      }
    )
  }

  function install(value: string) {
    setInstalling(true)
    setName(value)
    let _duration = 2000
    toast.promise(wait(_duration), {
      loading: `Installing ${value}...`,
      success: `${value} installed`,
      error: `Failed to install ${value}`,
      finally: () => {
        setInstalling(false)
        setVersions(
          versions.map((version) => {
            if (version.name === value) {
              version.status = 'installed'
            }
            return version
          })
        )
      }
    })
  }

  function uninstall(name: string) {
    toast.promise(wait(1500), {
      loading: 'Uninstalling...',
      success: 'Uninstalled',
      error: 'Failed to uninstall',
      finally: () => {
        setVersions(
          versions.map((version) => {
            if (version.name === name) {
              version.status = 'not_installed'
            }
            return version
          })
        )
        closeModal()
      }
    })
  }

  function closeModal() {
    setModalAction('')
  }

  return (
    <>
      <Card>
        <SectionTitle
          title="PHP Versions"
          description="Manage your PHP versions"
        />
        <CardContent>
          <Table aria-label="PHP Versions">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Default CLI</TableColumn>
              <TableColumn>Patch</TableColumn>
              <TableColumn />
            </TableHeader>
            <TableBody items={versions}>
              {(version) => (
                <TableRow id={version.name}>
                  <TableCell>{version.name}</TableCell>
                  <TableCell>
                    {version.status === 'installed' ? (
                      <Badge intent="success">
                        {version.status === 'installed' ? 'Installed' : '-'}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{version.default_cli}</TableCell>
                  <TableCell>
                    {version.patch === 'available' ? (
                      <Button
                        size="extra-small"
                        className="h-7 px-2"
                        isDisabled={loading && name === version.name}
                        onPress={() => getPatch(version.name)}
                      >
                        Patch
                      </Button>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      {version.status === 'not_installed' ? (
                        <Button
                          size="extra-small"
                          intent="primary"
                          isDisabled={installing}
                          className="h-7 px-2"
                          onPress={() => install(version.name)}
                        >
                          Install
                        </Button>
                      ) : (
                        <Menu>
                          <MenuTrigger className="group focus:outline-none focus:ring-offset-0">
                            <IconDotsVertical className="size-4 text-muted-fg group-data-[state=open]:text-fg hover:text-fg" />
                          </MenuTrigger>
                          <MenuContent className="w-56" placement="bottom left">
                            <MenuItem>
                              Restart
                              <MenuKeyboard keys="^R" />
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem href="#go-fpm-conf">
                              Edit FPM Config
                            </MenuItem>
                            <MenuItem href="#cli">Edit CLI Config</MenuItem>
                            <MenuItem href="#pool">Edit Pool Config</MenuItem>
                            <MenuSeparator />
                            <MenuItem
                              isDanger
                              onAction={() => {
                                setName(version.name)
                                setModalAction('uninstall')
                              }}
                              isDisabled={loading}
                            >
                              Uninstall
                            </MenuItem>
                          </MenuContent>
                        </Menu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ModalOverlay
        isOpen={modalAction === 'uninstall'}
        onOpenChange={closeModal}
      >
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              Are you sure you want to {modalAction} {name}?
            </ModalTitle>
            <CardDescription>
              This will remove the PHP version from the server. Are you sure?
            </CardDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose>Cancel</ModalClose>
            <Button
              intent="danger"
              isDisabled={loading}
              onPress={() => uninstall(name)}
            >
              {title(modalAction)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </>
  )
}

type VersionsProps = {
  name: string
  status: string
  default_cli: boolean
  patch: string
}

const versionsData: VersionsProps[] = [
  {
    name: 'PHP 8.3',
    status: 'not_installed',
    default_cli: false,
    patch: 'nope'
  },
  {
    name: 'PHP 8.2',
    status: 'installed',
    default_cli: true,
    patch: 'available'
  },
  {
    name: 'PHP 8.1',
    status: 'not_installed',
    default_cli: false,
    patch: 'nope'
  },
  {
    name: 'PHP 8.0',
    status: 'not_installed',
    default_cli: false,
    patch: 'nope'
  },
  {
    name: 'PHP 7.4',
    status: 'installed',
    default_cli: false,
    patch: 'available'
  },
  {
    name: 'PHP 7.3',
    status: 'not_installed',
    default_cli: false,
    patch: 'nope'
  },
  {
    name: 'php7.3',
    status: 'not_installed',
    default_cli: false,
    patch: 'nope'
  },
  {
    name: 'PHP 7.2',
    status: 'installed',
    default_cli: false,
    patch: 'nope'
  },
  {
    name: 'PHP 7.1',
    status: 'installed',
    default_cli: false,
    patch: 'available'
  },
  {
    name: 'PHP 7.0',
    status: 'not_installed',
    default_cli: false,
    patch: 'nope'
  }
]
