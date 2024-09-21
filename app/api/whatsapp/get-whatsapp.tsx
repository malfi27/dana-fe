'use client'

import { axiosWhatsappApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  whatsapp_status?: string
  page?: number
  limit?: number
}

const apiFetch = (params: TransactionParams) => {
  const { whatsapp_status, page, limit } = params
  const request = axiosWhatsappApi
    .get(`/whatsapp`, { params: { whatsapp_status, page, limit } })
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetListWhatsappAccount = (params: TransactionParams = {}) =>
  useQuery({
    queryKey: ['List Whatsapp Account', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
