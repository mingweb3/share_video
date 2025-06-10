'use client'

import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import ErrorBox from '../ErrorBox'

import { YT_VIDEO_URL_REGEX } from '@/constant/validatePattern'
import { postSVideoFn } from '@/services/video.api'
import type { IErrorForm } from '@/types/error'
import { getIDfromURL, isAxiosError } from '@/utils/general.helper'

interface IShareVideoFormProps {
  onClose: () => void
}

function ShareVideoForm({ onClose }: IShareVideoFormProps) {
  // API Login Mutation
  const {
    mutate: postUrl,
    isPending,
    error
  } = useMutation({
    mutationFn: (urlData: ISharedUrlForm) => postSVideoFn(urlData),
    onSuccess: data => {
      if (!data) {
        alert('You must log in to use this feature!')
        setTimeout(() => window.location.reload(), 200)
      }
      onClose()
      window.location.href = '/'
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
  } = useForm<ISharedUrlForm>()

  const onSubmit: SubmitHandler<ISharedUrlForm> = data => {
    if (isPending) return

    const vID = getIDfromURL(data.url)
    if (!vID) alert('This is not youtube video with real ID')
    else {
      postUrl(data)
    }
  }

  return (
    <div className="w-[100%] sm:w-[480px]">
      <div className="mb-1 text-bold">Youtube URL</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('url', { pattern: YT_VIDEO_URL_REGEX, required: true })}
          aria-label="youtube url"
          type="text"
          className="ipt border-gray3 block w-full rounded-lg border bg-[#111111] p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Paste your video url here"
        />
        {errors.url && (
          <div className="pt-1 text-sm error msg text-red" role="alert">
            The URL should be youtube video with VideoID
          </div>
        )}
        {errorForm && (
          <div className="pt-4">
            <ErrorBox errorData={errorForm} />
          </div>
        )}
        <div className="pt-4 text-right">
          <button
            type="submit"
            className="dark:bg-blue bg-primary hover:bg-blue2 rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            SHARE
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShareVideoForm
