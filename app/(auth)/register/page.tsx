import { SectionTitle } from 'ui/section-title'
import { AuthCard } from '@/components/auth-card'
import { RegisterForm } from '@/app/(auth)/partials/register-form'

export const metadata = {
  title: 'Register',
  description: 'Create a new account to access the application.'
}

export default function Page() {
  return (
    <AuthCard>
      <SectionTitle className="mb-6 p-0" {...metadata} />
      <RegisterForm />
    </AuthCard>
  )
}
