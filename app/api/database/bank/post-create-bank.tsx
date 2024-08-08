import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/database-bank`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCreateBank = () => {
  return useMutation({
    mutationKey: ['Create Bank'],
    mutationFn: fetchApi
  })
}
