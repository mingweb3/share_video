'use client'

function ShareVideoForm() {
  return (
    <div className="max-w-[640px]">
      <div className="text-bold mb-1">Youtube URL</div>
      <input
        type="text"
        className="ipt border-gray3 block w-full rounded-lg border bg-[#111111] p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Paste your video url here"
      />
      <div className="pt-4 text-right">
        <button
          type="button"
          className="bg-primary hover:bg-blue2 dark:bg-blue rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SHARE
        </button>
      </div>
    </div>
  )
}

export default ShareVideoForm
