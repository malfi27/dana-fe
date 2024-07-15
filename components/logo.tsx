'use client'

import { SVGProps } from 'react'
import { IconServerFill } from '@irsyadadl/paranoid'

interface Props extends SVGProps<SVGSVGElement> {}

const Logo = (props: Props) => (
  <IconServerFill className="size-5 shrink-0 text-muted-fg" {...props} />
)

export { Logo }
