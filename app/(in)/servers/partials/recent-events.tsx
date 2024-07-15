'use client'

import React from 'react'
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  ModalTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from 'ui'
import { IconCircleCheckFill, IconCircleXFill } from '@irsyadadl/paranoid'

interface DeploymentStep {
  command: string
  description?: string
}

interface RecentEvent {
  serverName: string
  description: string
  status?: 'success' | 'failed'
  timestamp: string
}

export function RecentEvents() {
  const terminalOutput = deploymentSteps
    .map(
      (step) =>
        `${step.description ? `# ${step.description}\n` : ''}${step.command}\n\n`
    )
    .join('\n')
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
        <CardDescription>
          View the recent events on your servers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table aria-label="Recent Events">
          <TableHeader>
            <TableRow>
              <TableColumn>Name</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>When</TableColumn>
              <TableColumn />
            </TableRow>
          </TableHeader>
          <TableBody items={recentEventsData}>
            {(event) => (
              <TableRow id={event.serverName}>
                <TableCell className="font-medium">
                  {event.serverName}
                </TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  <Badge
                    intent={event.status === 'success' ? 'success' : 'danger'}
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell>{event.timestamp}</TableCell>
                <TableCell>
                  <Modal>
                    <ModalTrigger className="hover:underline">
                      View
                    </ModalTrigger>
                    <ModalOverlay>
                      <ModalContent size="2xl">
                        <ModalHeader>
                          <ModalTitle className="flex items-center [&_svg]:mr-2 [&_svg]:size-4">
                            {event.status === 'success' ? (
                              <IconCircleCheckFill className="text-emerald-500" />
                            ) : (
                              <IconCircleXFill className="text-danger" />
                            )}
                            {event.serverName}
                          </ModalTitle>
                          <ModalDescription>
                            {event.description}
                          </ModalDescription>
                        </ModalHeader>

                        <pre className="max-h-96 overflow-y-auto break-words rounded-md border bg-zinc-900 p-6 font-mono text-xs text-zinc-300 [&_code]:whitespace-pre-wrap">
                          <code>{terminalOutput}</code>
                        </pre>
                      </ModalContent>
                    </ModalOverlay>
                  </Modal>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const recentEventsData: RecentEvent[] = [
  {
    serverName: 'cloudy',
    description: 'Updated SSL Certificates (secure.example.com)',
    status: 'success',
    timestamp: 'Mar 5, 2024, 10:30 AM'
  },
  {
    serverName: 'sunny',
    description: 'Database Migration Completed (db.example.com)',
    status: 'success',
    timestamp: 'Mar 4, 2024, 6:20 PM'
  },
  {
    serverName: 'stormy',
    description: 'Restored Backup (archive.example.com)',
    status: 'failed',
    timestamp: 'Mar 4, 2024, 2:45 PM'
  },
  {
    serverName: 'windy',
    description: 'Rolled Out New Features (app.example.com)',
    status: 'failed',
    timestamp: 'Mar 3, 2024, 8:00 AM'
  },
  {
    serverName: 'frosty',
    description: 'Performed System Updates (update.example.com)',
    status: 'failed',
    timestamp: 'Mar 2, 2024, 11:15 PM'
  },
  {
    serverName: 'misty',
    description: 'Resolved Security Alert (security.example.com)',
    status: 'success',
    timestamp: 'Mar 2, 2024, 5:42 AM'
  },
  {
    serverName: 'thunder',
    description: 'Increased Storage Capacity (storage.example.com)',
    status: 'failed',
    timestamp: 'Mar 1, 2024, 9:30 PM'
  }
]

const deploymentSteps: DeploymentStep[] = [
  {
    command: 'git pull origin master',
    description: 'Pulling latest changes from master branch'
  },
  { command: 'bun install', description: 'Installing dependencies' },
  { command: 'bun build', description: 'Building the application' },
  {
    command: 'pm2 restart all',
    description: 'Restarting the application with PM2'
  },
  { command: 'docker-compose down', description: 'Stopping Docker containers' },
  {
    command: 'docker-compose up -d',
    description: 'Starting Docker containers in detached mode'
  },
  { command: 'nginx -s reload', description: 'Reloading NGINX configuration' },
  {
    command: 'certbot renew',
    description: 'Renewing SSL certificates with Certbot'
  },
  { command: 'bun test', description: 'Running application tests' },
  {
    command: 'git checkout develop',
    description: 'Switching to develop branch'
  },
  {
    command: 'git merge master',
    description: 'Merging master into develop branch'
  },
  {
    command: 'node scripts/deploy.js',
    description: 'Executing custom deployment script'
  },
  {
    command: 'mysql -u root -p database < backup.sql',
    description: 'Restoring database from backup'
  },
  {
    command: 'rsync -avz build/ /var/www/html/',
    description: 'Syncing build directory to web root'
  },
  { command: 'bun run migrate', description: 'Running database migrations' },
  { command: 'redis-cli flushall', description: 'Flushing Redis cache' },
  {
    command: 'bun run seed',
    description: 'Seeding the database with initial data'
  },
  { command: 'iptables -F', description: 'Flushing all iptables rules' },
  { command: 'From github.com:dax32dfa/wkek123.ie.co', description: '...' },
  { command: '* branch main-> FETCH_HEAD', description: '...' },
  { command: 'c77598b..fe51368  main-> origin/main', description: '...' },
  { command: 'Updating c77598b..fe51368', description: '...' },
  { command: 'Fast-forward', description: '...' },
  { command: 'app/{favicon.png => icon.png} | Bin', description: '...' },
  {
    command: '1 file changed, 0 insertions(+), 0 deletions(-)',
    description: '...'
  },
  {
    command: 'rename app/{favicon.png => icon.png} (100%)',
    description: '...'
  },
  { command: 'No local changes to save', description: '...' },
  { command: 'bun install v1.0.29 (a146856d)', description: '...' },
  {
    command: 'systemctl restart postgresql',
    description: 'Restarting PostgreSQL service'
  },
  {
    command:
      "crontab -l > mycron; echo '0 4 * * * /path/to/script' >> mycron; crontab mycron; rm mycron",
    description: 'Scheduling a cron job'
  }
]
