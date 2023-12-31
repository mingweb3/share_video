'use client'

import { useState } from 'react'

import { LoginForm, SignInForm } from '../AuthForm'
import Modal from '../Modal'

function Nav() {
  const [showModalLogin, setShowModalLogin] = useState<boolean>(false)
  const [showModalSignIn, setShowModalSignIn] = useState<boolean>(false)

  return (
    <>
      <nav>
        <ul className="flex flex-row items-center gap-2 text-sm sm:gap-6 sm:text-xl">
          <li>
            <span
              onClick={() => setShowModalLogin(true)}
              className="cursor-pointer font-light text-graylight transition-colors hover:text-white"
              aria-hidden="true"
            >
              Log In
            </span>
          </li>
          <li>
            <span className="text-sm">|</span>
          </li>
          <li>
            <span
              onClick={() => setShowModalSignIn(true)}
              className="cursor-pointer font-light text-graylight transition-colors hover:text-white"
              aria-hidden="true"
            >
              Sign In
            </span>
          </li>
        </ul>
      </nav>
      {showModalLogin && (
        <Modal
          onClose={() => setShowModalLogin(false)}
          title="Login"
          content={<LoginForm onClose={() => setShowModalLogin(false)} />}
        />
      )}
      {showModalSignIn && (
        <Modal onClose={() => setShowModalSignIn(false)} title="Register new account" content={<SignInForm />} />
      )}
    </>
  )
}

export default Nav
