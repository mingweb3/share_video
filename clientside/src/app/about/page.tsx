/* eslint-disable tailwindcss/no-custom-classname */
import type { Metadata } from 'next/types'
import React, { Suspense } from 'react'

import Hero from '@/components/Hero'
import { Container } from '@/components/layout'
import { Content } from '@/components/Views/AboutPage'
import { getPostById } from '@/services/posts.api'

export const metadata: Metadata = {
  title: 'About Page | Next13 Starter',
  description: 'Get DATA SSR'
}

const page = async () => {
  const data = await getPostById(1)

  return (
    <Container>
      <div className="inner pb-44 pt-6">
        <h1 className="mb-2 text-2xl font-bold">About us</h1>
        <Hero />
        <Suspense fallback={<p className="pt-8">LOADING...</p>}>
          <Content data={data} />
        </Suspense>
      </div>
    </Container>
  )
}

export default page
