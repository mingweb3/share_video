interface IContentProps {
  data: IPost
}

function Content({ data }: IContentProps) {
  return (
    <div className="pt-8">
      {data && (
        <article>
          {data.title && <h2 className="mb-4 text-2xl capitalize">{data.title}</h2>}
          {data.body && <div className="blog-ct text-md tracking-wider text-[#666666] lg:text-[24px]">{data.body}</div>}
        </article>
      )}
    </div>
  )
}

export default Content
