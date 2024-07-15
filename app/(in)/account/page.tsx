import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from 'ui'
import { EditProfile } from '@/app/(in)/account/partials/edit-profile'
import { ChangePassword } from '@/app/(in)/account/partials/change-password'
import { BrowserSessions } from '@/app/(in)/account/partials/browser-sessions'
import { DeleteAccount } from '@/app/(in)/account/partials/delete-account'
import { TwoFactorAuthentication } from '@/app/(in)/account/partials/two-factor-authentication'

export const metadata: Metadata = {
  title: 'Profile'
}

export default function Page() {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="col-span-1">
          <Card className="sticky top-10 z-10">
            <CardHeader>
              <CardTitle>Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 [&_a:hover]:text-fg [&_a:hover]:underline [&_a]:text-sm [&_a]:text-muted-fg">
                <li>
                  <a
                    className="hover:underline lg:text-sm"
                    href="#edit-profile"
                  >
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline lg:text-sm"
                    href="#change-password"
                  >
                    Change Password
                  </a>
                </li>
                <li>
                  <a className="hover:underline lg:text-sm" href="#tfa">
                    Two-Factor Authentication
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline lg:text-sm"
                    href="#browser-sessions"
                  >
                    Browser Sessions
                  </a>
                </li>
                <li>
                  <a
                    className="hover:underline lg:text-sm"
                    href="#delete-account"
                  >
                    Delete Account
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 sm:col-span-2 [&>div]:scroll-mt-[5.5rem]">
          <EditProfile />
          <ChangePassword />
          <TwoFactorAuthentication />
          <BrowserSessions />
          <DeleteAccount />
        </div>
      </div>
    </>
  )
}
