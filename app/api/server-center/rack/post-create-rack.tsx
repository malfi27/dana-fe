import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/server-center/rack`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCreateRack = () => {
  return useMutation({
    mutationKey: ['Create Rack'],
    mutationFn: fetchApi
  })
}
