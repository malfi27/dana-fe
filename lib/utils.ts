import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import titlePrimitive from 'title'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberFormat(number: number, locale = 'id-ID') {
  return new Intl.NumberFormat(locale).format(number)
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function strLimit(str: string, limit: number, suffix = '...') {
  return str.length > limit ? str.substring(0, limit) + suffix : str
}

export function wait(number: number) {
  return new Promise((resolve) => setTimeout(resolve, number))
}

export function title(str: string) {
  return titlePrimitive(str).replace(/\s+/g, '-')
}

interface ApiResponse {
  status: number
  data: any
}
export function waitForApiResponse(
  requestPromise: Promise<ApiResponse>
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    requestPromise
      .then((response) => {
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
