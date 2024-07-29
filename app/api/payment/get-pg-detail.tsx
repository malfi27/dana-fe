import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface TransactionParams {
  merchantId?: string
  merchantReferenceNum?: string
}

const apiFetch = (params: TransactionParams) => {
  const { merchantId, merchantReferenceNum } = params
  const request = axiosApi
    .get(`/payment-pg`, { params: { merchantId, merchantReferenceNum } })
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetPGDetail = (params: TransactionParams = {}) =>
  useQuery({
    enabled: !!params.merchantId && !!params.merchantReferenceNum,
    queryKey: ['PG Detail', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
