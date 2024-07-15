import { CreateKey } from '@/app/(in)/ssh-keys/partials/create-key'
import { ListKeys } from '@/app/(in)/ssh-keys/partials/list-keys'

export const metadata = {
  title: 'SSH Keys'
}

export default function Page() {
  return (
    <div className="space-y-6">
      <CreateKey />
      <ListKeys />
    </div>
  )
}
