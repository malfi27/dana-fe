'use client'
import { IconCheck, IconDuplicate } from '@irsyadadl/paranoid'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { ButtonPrimitive } from 'ui/button'

const snippetVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

const Snippet: React.FC<Props> = ({ className, text, ...props }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Reset the copied state after 2 seconds
      } catch (error) {
        toast.error('Failed to copy to clipboard')
      }
    } else {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div
      {...props}
      className={twMerge(
        'relative flex items-center justify-between overflow-x-auto whitespace-nowrap rounded-lg border bg-tertiary py-2.5 pl-3 pr-2.5 font-mono text-sm [&>svg:hover]:text-fg [&>svg]:text-muted-fg [&>svg]:transition [&_svg]:shrink-0',
        className
      )}
    >
      <span className="mr-6">{text}</span>
      <ButtonPrimitive
        className="focus:outline-none [&_svg]:size-4 [&_svg]:text-muted-fg"
        aria-label="Copy code snippet"
        onPress={handleCopy}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="checkmark"
              variants={snippetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <IconCheck />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              variants={snippetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <IconDuplicate />
            </motion.span>
          )}
        </AnimatePresence>
      </ButtonPrimitive>
    </div>
  )
}

export { Snippet, snippetVariants }
