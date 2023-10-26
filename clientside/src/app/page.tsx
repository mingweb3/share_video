'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SkeletonTheme } from 'react-loading-skeleton'

import { VideoList } from '@/components/Videos'
import { SKELETON_BASE_COLOR, SKELETON_HIGHLIGHT_COLOR } from '@/constant/skeletonThemeColors'

import 'react-loading-skeleton/dist/skeleton.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor={SKELETON_BASE_COLOR} highlightColor={SKELETON_HIGHLIGHT_COLOR}>
        <main className="w-full h-full min-h-screen p-6 sm:p-24">
          <div className="max-w-[960px] mx-auto">
            <div className="page-content">
              <VideoList />
            </div>
          </div>
        </main>
      </SkeletonTheme>
    </QueryClientProvider>
  )
}
