'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import Container from './Container'
import Nav from './Nav'
import TopBarUser from '../TopBarUser'

import { useAuth } from '@/hooks/useAuth'

function Header() {
  // HOOK to handle token and persit for temporary.
  // Should use Global State to do it
  const { isAuth, me, getMe } = useAuth()

  useEffect(() => {
    getMe()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <div className="item-start flex flex-row justify-between pb-4 pt-8 sm:items-center sm:px-4">
        <div className="web-logo">
          <Link href="/" className="flex flex-row items-center gap-4">
            <Image src="/images/n_logo.svg" width={50} height={50} quality={100} alt="Website Logo" />
            <span className="text-lg font-bold">Funny Movies</span>
          </Link>
        </div>
        <div className="nav-left-side">
          {isAuth === true && me && <TopBarUser data={me} />}
          {!isAuth && <Nav />}
        </div>
      </div>
    </Container>
  )
}

export default Header
