// axios setup
import axios from 'axios'
import Cookies from 'js-cookie'

// Mendapatkan token dari cookies
const authToken = Cookies.get('accessToken')

// axios create
export const axiosApi = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${authToken}` // Menyertakan token di header Authorization
  }
})
