import { SectionTitle } from 'ui/section-title'
import { Button } from 'ui/button'
import { IconBrandApple, IconBrandGithub } from '@irsyadadl/paranoid'
import { AuthCard } from '@/components/auth-card'
import { LoginForm } from '@/app/(auth)/partials/login-form'

export const metadata = {
  title: 'Login',
  description: 'Enter your email and password to login.'
}

export default function Page() {
  return (
    <>
      <AuthCard>
        <SectionTitle className="mb-6 p-0" {...metadata} />
        <LoginForm />
      </AuthCard>
      <div className="mb-2 mt-6 text-muted-fg">Or continue with</div>
      <div className="grid grid-cols-2 gap-2 [&_svg]:mr-2">
        <Button intent="secondary">
          <IconBrandGithub /> GitHub
        </Button>
        <Button intent="secondary">
          <IconBrandApple /> Apple
        </Button>
      </div>
    </>
  )
}
