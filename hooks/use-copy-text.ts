import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { wait } from '@/lib/utils'

export const useCopyText = () => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyText = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Text copied to clipboard')
      setCopySuccess(true)
      wait(2000).then(() => setCopySuccess(false))
    } catch (err) {
      toast.error('Failed to copy text')
      setCopySuccess(false)
    }
  }, [])

  return { copyText, copySuccess }
}
