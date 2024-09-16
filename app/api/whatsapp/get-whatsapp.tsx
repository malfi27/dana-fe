'use client'

import { axiosWhatsappApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  whatsapp_status?: string
}

const apiFetch = (params: TransactionParams) => {
  const { whatsapp_status } = params
  const request = axiosWhatsappApi
    .get(`/whatsapp`, { params: { whatsapp_status } })
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
