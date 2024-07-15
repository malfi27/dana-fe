'use client'

import { Badge, Button, Card, CardFooter, SectionTitle } from 'ui'
import { toast } from 'sonner'
import { useState } from 'react'
import { wait } from '@/lib/utils'

export function Opcache() {
  const [opcache, setOpcache] = useState(false)
  function enable() {
    toast.promise(wait(1500), {
      loading: 'Enabling opcache...',
      success: 'Opache enabled',
      error: 'Failed to enable opcache',
      finally: () => {
        setOpcache(!opcache)
      }
    })
  }
  return (
    <Card>
      <SectionTitle
        className="max-w-2xl"
        title={
          <>
            OPcache
            <Badge className="ml-2" intent={opcache ? 'success' : 'warning'}>
              {opcache ? 'Enabled' : 'Disabled'}
            </Badge>
          </>
        }
        description=" OPcache improves PHP performance by storing precompiled script bytecode in shared memory, thereby removing the need for PHP to load and parse scripts on each request. "
      />
      <CardFooter>
        <Button intent={opcache ? 'danger' : 'success'} onPress={enable}>
          {opcache ? 'Disabled' : 'Enable'}
        </Button>
      </CardFooter>
    </Card>
  )
}
