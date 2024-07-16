import { axiosWhatsappApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosWhatsappApi
    .post(`/whatsapp`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useCreateWhatsapp = () => {
  return useMutation({
    mutationKey: ['Create Whatsapp'],
    mutationFn: fetchApi
  })
}
