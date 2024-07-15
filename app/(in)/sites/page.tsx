import { CreateSite } from '@/app/(in)/sites/partials/create-site'
import { ListSites } from '@/app/(in)/sites/partials/list-sites'
import { SectionTitle } from 'ui'

export default function Page() {
  return (
    <>
      <div className="jutify-between flex items-center">
        <SectionTitle
          className="p-0"
          title={'Sites'}
          description="Here you can manage your sites."
        />
        <CreateSite />
      </div>
      <ListSites />
    </>
  )
}
