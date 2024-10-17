'use client'

import { axiosWhatsappApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  status?: string
  page?: number
  limit?: number
}

const apiFetch = (params: TransactionParams) => {
  const { status, page, limit } = params
  const request = axiosWhatsappApi
    .get(`/session`, { params: { status, page, limit } })
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
    queryKey: ['List Whatsapp Session', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
