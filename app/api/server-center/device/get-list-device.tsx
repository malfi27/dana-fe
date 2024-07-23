'use client'

import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const apiFetch = (key: any) => {
  const boxId = key.queryKey[1]
  const request = axiosApi
    .get(`/server-center/device?boxId=${boxId}`)
    .then((ressponses) => {
      return ressponses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetListDevice = (boxId: string) =>
  useQuery({
    queryKey: ['List Devices', boxId],
    queryFn: apiFetch,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
