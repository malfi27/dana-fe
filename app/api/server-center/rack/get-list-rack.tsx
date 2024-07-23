'use client'

import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const apiFetch = () => {
  const request = axiosApi
    .get(`/server-center/rack`)
    .then((ressponses) => {
      return ressponses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetListRacks = () =>
  useQuery({
    queryKey: ['List Racks'],
    queryFn: apiFetch,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
