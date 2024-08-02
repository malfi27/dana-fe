import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  page?: number
  limit?: number
  search?: string
  period?: string
}

const apiFetch = (params: TransactionParams) => {
  const { page, limit, search, period } = params
  const request = axiosApi
    .get(`/group`, { params: { page, limit, search, period } })
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetListGroup = (params: TransactionParams = {}) =>
  useQuery({
    queryKey: ['List Group', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
