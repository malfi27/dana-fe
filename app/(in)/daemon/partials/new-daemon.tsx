'use client'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ComboBox,
  ComboBoxItem,
  NumberField,
  Select,
  SelectItem,
  TextField
} from 'ui'
import * as React from 'react'

export function NewDaemon() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Daemon</CardTitle>
        <CardDescription>Create a new daemon for your server.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Command"
              isRequired
              type="text"
              className="font-mono"
              placeholder="apt-get autoremove && apt-get autoclean"
            />
            <TextField
              label="Directory"
              placeholder="/home/irsyad.co"
              isRequired
              type="text"
            />
            <Select label="Select a user" isRequired>
              <SelectItem textValue="root">Root</SelectItem>
              <SelectItem textValue="stealer">Stealer</SelectItem>
            </Select>
            <NumberField
              placeholder="4"
              label="Number of Processes"
              isRequired
            />
            <NumberField placeholder="6" label="Start Seconds" isRequired />
            <NumberField placeholder="7" label="Stop Seconds" isRequired />
            <ComboBox
              label="Stop Signals"
              isRequired
              items={signals.map((signal, index) => ({
                id: signal,
                name: signal
              }))}
            >
              {(item) => (
                <ComboBoxItem id={item.id} textValue={item.name}>
                  {item.name}
                </ComboBoxItem>
              )}
            </ComboBox>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  )
}

const signals = [
  'SIGHUP',
  'SIGINT',
  'SIGQUIT',
  'SIGILL',
  'SIGTRAP',
  'SIGABRT',
  'SIGIOT',
  'SIGBUS',
  'SIGEMT',
  'SIGFPE',
  'SIGKILL',
  'SIGUSR1',
  'SIGSEGV',
  'SIGUSR2',
  'SIGTERM',
  'SIGSTKFLT',
  'SIGCHLD',
  'SIGCLD',
  'SIGCONT',
  'SIGSTOP',
  'SIGTSTP',
  'SIGTTIN',
  'SIGTTOU',
  'SIGURG',
  'SIGXCPU',
  'SIGXFSZ',
  'SIGVTALRM',
  'SIGPROF',
  'SIGWINCH',
  'SIGIO',
  'SIGPOLL',
  'SIGPWR',
  'SIGINFO',
  'SIGLOST',
  'SIGSYS',
  'SIGPIPE',
  'SIGALRM'
]
