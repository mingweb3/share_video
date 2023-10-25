const apiBase = process.env.API_BASE
const apiYoutubeBase = process.env.NEXT_PUBLIC_API_YOUTUBE_BASE

export const getApi = async (apiEndpoint: string, init?: RequestInit) => {
  const response = await fetch(apiBase + apiEndpoint, init)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  const res = await response.json()

  return res
}

export const getYoutubeApi = async (apiEndpoint: string, init?: RequestInit) => {
  const response = await fetch(apiYoutubeBase + apiEndpoint, init)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  const res = await response.json()

  return res
}
