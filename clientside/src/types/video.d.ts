interface ISharedVideo {
  id: string
  url: string
  createdAt: string
  updatedAt: string
  userId: number
  snippet: IVideoAttr
  user?: IUser
}

interface ISharedUrlForm {
  url: string
}

interface ISharedVideoList {
  pages: number
  items: ISharedVideo[]
}
interface IVideo {
  id: string
  kind: string
  etag: string
  snippet: IVideoAttr
}

interface IVideoAttr {
  publishedAt: string
  channelId: string
  channelTitle: string
  title: string
  description: string
  thumbnails: IImgObj
  tags?: string[]
  categoryId: string
}

interface IImgObj {
  default: IImgPath
  medium: IImgPath
  high: IImgPath
  standard: IImgPath
  maxres: IImgPath
}

interface IImgPath {
  url: string
  width: number
  height: number
}
