import { axiosWhatsappApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosWhatsappApi
    .post(`/whatsapp/scan/${body.whatsapp_number}`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGenerateQRCode = () => {
  return useMutation({
    mutationKey: ['Create Generate QR Code Whatsapp'],
    mutationFn: fetchApi
  })
}
