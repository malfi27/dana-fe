import { SectionTitle } from 'ui/section-title'
import { AuthCard } from '@/components/auth-card'
import { ForgotPasswordForm } from '@/app/(auth)/partials/forgot-password-form'

export const metadata = {
  title: 'Forgot Password',
  description: 'Enter your email to reset your password.'
}

export default function Page() {
  return (
    <AuthCard>
      <SectionTitle className="mb-6 p-0" {...metadata} />
      <ForgotPasswordForm />
    </AuthCard>
  )
}
