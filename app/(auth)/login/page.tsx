import { LoginForm } from '@/app/(auth)/partials/login-form'
import { AuthCard } from '@/components/auth-card'
import { SectionTitle } from 'ui/section-title'

export const metadata = {
  title: 'Login',
  description: 'Enter your username and password to login.'
}

export default function Page() {
  return (
    <>
      <AuthCard>
        <SectionTitle className="mb-6 p-0" {...metadata} />
        <LoginForm />
      </AuthCard>
    </>
  )
}
