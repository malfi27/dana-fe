'use client'

import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface IAccount {
  page: number
  limit: number
  deviceId: string
  search: string
  balanceRange: string
}

const apiFetch = (key: any) => {
  const page = key.queryKey[1]
  const limit = key.queryKey[2]
  const deviceId = key.queryKey[3]
  const search = key.queryKey[4]
  const balanceRange = key.queryKey[5]
  const request = axiosApi
    .get(
      `/account?page=${page}&limit=${limit}&deviceId=${deviceId}&search=${search}&balanceRange=${balanceRange}`
    )
    .then((ressponses) => {
      return ressponses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetAccounts = ({
  page,
  limit,
  deviceId,
  search,
  balanceRange
}: IAccount) =>
  useQuery({
    queryKey: ['List Accounts', page, limit, deviceId, search, balanceRange],
    queryFn: apiFetch,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
