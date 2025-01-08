import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

interface Props {
  id?: string
}

const apiFetch = (params: Props) => {
  const { id } = params
  const request = axiosApi
    .get(`/whatsapp/${id}`)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetDetailWhatsappLogin = (params: Props = {}) =>
  useQuery({
    enabled: !!params.id,
    queryKey: ['Whatapp Detail', params],
    queryFn: () => apiFetch(params),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })
