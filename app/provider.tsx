'use client'

import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'
import { ThemeProvider } from 'next-themes'
import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
  dehydrate
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  let router = useRouter()
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider navigate={router.push}>
        <ThemeProvider attribute="class">
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </RouterProvider>
    </QueryClientProvider>
  )
}
