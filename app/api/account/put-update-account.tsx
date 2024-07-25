import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .put(`/account/${body?.id}`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useUpdateAccount = () => {
  return useMutation({
    mutationKey: ['Update Account'],
    mutationFn: fetchApi
  })
}
