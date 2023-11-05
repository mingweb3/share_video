/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */

'use client'

import { VideoList } from '@/components/Videos'
import { itemPerPage } from '@/constant/site.config'
import { getVideosFn } from '@/services/video.api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  // Infinity Loading
  const { ref, inView } = useInView()

  const { status, data, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['shared-videos'],
    queryFn: ({ pageParam }) => {
      return getVideosFn({ limit: itemPerPage, page: Number(pageParam) })
    },
    initialPageParam: 1,
    getPreviousPageParam: (fdata: ISharedVideoList) => {
      return fdata.currentPage === fdata.pages ? undefined : fdata.currentPage + 1
    },
    getNextPageParam: (ldata: ISharedVideoList) => {
      return ldata.currentPage === ldata.pages ? undefined : ldata.currentPage + 1
    }
  })

  // Load next page when at the end
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <main className="h-full min-h-screen w-full p-6 sm:p-24">
      <div className="mx-auto max-w-[960px]">
        <div className="page-content">
          {status === 'pending' ? (
            <div className="text-center">Loading...</div>
          ) : status === 'error' ? (
            <div className="text-center text-red">Error: {error.message}</div>
          ) : (
            <div className="flex flex-col gap-12">
              {data.pages.map((page: unknown, i) => {
                const { items, currentPage } = page as unknown as ISharedVideoList

                if (items.length > 0)
                  return (
                    <div key={`${currentPage}-${i}`}>
                      <VideoList data={items} />
                    </div>
                  )
                return null
              })}
              {hasNextPage && (
                <div className="text-center">
                  <button
                    type="button"
                    className="bg-gray3 hover:bg-gray4 rounded-lg px-12 py-2 text-[12px]"
                    ref={ref}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
