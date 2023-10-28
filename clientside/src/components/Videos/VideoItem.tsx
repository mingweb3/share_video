'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { getYoutubeVideoById } from '@/services/youtube.api'

import VideoItemPlaceholder from './VideoItemPlaceholder'
import PlayerArrow from '../Svg/PlayerArrow'
import VoteDownIcon from '../Svg/VoteDown'
import VoteUpIcon from '../Svg/VoteUp'

import './VideoItem.css'

interface IVideoItemProps {
  vId: string
  sVideo: ISharedVideo
}

function VideoItem({ vId, sVideo }: IVideoItemProps) {
  const { user, url } = sVideo

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
        <div className="video-item border-b-[1px] border-solid border-gray3 pb-8 ">
          <div className=" flex flex-col gap-6  sm:flex-row">
            <div className="video-thumb">
              <Link href={url} target="_blank">
                <figure className="video-img overflow-hidden rounded-[12px] border-[1px] border-solid border-gray3">
                  <img
                    src={
                      data.snippet.thumbnails.maxres
                        ? data.snippet.thumbnails.maxres.url
                        : data.snippet.thumbnails.default.url
                    }
                    alt="This is an img"
                  />
                  <PlayerArrow />
                </figure>
              </Link>
            </div>
            <div className="video-content text-graylight">
              <h4 className="mt-[-6px] text-[16px] text-white sm:text-[24px]">{data.snippet.title}</h4>
              {user && user.email && (
                <p className="mb-4">
                  Shared by: <span>{user.email}</span>
                </p>
              )}
              <div className="vote flex flex-row gap-6">
                <div className="flex flex-row items-center gap-1 text-white">
                  122 <VoteUpIcon color="#777777" />
                </div>
                <div className="flex flex-row items-center gap-1 text-white">
                  12 <VoteDownIcon color="#777777" />
                </div>
              </div>
              {data.snippet.description && (
                <div className="desc max-h-[110px] overflow-hidden pt-4 text-graylight">
                  <div className="font-bold">Description:</div>
                  <div className="break-all">{data.snippet.description}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoItem
