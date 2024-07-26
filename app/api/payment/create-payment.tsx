import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/payment`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCreatePayment = () => {
  return useMutation({
    mutationKey: ['Create Payment'],
    mutationFn: fetchApi
  })
}
