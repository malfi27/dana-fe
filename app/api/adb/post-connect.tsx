import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/adb/request-connect`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useConnectAdb = () => {
  return useMutation({
    mutationKey: ['Connect ADB'],
    mutationFn: fetchApi
  })
}
