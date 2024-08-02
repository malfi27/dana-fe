import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/group-account`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useAddAccountToGroup = () => {
  return useMutation({
    mutationKey: ['Add Account To Group'],
    mutationFn: fetchApi
  })
}
