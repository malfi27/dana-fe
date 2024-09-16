// axios setup
import axios from 'axios'
import Cookies from 'js-cookie'
import { headers } from 'next/headers'

// Mendapatkan token dari cookies
const authToken = Cookies.get('accessToken')

// axios create
export const axiosApi = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${authToken}` // Menyertakan token di header Authorization
  }
})

export const axiosWhatsappApi = axios.create({
  baseURL: process.env.WHATSAPP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-secure-information': process.env.SECURE_INF
  }
})
