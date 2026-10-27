export function Pagination({ currentPage = 1, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const stylePrevButton =
    isFirstPage || totalPages === 0
      ? { opacity: 0.5, pointerEvents: "none" }
      : {}
  const styleNextButton =
    isLastPage || totalPages === 0
      ? { opacity: 0.5, pointerEvents: "none" }
      : {}

  const handlePrevClick = (e) => {
    e.preventDefault()
    onPageChange(currentPage - 1)
  }

  const handleNextClick = (e) => {
    e.preventDefault()
    onPageChange(currentPage + 1)
  }

  const handleChangePage = (e, page) => {
    e.preventDefault()
    if (page !== currentPage) onPageChange(page)
  }

  const buildPageUrl = (page) => {
    const url = new URL(window.location.href)
    url.searchParams.set("page", page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

  return (
    <nav className="pagination">
      <a
        // @ts-ignore
        style={stylePrevButton}
        onClick={handlePrevClick}
        href={buildPageUrl(currentPage - 1)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      {pages.map((page) => (
        <a
          key={page}
          href={buildPageUrl(page)}
          className={page === currentPage ? "is-active" : ""}
          onClick={(e) => handleChangePage(e, page)}
        >
          {page}
        </a>
      ))}

      <a
        // @ts-ignore
        style={styleNextButton}
        href={buildPageUrl(currentPage + 1)}
        onClick={handleNextClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </nav>
  )
}
