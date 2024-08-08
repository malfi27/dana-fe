import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/gateway`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCreateGateway = () => {
  return useMutation({
    mutationKey: ['Create Task Automation'],
    mutationFn: fetchApi
  })
}
