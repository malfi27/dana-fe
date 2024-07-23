import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/server-center/device`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCreateDevice = () => {
  return useMutation({
    mutationKey: ['Create Device'],
    mutationFn: fetchApi
  })
}
