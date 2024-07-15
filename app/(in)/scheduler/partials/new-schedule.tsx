'use client'

import {
  Button,
  Card,
  CardContent,
  Form,
  SectionTitle,
  Select,
  SelectItem,
  TextField
} from 'ui'
import { toast } from 'sonner'
import title from 'title'

export function NewSchedule() {
  return (
    <Card>
      <SectionTitle
        title={'Create Schedule'}
        description={'Create a new schedule for your server.'}
      />
      <CardContent>
        <FormSchedule
          onPress={() => {
            toast.error('Sorry, this feature is not available yet.')
          }}
          submitLabel="Create Schedule"
        />
      </CardContent>
    </Card>
  )
}

interface Props {
  submitLabel: string
  onPress: () => void
}

export function FormSchedule({ submitLabel, onPress }: Props) {
  const times = [
    'Every Minute',
    'Hourly',
    'Nightly',
    'Weekly',
    'Monthly',
    'On Reboot',
    'Custom'
  ].map((t) => {
    return {
      value: String(t),
      label: title(t)
    }
  })
  return (
    <Form className="max-w-xl space-y-6">
      <TextField
        isRequired
        label="Command"
        type="text"
        placeholder="apt-get autoremove && apt-get autoclean"
      />
      <TextField isRequired label="User" name="user" placeholder="root" />
      <Select isRequired label="Frequency" name="frequency" items={times}>
        {(t) => <SelectItem id={t.value}>{t.label}</SelectItem>}
      </Select>
      <Button onPress={onPress}>{submitLabel}</Button>
    </Form>
  )
}
