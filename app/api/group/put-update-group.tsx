import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .put(`/group/${body?.group_id}`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useUpdateGroup = () => {
  return useMutation({
    mutationKey: ['Update Group'],
    mutationFn: fetchApi
  })
}
