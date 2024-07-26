import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/payment/${body.id}`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useConfirmPayment = () => {
  return useMutation({
    mutationKey: ['Confirm Payment'],
    mutationFn: fetchApi
  })
}
