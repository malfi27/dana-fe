import type { Metadata } from 'next'
import { NewNginxTemplate } from '@/app/(in)/nginx-templates/partials/new-nginx-template'
import { ListNginxTemplate } from '@/app/(in)/nginx-templates/partials/list-nginx-template'

export const metadata: Metadata = {
  title: 'Nginx Template'
}
export default function Page() {
  return (
    <>
      <div className="space-y-6">
        <NewNginxTemplate />
        <ListNginxTemplate />
      </div>
    </>
  )
}
