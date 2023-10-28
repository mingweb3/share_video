/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import type { IErrorForm } from '@/types/error'

interface ErrorFormProps {
  errorData: IErrorForm
}

function ErrorBox({ errorData }: ErrorFormProps) {
  return (
    <div className="sys-msg err-msg rounded-lg border-[1px] border-solid border-red bg-red bg-opacity-10 px-4 py-2 text-red">
      <div className="font-bold">
        {errorData.statusCode} - {errorData.error}{' '}
      </div>
      {errorData.message && <div className="font-light">{errorData.message}</div>}
    </div>
  )
}

export default ErrorBox
