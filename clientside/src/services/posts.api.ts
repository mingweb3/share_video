import { getApi } from './fetch.api'

const API_POST = '/posts'

export const getPosts = async (): Promise<IPost[]> => {
  const requestConfig = { next: { revalidate: 300 } } // demo how to setup Time-based Revalidation

  // Leave 2nd agurment null if not nessesary
  const posts = await getApi(API_POST, requestConfig)
  return posts
}

export const getPostById = async (id: number): Promise<IPost> => {
  const requestConfig = { next: { revalidate: 300 } }

  const post = await getApi(`${API_POST}/${id}`, requestConfig)
  return post
}
