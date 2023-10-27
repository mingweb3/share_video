/* eslint-disable import/no-extraneous-dependencies */

'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import NumberPagination from '@/components/Pagination/NumberPagination'
import { VideoList } from '@/components/Videos'
import { itemPerPage } from '@/constant/site.config'
import { getVideosFn } from '@/services/video.api'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const [curPage, setCurPage] = useState<number>(1)

  // Query: Get Videos
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['shared-videos', curPage],
    queryFn: () => {
      return getVideosFn({ limit: itemPerPage, page: curPage })
    },
    retry: 0
  })

  // Actions: Click Go to page
  const handleGoToPage = (nPage: number) => {
    setCurPage(nPage)
  }

  return (
    <main className="h-full min-h-screen w-full p-6 sm:p-24">
      <div className="mx-auto max-w-[960px]">
        <div className="page-content">
          {isLoading && <div className="text-center text-lg">Loading data...</div>}
          {data && !isLoading && (
            <div className={`${isFetching ? 'box-loading' : 'box-ready'}`}>
              <VideoList data={data.items} />
            </div>
          )}
          {data && data.pages > 1 && !isLoading && (
            <div className="pt-10">
              <NumberPagination
                totalPage={data.pages}
                curPage={data.currentPage}
                onChangePage={n => handleGoToPage(n)}
                canPrevPage={!(data.currentPage > 1)}
                canNextPage={!(data.currentPage < data.pages)}
                onPrevPage={() => handleGoToPage(data.currentPage - 1)}
                onNextPage={() => handleGoToPage(data.currentPage + 1)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
