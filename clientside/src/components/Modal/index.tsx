'use client'

interface IModalProps {
  onClose: () => void
  title: string
  content: React.ReactNode
}

function Modal({ onClose, title, content }: IModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="relative z-50 mx-auto my-6 w-auto max-w-3xl">
        <div className="relative flex w-full flex-col rounded-lg border-0 bg-[#111111] shadow-lg outline-none focus:outline-none">
          <div className="border-gray3 flex min-w-[320px] items-center justify-between rounded-t border-b border-solid p-5">
            <h3 className="text-xl font-semibold text-[#999999]">{title}</h3>
            <button
              onClick={onClose}
              type="button"
              className="float-right ml-auto border-0 bg-transparent p-1 text-lg font-semibold leading-none outline-none focus:outline-none"
            >
              <span className="block bg-transparent text-2xl font-light text-[#bbbbbb] outline-none focus:outline-none">
                x
              </span>
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
