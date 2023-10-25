/* eslint-disable import/no-extraneous-dependencies */

'use client'

import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constant/validatePattern'

function LoginForm() {
  // Submit Login Form
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ILoginForm>()

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    // if (isLoading) return
    console.log(data)
  }

  return (
    <div className="sm:w-[320px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ipt-group mb-4">
          <input
            {...register('email', { pattern: EMAIL_REGEX, required: true })}
            type="text"
            className="ipt border-gray3 block w-full rounded-lg border bg-[#111111] p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Email"
          />
          {errors.email && (
            <div className="error msg text-red pt-1 text-sm" role="alert">
              Email is invaild!
            </div>
          )}
        </div>
        <div className="ipt-group">
          <input
            {...register('password', { pattern: PASSWORD_REGEX, required: true })}
            type="password"
            className="ipt border-gray3 block w-full rounded-lg border bg-[#111111] p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Password"
          />
          {errors.password && (
            <div className="error msg text-red pt-1 text-sm" role="alert">
              At least 8 characters, 1 Uppercase, 1 number, 1 special char
            </div>
          )}
        </div>
        <div className="pt-4 text-center">
          <button
            type="submit"
            className="bg-primary hover:bg-blue2 dark:bg-blue min-w-[120px] rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
