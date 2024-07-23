'use client'

import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface IAccount {
  page: number
  limit: number
  search: string
  startDate?: string
  endDate?: string
}

const apiFetch = (key: any) => {
  const page = key.queryKey[1]
  const limit = key.queryKey[2]
  const search = key.queryKey[3]
  const startDate = key.queryKey[4]
  const endDate = key.queryKey[5]

  const request = axiosApi
    .get(
      `/gateway?limit=${limit}&page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`
    )
    .then((ressponses) => {
      return ressponses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetListGateway = ({
  page,
  limit,
  search,
  startDate,
  endDate
}: IAccount) =>
  useQuery({
    queryKey: ['List Gateway', page, limit, search, startDate, endDate],
    queryFn: apiFetch,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
