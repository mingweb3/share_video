'use client'

import Image from 'next/image'
import Link from 'next/link'

import Container from './Container'
import Nav from './Nav'
// import TopBarUser from '../TopBarUser'

function Header() {
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
          <Nav />
          {/* <TopBarUser /> */}
        </div>
      </div>
    </Container>
  )
}

export default Header
