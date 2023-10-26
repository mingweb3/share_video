import React from 'react'
import Skeleton from 'react-loading-skeleton'

function VideoItemPlaceholder() {
  return (
    <div className="video-item border-gray3 flex flex-col gap-6 border-b-[1px] border-solid pb-8 sm:flex-row">
      <div className="video-thumb">
        <div className="video-img">
          <Skeleton className="video-img" />
        </div>
      </div>
      <div className="flex-1 video-content text-graylight">
        <Skeleton width="100%" height={40} />
        <Skeleton width="50%" />
        <Skeleton width="30%" />
        <Skeleton count={5} />
      </div>
    </div>
  )
}

export default VideoItemPlaceholder
