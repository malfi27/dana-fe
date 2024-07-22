'use client'

import { IconStorage } from '@irsyadadl/paranoid'
import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {}

const Logo = (props: Props) => (
  <IconStorage className="size-5 shrink-0 text-muted-fg" {...props} />
)

export { Logo }
