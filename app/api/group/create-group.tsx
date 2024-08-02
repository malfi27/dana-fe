import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/group`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCreateGroup = () => {
  return useMutation({
    mutationKey: ['Create Group'],
    mutationFn: fetchApi
  })
}
