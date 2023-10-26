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
        <ul className="flex flex-row items-center gap-6 text-xl">
          <li>
            <span
              onClick={() => setShowModalLogin(true)}
              className="text-graylight cursor-pointer font-light transition-colors hover:text-white"
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
              className="text-graylight cursor-pointer font-light transition-colors hover:text-white"
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
