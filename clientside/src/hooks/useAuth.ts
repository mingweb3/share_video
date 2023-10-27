/* eslint-disable no-console */
/*
 *  Temporary solution for Auth, Guard, Persist...
 */
import { useState } from 'react'

import { getMeFn } from '@/services/auth.api'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [me, setMe] = useState<IUser>()

  const getMe = async () => {
    const accessToken = await localStorage.getItem('at')

    if (accessToken) {
      try {
        const data = await getMeFn(accessToken)
        if (data) {
          setMe(data)
          setIsAuth(true)
        } else {
          setMe(undefined)
          setIsAuth(false)
          localStorage.clear()
        }
      } catch (error) {
        console.log(error)
        setMe(undefined)
        setIsAuth(false)
        localStorage.clear()
      }
    } else {
      setIsAuth(false)
    }
    return accessToken
  }

  return {
    isAuth,
    me,
    getMe
  }
}
