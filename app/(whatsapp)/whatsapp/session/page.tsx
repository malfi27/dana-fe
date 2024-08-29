import { SectionTitle } from 'ui/section-title'
import { WhatsappSessionForm } from '../partials/session-form'

export const metadata = {
  title: 'Whatsapp',
  description: 'Buat sesi baru di Whatsapp, dan dapatkan QR Code untuk login.'
}

export default function Page() {
  return (
    <div className="rounded-xl border border-border bg-muted p-6 shadow-sm drop-shadow-sm">
      <SectionTitle className="mb-6 p-0" {...metadata} />
      <WhatsappSessionForm />
    </div>
  )
}
