import type { Metadata } from 'next'
import { AutomationPage } from '../partials/automation-page'

export const metadata: Metadata = {
  title: 'Automation'
}

export default async function Page() {
  return (
    <>
      <AutomationPage />
    </>
  )
}
