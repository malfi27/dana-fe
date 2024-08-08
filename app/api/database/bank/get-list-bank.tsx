import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  page?: number
  limit?: number
  search?: string
}

const apiFetch = (params: TransactionParams) => {
  const { page, limit, search } = params
  const request = axiosApi
    .get(`/database-bank`, { params: { page, limit, search } })
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetListBank = (params: TransactionParams = {}) =>
  useQuery({
    queryKey: ['List Bank', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
