/* eslint-disable import/no-extraneous-dependencies */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { SKELETON_BASE_COLOR, SKELETON_HIGHLIGHT_COLOR } from '@/constant/skeletonThemeColors'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function ClientProviders({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor={SKELETON_BASE_COLOR} highlightColor={SKELETON_HIGHLIGHT_COLOR}>
        {children}
      </SkeletonTheme>
    </QueryClientProvider>
  )
}

export default ClientProviders
