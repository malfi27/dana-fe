'use client'

import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const apiFetch = (key: any) => {
  const rackId = key.queryKey[1]
  const request = axiosApi
    .get(`/server-center/box?rackId=${rackId}`)
    .then((ressponses) => {
      return ressponses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetListBox = (rackId: string) =>
  useQuery({
    enabled: !!rackId,
    queryKey: ['List Boxs', rackId],
    queryFn: apiFetch,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
