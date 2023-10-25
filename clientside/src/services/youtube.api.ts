import { getYoutubeApi } from './fetch.api'

const apiYoutubeKey = process.env.NEXT_PUBLIC_API_YOUTUBE_KEY
const API_VIDEO_BY_ID = `/videos?part=snippet&key=${apiYoutubeKey}&id=`

export const getYoutubeVideoById = async (id: string): Promise<IVideo | undefined> => {
  const requestConfig = { next: { revalidate: 300 } }

  const data = await getYoutubeApi(`${API_VIDEO_BY_ID}${id}`, requestConfig)

  if (data) {
    if (data.items && data.items.length === 1) {
      return data.items[0]
    }
    return undefined
  }
  return undefined
}
