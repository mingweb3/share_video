'use client'

import CrossIcon from '../Svg/Cross'

interface IModalProps {
  onClose: () => void
  title: string
  content: React.ReactNode
}

function Modal({ onClose, title, content }: IModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="modal-box relative z-50 mx-auto my-6 w-auto max-w-3xl">
        <div className="relative flex w-full flex-col rounded-lg border-0 bg-[#111111] shadow-lg outline-none focus:outline-none">
          <div className="flex min-w-[320px] items-center justify-between rounded-t border-b border-solid border-gray3 p-5">
            <h3 className="text-xl font-semibold text-[#999999]">{title}</h3>
            <button
              onClick={onClose}
              type="button"
              className="bg-transparent float-right ml-auto border-0 p-1 text-lg font-semibold leading-none outline-none focus:outline-none"
            >
              <CrossIcon />
            </button>
          </div>
          <div className="relative flex-auto p-5">{content}</div>
        </div>
      </div>
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 z-40 bg-black opacity-80" />
    </div>
  )
}

export default Modal
