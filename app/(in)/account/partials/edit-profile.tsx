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

export function EditProfile() {
  return (
    <Card id="edit-profile">
      <SectionTitle
        title="Edit Profile"
        description="Edit your profile information"
      />
      <Form onSubmit={() => {}}>
        <CardContent>
          <div className="space-y-6">
            <TextField isRequired label="Name" name="name" />
            <TextField isRequired label="Email" name="email" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Update Profile</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
