import { SectionTitle } from 'ui/section-title'
import { WhatsappSessionForm } from '../partials/session-form'

export const metadata = {
  title: 'Whatsapp Session',
  description: 'Scan the QR code to start a Whatsapp session'
}

export default function Page() {
  return (
    <div className="rounded-xl border border-border bg-muted p-6 shadow-sm drop-shadow-sm">
      <SectionTitle className="mb-6 p-0" {...metadata} />
      <WhatsappSessionForm />
    </div>
  )
}
