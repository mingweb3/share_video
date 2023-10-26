'use client'

import VideoItem from './VideoItem'

import { getIDfromURL } from '@/utils/general.helper'

interface IVideoListProps {
  data: ISharedVideo[]
}

function VideoList({ data }: IVideoListProps) {
  return (
    <div>
      {data.length > 0 ? (
        <section className="video-listing flex flex-col gap-12">
          {data.map((item: ISharedVideo) => {
            const videoID = getIDfromURL(item.url)

            if (videoID) return <VideoItem key={item.id} vId={videoID} />
            return null
          })}
        </section>
      ) : (
        <>No Data</>
      )}
    </div>
  )
}

export default VideoList
