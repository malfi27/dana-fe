'use client'

import { Switch } from 'ui/switch'
import { Button } from 'ui/button'
import { Link } from 'ui/link'
import { TextField } from 'ui/text-field'
import { Form } from 'ui/form'

export function LoginForm() {
  return (
    <Form onSubmit={() => {}}>
      <div className="space-y-6">
        <TextField name="Email" label="Email" type="email" isRequired />
        <TextField
          name="Password"
          label="Password"
          type="password"
          isRequired
        />
        <div className="flex items-center justify-between">
          <Switch name="remember">Remember me</Switch>
          <Link intent="secondary" href="/forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-x-6">
        <div className="text-sm text-muted-fg">
          <span>Already have account ?</span>{' '}
          <Link href="/register">Register here.</Link>
        </div>
        <Button type="submit">Login</Button>
      </div>
    </Form>
  )
}
