'use client'

import { TextField } from 'ui/text-field'
import { Link } from 'ui/link'
import { Button } from 'ui/button'
import { Form } from 'ui/form'
import { toast } from 'sonner'
import { wait } from '@/lib/utils'
import { redirect } from 'next/navigation'

export function ForgotPasswordForm() {
  async function handleForgotPassword(form: FormData) {
    toast.promise(wait(2000), {
      loading: 'Sending link to your account...',
      success: 'Email was sent.',
      finally: () => redirect('/login')
    })
  }
  return (
    <Form action={handleForgotPassword}>
      <div className="space-y-6">
        <TextField isRequired name="email" label="Email" type="email" />
        <div className="flex items-center justify-between">
          <Link href="/login">Back to Login</Link>
          <Button type="submit">Send Reset Link</Button>
        </div>
      </div>
    </Form>
  )
}
