'use client'

import { useQuery } from '@tanstack/react-query'

import PlayerArrow from '../Svg/PlayerArrow'
import VoteDownIcon from '../Svg/VoteDown'
import VoteUpIcon from '../Svg/VoteUp'

import { getYoutubeVideoById } from '@/services/youtube.api'
import VideoItemPlaceholder from './VideoItemPlaceholder'

import './VideoItem.css'

interface IVideoItemProps {
  vId: string
}

function VideoItem({ vId }: IVideoItemProps) {
  // query: Get Video Details
  const { data, isLoading } = useQuery({
    queryKey: ['yt-video-id', vId],
    queryFn: () => {
      return getYoutubeVideoById(vId)
    },
    retry: 0
  })

  return (
    <>
      {isLoading && <VideoItemPlaceholder />}
      {data && !isLoading && (
        <div className="video-item border-gray3 flex flex-col gap-6 border-b-[1px] border-solid pb-8 sm:flex-row">
          <div className="video-thumb">
            <figure className="video-img">
              <img src={data.snippet.thumbnails.maxres.url} alt="This is an img" />
              <PlayerArrow />
            </figure>
          </div>
          <div className="video-content text-graylight">
            <h4 className="text-[24px] text-white">{data.snippet.title}</h4>
            <p className="mb-4">
              Shared by: <span>someone@gmail.com</span>
            </p>
            <div className="flex flex-row gap-6 mb-4 vote">
              <div className="flex flex-row items-center gap-1 text-white">
                122 <VoteUpIcon color="#777777" />
              </div>
              <div className="flex flex-row items-center gap-1 text-white">
                12 <VoteDownIcon color="#777777" />
              </div>
            </div>
            {data.snippet.description && <div className="font-bold">Description:</div>}
            {data.snippet.description && <div className="break-all">{data.snippet.description}</div>}
          </div>
        </div>
      )}
    </>
  )
}

export default VideoItem
