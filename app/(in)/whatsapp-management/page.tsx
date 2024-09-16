import type { Metadata } from 'next'
import { ListWhatsappManagementAccount } from './partials/list-whatsapp'

export const metadata: Metadata = {
  title: 'WhatsApp Management'
}

export default async function Page() {
  return (
    <>
      <ListWhatsappManagementAccount />
    </>
  )
}
