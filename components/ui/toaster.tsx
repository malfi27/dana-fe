'use client'
import { Toaster as Sonner } from 'sonner'
import { useTheme } from 'next-themes'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()
  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            '[&>[data-icon]>svg]:size-[1.1rem] [&>[data-icon]>svg]:text-muted-fg rounded-xl group toast group-[.toaster]:bg-background group-[.toaster]:text-fg border group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-fg',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-fg',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-fg'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
