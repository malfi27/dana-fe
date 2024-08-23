import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const apiFetch = () => {
  const request = axiosApi
    .get(`/auth/allusers`)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ['Users'],
    queryFn: () => apiFetch(),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
