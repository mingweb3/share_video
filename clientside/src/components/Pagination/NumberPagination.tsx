/* eslint-disable react/no-array-index-key */
import './styles.css'

interface NumberPaginationProps {
  totalPage: number
  curPage: number
  canPrevPage: boolean
  canNextPage: boolean
  onChangePage: (pageNumber: number) => void
  onPrevPage: () => void
  onNextPage: () => void
}

function NumberPagination({
  totalPage,
  curPage,
  canPrevPage,
  canNextPage,
  onChangePage,
  onPrevPage,
  onNextPage
}: NumberPaginationProps) {
  return (
    <div className="pagination-number flex flex-row items-center justify-center gap-2 text-white">
      <button
        type="button"
        className="pag-btn border-gray4 text-graylight rounded-md border-[1px] px-3 py-1 hover:border-white hover:text-white"
        onClick={onPrevPage}
        disabled={canPrevPage}
      >
        Prev
      </button>
      {[...Array(totalPage)].map((_, i) => (
        <button
          type="button"
          key={i}
          onClick={() => onChangePage(i + 1)}
          className={`pag-btn border-gray4 text-graylight rounded-md border-[1px] px-3 py-1 hover:border-white hover:text-white ${
            curPage === i + 1 ? 'active' : ''
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        type="button"
        className="pag-btn border-gray4 text-graylight rounded-md border-[1px] px-3 py-1 hover:border-white hover:text-white"
        onClick={onNextPage}
        disabled={canNextPage}
      >
        Next
      </button>
    </div>
  )
}

export default NumberPagination
