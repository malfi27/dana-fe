import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  time_range?: string
}

const apiFetch = (params: TransactionParams) => {
  const { time_range } = params
  const request = axiosApi
    .get(`/payment-statistic`, { params: { time_range } })
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetPaymentStatistic = (params: TransactionParams = {}) =>
  useQuery({
    queryKey: ['Statistic Transaction', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
