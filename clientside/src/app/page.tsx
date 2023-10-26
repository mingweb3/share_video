/* eslint-disable import/no-extraneous-dependencies */

'use client'

import { useQuery } from '@tanstack/react-query'

import { VideoList } from '@/components/Videos'
import { itemPerPage } from '@/constant/site.config'
import { getVideosFn } from '@/services/video.api'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  // query: Get Videos
  const { data, isLoading } = useQuery({
    queryKey: ['shared-videos', 1],
    queryFn: () => {
      return getVideosFn({ limit: itemPerPage, page: 1 })
    },
    retry: 0
  })

  return (
    <main className="h-full min-h-screen w-full p-6 sm:p-24">
      <div className="mx-auto max-w-[960px]">
        <div className="page-content">
          {isLoading && <div className="text-center text-lg">Loading data...</div>}
          {data && !isLoading && <VideoList data={data.items} />}
        </div>
      </div>
    </main>
  )
}
