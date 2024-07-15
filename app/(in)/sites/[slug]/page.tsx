import { Card, CardContent, CardHeader, CardTitle, Switch } from 'ui'
import { IconBrandGithub } from '@irsyadadl/paranoid'
import { UninstallRepo } from '@/app/(in)/sites/partials/uninstall-repo'
import { UpdateGitRemote } from '@/app/(in)/sites/partials/update-git-remote'

interface ParamsProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ParamsProps) {
  return {
    title: params.slug
  }
}

export default function Page() {
  return (
    <>
      <div className="space-y-6">
        <div className="grid items-start gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Application</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-x-2">
                <IconBrandGithub /> irsyadadl/example.com
              </div>

              <div className="mt-6 space-y-4 text-sm [&_div]:font-semibold [&_label]:text-muted-fg">
                <div>
                  <label>HTTPS</label>
                  <div>Enabled</div>
                </div>
                <div>
                  <label>PHP Version</label>
                  <div>PHP 8.3</div>
                </div>
                <div>
                  <label>Quick Deploy</label>
                  <div>Disabled</div>
                </div>
                <div>
                  <label>Envoyer Integration</label>
                  <div>Disabled</div>
                </div>
                <div>
                  <label>Web Directory</label>
                  <div>/home/provision/example.com/public</div>
                </div>
                <div>
                  <label>Last Deployed</label>
                  <div>Mar 1, 2024, 7:31 PM •f55213</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attributes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-3">
                <Switch defaultSelected>HTTPS</Switch>
                <Switch>Quick Deploy</Switch>
                <Switch defaultSelected intent="danger">
                  Envoyer Integration
                </Switch>
                <Switch defaultSelected intent="warning">
                  Maintenance Mode
                </Switch>
                <Switch>Scheduler</Switch>
                <Switch>Server Side Rendering</Switch>
                <Switch>Realtime Command</Switch>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2">
          <UpdateGitRemote />
          <UninstallRepo />
        </div>
      </div>
    </>
  )
}
