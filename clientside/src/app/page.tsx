/* eslint-disable import/no-extraneous-dependencies */

'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { VideoList } from '@/components/Videos'
import { itemPerPage } from '@/constant/site.config'
import useQueryParams from '@/hooks/useQueryParams'
import { getVideosFn } from '@/services/video.api'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const [dataList, setDataList] = useState<ISharedVideo[]>([])

  const { queryParams, setQueryParams } = useQueryParams<{
    p?: string
  }>()
  const cPage = queryParams?.get('p') ? Number(queryParams?.get('p')) : 1

  // query: Get Videos
  const { data, isLoading } = useQuery({
    queryKey: ['shared-videos', cPage],
    queryFn: () => {
      return getVideosFn({ limit: itemPerPage, page: Number(cPage) })
    },
    retry: 0
  })

  useEffect(() => {
    if (data && data.items.length > 0) {
      setDataList([...dataList, ...data.items])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // Actions: Load More items
  const loadMoreVideos = (n: number) => {
    console.log(n)
    setQueryParams({ p: n.toString() })
  }

  return (
    <main className="h-full min-h-screen w-full p-6 sm:p-24">
      <div className="mx-auto max-w-[960px]">
        <div className="page-content">
          {isLoading && <div className="text-center text-lg">Loading data...</div>}
          {dataList && !isLoading && <VideoList data={dataList} />}
          {data && (
            <div>
              {data.currentPage < data.pages ? (
                <div className="pagin pt-10 text-center">
                  <button
                    onClick={() => loadMoreVideos(cPage + 1)}
                    type="button"
                    className="bg-gray3 hover:bg-gray4 rounded-lg px-12 py-2 text-[12px]"
                  >
                    LOAD MORE
                  </button>
                </div>
              ) : (
                <span> </span>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
