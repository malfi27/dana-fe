import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const props = {
    username: body.username,
    password: body.password
  }
  const request = axiosApi
    .post(`/auth/signin`, props)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useSignin = () => {
  return useMutation({
    mutationKey: ['Sign'],
    mutationFn: fetchApi
  })
}
