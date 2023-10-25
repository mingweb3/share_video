import type { Metadata } from 'next/types'
import React, { Suspense } from 'react'

import { Container } from '@/components/layout'
import { BlogList } from '@/components/Views/BlogPage'
import { getPosts } from '@/services/posts.api'
import './styles.css'

export const metadata: Metadata = {
  title: 'Blog Page | Next13 Starter',
  description: 'Get Post in a List SSR'
}

const page = async () => {
  const dataList = await getPosts()

  return (
    <Container>
      <div className="inner py-6">
        <h1 className="mb-2 text-2xl font-bold">Blog</h1>
        <div className="page-desc pt-8">I will get Posts and show in a list (Nested Comp) - SSR</div>
        <Suspense fallback={<p className="pt-8">LOADING....</p>}>
          <BlogList dataList={dataList} />
        </Suspense>
      </div>
    </Container>
  )
}

export default page
