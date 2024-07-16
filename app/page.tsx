'use client'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/whatsapp/session')
  return null
}
