'use server'

export async function forgotPassword(form: FormData) {
  const email = form.get('email') as string

  // run client code
  // toast.promise(wait(2000), {
  //     loading: 'Creating database...',
  //     success: 'Database created.',
  //     error: 'Failed to create database.',
  //     finally: () => redirect('/login')
  // });
}
