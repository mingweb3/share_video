'use client'

import { useState } from 'react'

import Modal from '../Modal'
import ShareVideoForm from '../ShareVideo'

function TopBarUser() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="items:start flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
      <div className="text-right">
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="border-gray4 hover:bg-gray3 rounded border bg-transparent px-6 py-1 font-semibold text-white hover:border-transparent hover:text-white"
        >
          Share a movie
        </button>
      </div>

      <div className="profile-bar text-graylight text-right">
        Welcome <span>someone@gmail.com</span>
        <button type="button" className="text-gray7e ml-2 underline hover:text-white">
          Log out
        </button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Share a Youtube video" content={<ShareVideoForm />} />
      )}
    </div>
  )
}

export default TopBarUser
