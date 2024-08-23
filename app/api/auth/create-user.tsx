import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/auth/signup`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useSignup = () => {
  return useMutation({
    mutationKey: ['Sign Up'],
    mutationFn: fetchApi
  })
}
