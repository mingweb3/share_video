/* eslint-disable import/no-extraneous-dependencies */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { VideoList } from '@/components/Videos'

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
      <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24">
        <div className="page-content">
          <VideoList />
        </div>
      </main>
    </QueryClientProvider>
  )
}
