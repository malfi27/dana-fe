import { SectionTitle } from 'ui/section-title'
import { AuthCard } from '@/components/auth-card'
import { ResetPassword } from '@/app/(auth)/partials/reset-password'

export const metadata = {
  title: 'Reset Password',
  description: 'Reset your password and login'
}

export default function Page() {
  return (
    <AuthCard>
      <SectionTitle className="mb-6 p-0" {...metadata} />
      <ResetPassword />
    </AuthCard>
  )
}
