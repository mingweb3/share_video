/* eslint-disable import/no-extraneous-dependencies */

'use client'

import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constant/validatePattern'
import { loginFn } from '@/services/auth.api'
import type { IErrorForm } from '@/types/error'
import { isAxiosError } from '@/utils/general.helper'

import ErrorBox from '../ErrorBox'

interface ILoginFormProps {
  onClose?: () => void
}

function LoginForm({ onClose }: ILoginFormProps) {
  // API Login Mutation
  const {
    mutate: loginQuery,
    isPending,
    error
  } = useMutation({
    mutationFn: (userData: ILoginForm) => loginFn(userData),
    onSuccess: (data: IAuth) => {
      localStorage.setItem('at', data.accessToken)
      if (onClose) onClose()
      setTimeout(() => window.location.reload(), 400)
    }
  })

  // Error handle
  const errorForm = useMemo(() => {
    if (isAxiosError<{ error: IErrorForm }>(error)) {
      return error.response?.data as unknown as IErrorForm
    }
    return undefined
  }, [error])

  // Submit Login Form
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ILoginForm>()

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    if (isPending) return
    loginQuery(data)
  }

  return (
    <div className="sm:w-[320px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ipt-group mb-4">
          <input
            {...register('email', { pattern: EMAIL_REGEX, required: true })}
            aria-label="email"
            type="text"
            className="ipt text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 block w-full rounded-lg  border border-gray3 bg-[#111111] p-2.5 text-sm dark:text-white"
            placeholder="Email"
          />
          {errors.email && (
            <div className="error msg pt-1 text-sm text-red" role="alert">
              Email is invaild!
            </div>
          )}
        </div>
        <div className="ipt-group">
          <input
            {...register('password', { pattern: PASSWORD_REGEX, required: true })}
            data-testid="password-id"
            type="password"
            className="ipt text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 block w-full rounded-lg  border border-gray3 bg-[#111111] p-2.5 text-sm dark:text-white"
            placeholder="Password"
          />
          {errors.password && (
            <div className="error msg pt-1 text-sm text-red" role="alert">
              At least 8 characters, 1 Uppercase, 1 number, 1 special char
            </div>
          )}
        </div>
        {errorForm && (
          <div className="pt-4">
            <ErrorBox errorData={errorForm} />
          </div>
        )}
        <div className="pt-4 text-center">
          <button
            disabled={isPending}
            type="submit"
            className="btn-primary dark:bg-blue focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-[120px] rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-blue2 focus:outline-none focus:ring-4"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
