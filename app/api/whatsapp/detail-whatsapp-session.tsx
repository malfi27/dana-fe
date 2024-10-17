'use client'

import { axiosWhatsappApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Props {
  id?: string
}

const apiFetch = (params: Props) => {
  const { id } = params
  const request = axiosWhatsappApi
    .get(`/session/${id}`)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetDetailWhatsappSession = (params: Props = {}) =>
  useQuery({
    enabled: !!params.id,
    queryKey: ['Detail Whatsapp Session', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
