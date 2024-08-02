import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  search?: string
}

const apiFetch = (params: TransactionParams) => {
  const { search } = params
  const request = axiosApi
    .get(`/account`, { params: { search } })
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetAllAccounts = (params: TransactionParams = {}) =>
  useQuery({
    queryKey: ['Get All Accounts', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
