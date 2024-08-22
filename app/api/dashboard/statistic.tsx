import { axiosApi } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const apiFetch = () => {
  const request = axiosApi
    .get(`/dashboard`)
    .then((responses) => {
      return responses
    })
    .catch((err) => {
      return err
    })
  return request
}

export const useGetDashboardStatistic = () =>
  useQuery({
    queryKey: ['Dashboard Statistic'],
    queryFn: () => apiFetch(),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
