import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/payment/update-cs`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCSUpdateAmount = () => {
  return useMutation({
    mutationKey: ['CS Update Amount'],
    mutationFn: fetchApi
  })
}
