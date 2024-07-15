'use client'

import { Link } from 'ui/link'
import { Button } from 'ui/button'
import { Form } from 'ui/form'
import { TextField } from 'ui/text-field'

export function RegisterForm() {
  return (
    <Form onSubmit={() => {}} className="space-y-4">
      <TextField isRequired label="Name" placeholder="Enter your name" />
      <TextField isRequired label="Email" placeholder="Enter your email" />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          isRequired
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <TextField
          isRequired
          label="Confirm Password"
          placeholder="Enter your password again"
          type="password"
        />
      </div>
      <div className="mt-6 flex items-center justify-between gap-x-6 sm:justify-end">
        <div className="text-sm text-muted-fg">
          Already have an account? <Link href="/login">Login here.</Link>
        </div>
        <Button type="submit">Register</Button>
      </div>
    </Form>
  )
}
