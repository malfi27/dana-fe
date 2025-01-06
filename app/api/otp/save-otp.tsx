import { axiosApi } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

const fetchApi = async (body: any) => {
  const request = axiosApi
    .post(`/otp`, body)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useSaveOtp = () => {
  return useMutation({
    mutationKey: ['Save OTP To Database'],
    mutationFn: fetchApi
  })
}
