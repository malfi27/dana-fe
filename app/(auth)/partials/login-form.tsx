'use client'

import { useSignin } from '@/app/api/auth/signin'
import { waitForApiResponse } from '@/lib/utils'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from 'ui/button'
import { Link } from 'ui/link'
import { Switch } from 'ui/switch'
import { TextField } from 'ui/text-field'

export function LoginForm() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const { mutateAsync } = useSignin()

  const handleSubmit = async () => {
    toast.promise(
      // Memanggil waitForApiResponse dengan promise dari mutateAsync
      waitForApiResponse(
        mutateAsync(form, {
          onSuccess: (res) => {
            if (res?.status === 200) {
              // Misalkan token disimpan di res.data.token
              Cookies.set('accessToken', res?.data?.accessToken, {
                expires: 1
              }) // Token disimpan selama 7 hari
              window.location.href = '/dashboard'
            }
          }
        })
      ),
      {
        loading: 'Login Process', // Pesan saat loading
        success: (result) => {
          // Mengembalikan pesan sukses untuk ditampilkan oleh toast
          const successMessage = `Welcome back, ${result?.data?.name}!`
          // Menetapkan alert berdasarkan jenis error
          return successMessage
        },
        error: (error) => {
          console.log(error)
          const errorMessage = error?.response?.data?.message
          // Mengembalikan pesan error untuk ditampilkan oleh toast
          return `Failed To Login, ${errorMessage}`
        }
      }
    )
  }
  return (
    <div>
      <div className="space-y-6">
        <TextField
          name="Username"
          label="Username"
          type="username"
          isRequired
          onChange={(e) => {
            setForm({ ...form, username: e })
          }}
        />
        <TextField
          name="Password"
          label="Password"
          type="password"
          onChange={(e) => {
            setForm({ ...form, password: e })
          }}
          isRequired
        />
        <div className="flex items-center justify-between">
          <Switch name="remember">Remember me</Switch>
          <Link intent="secondary" href="/forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-x-6">
        <Button
          intent="light/dark"
          onPress={() => {
            handleSubmit()
          }}
        >
          Login
        </Button>
      </div>
    </div>
  )
}
