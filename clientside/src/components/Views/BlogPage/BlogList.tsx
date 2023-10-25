import Link from 'next/link'

interface IBlogListProps {
  dataList: IPost[]
}

function BlogList({ dataList }: IBlogListProps) {
  return (
    <div className="pt-8">
      {dataList.length <= 0 && <p>No Post</p>}
      {dataList.length > 0 && (
        <div className="flex flex-col gap-6">
          {dataList.map((itm: IPost) => {
            const { id, title, body } = itm
            return (
              <div key={id} className="post-item rounded-lg border border-[#222222] p-4">
                <h4 className="mb-2 text-xl capitalize">{title}</h4>
                <div className="mb-4 text-[#999999]">{body}</div>
                <Link href={`/blogs/${id}`} className="italic text-[#dddddd] underline hover:text-white">
                  Read more
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BlogList
