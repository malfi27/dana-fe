'use client'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Form,
  SectionTitle,
  TextField
} from 'ui'

export function ChangePassword() {
  return (
    <Card id="change-password">
      <SectionTitle
        title="Change Password"
        description="Change your account password"
      />
      <Form onSubmit={() => {}}>
        <CardContent>
          <div className="space-y-6">
            <TextField isRequired label="Old Password" name="old_password" />
            <TextField isRequired label="New password" name="new_password" />
            <TextField
              isRequired
              label="Confirm password"
              name="confirm_password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Update Password</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
