import { SectionTitle } from 'ui/section-title'
import { WhatsappSessionForm } from '../partials/session-form'

export default function Page() {
  return (
    <div className="rounded-xl border border-border bg-muted p-6 shadow-sm drop-shadow-sm">
      <WhatsappSessionForm />
    </div>
  )
}
