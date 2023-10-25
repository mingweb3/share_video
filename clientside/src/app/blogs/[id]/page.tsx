import type { Metadata } from 'next/types'
import { Suspense } from 'react'

import { Container } from '@/components/layout'
import { Hero } from '@/components/Views/BlogPage'
import { getPostById } from '@/services/posts.api'

type IBlogDetailProps = {
  params: { id: string }
}

// SEO
export const generateMetadata = async ({ params }: IBlogDetailProps): Promise<Metadata> => {
  const { id } = params
  const data = await getPostById(Number(id))

  return {
    title: `${data ? data.title : 'No Title'}`,
    description: data ? data.body : 'No content'
  }
}

const page = async ({ params }: IBlogDetailProps) => {
  const { id } = params
  const data = await getPostById(Number(id))

  return (
    <Container>
      <article className="inner py-6">
        <Suspense fallback={<p>LOADING....</p>}>
          {data && (
            <>
              <h1 className="mb-2 text-2xl font-bold capitalize">{data.title}</h1>
              <Hero />
              <div className="py-10 text-[32px] font-light tracking-wider text-[#666666]">{data.body}</div>
            </>
          )}
          {!data && <p>No Data</p>}
        </Suspense>
      </article>
    </Container>
  )
}

export default page
