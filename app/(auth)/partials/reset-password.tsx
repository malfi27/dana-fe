'use client'

import { Button } from 'ui/button'
import { TextField } from 'ui/text-field'
import { Link } from 'ui/link'
import { Form } from 'ui/form'
import { toast } from 'sonner'
import { wait } from '@/lib/utils'
import { redirect } from 'next/navigation'

export function ResetPassword() {
  async function resetPasswordHandler(form: FormData) {
    toast.promise(wait(2000), {
      loading: 'Sending link to your account...',
      success: 'Email was sent.',
      finally: () => redirect('/dashboard')
    })
  }

  return (
    <Form action={resetPasswordHandler}>
      <div className="space-y-6">
        <TextField isRequired label="Email" name="email" />
        <TextField isRequired label="New Password" name="password" />
        <TextField
          isRequired
          label="Confirm Password"
          name="confirm_password"
        />
        <div className="flex items-center justify-between gap-x-1">
          <Link href="/login">Cancel</Link>
          <Button type="submit">Reset and Login</Button>
        </div>
      </div>
    </Form>
  )
}
