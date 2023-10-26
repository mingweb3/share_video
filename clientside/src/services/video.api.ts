import clientRequest from './request'

const API_VIDEOS = '/videos'

export const getVideosFn = async ({ limit, page }: IPagination): Promise<ISharedVideoList> => {
  const response = await clientRequest.get(`${API_VIDEOS}?limit=${limit || 4}&page=${page || 1}`)
  return response.data
}
