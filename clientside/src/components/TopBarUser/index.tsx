'use client'

import { useState } from 'react'

import Modal from '../Modal'
import ShareVideoForm from '../ShareVideo'

interface ITopBarUserProps {
  data: IUser
}

function TopBarUser({ data }: ITopBarUserProps) {
  const [showModal, setShowModal] = useState(false)

  // Simple Logout for Temporary term
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="items:start flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
      <div className="text-right">
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="bg-transparent hover:border-transparent rounded border border-gray4 px-6 py-1 font-semibold text-white hover:bg-gray3 hover:text-white"
        >
          Share a movie
        </button>
      </div>
      {data && (
        <div className="profile-bar text-right text-graylight">
          Welcome <span>{data.email}</span>
          <button onClick={logout} type="button" className="ml-2 text-gray7e underline hover:text-white">
            Log out
          </button>
        </div>
      )}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Share a Youtube video"
          content={<ShareVideoForm onClose={() => setShowModal(false)} />}
        />
      )}
    </div>
  )
}

export default TopBarUser
