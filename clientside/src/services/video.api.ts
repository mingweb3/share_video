import clientRequest, { postWToken } from './request'

const API_VIDEOS = '/videos'

export const getVideosFn = async ({ limit, page }: IPagination): Promise<ISharedVideoList> => {
  const response = await clientRequest.get(`${API_VIDEOS}?limit=${limit || 4}&page=${page || 1}`)
  return response.data
}

export const postSVideoFn = async (data: ISharedUrlForm): Promise<ISharedVideo | null> => {
  const accessToken = await localStorage.getItem('at')

  if (accessToken) {
    const response = await postWToken(API_VIDEOS, data, accessToken)
    return response.data
  }

  return null
}
