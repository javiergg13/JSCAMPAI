import { JobCard } from "../components/JobCard.jsx"
import { JobsSearch } from "../components/JobsSearch.jsx"
import { Pagination } from "../components/Pagination.jsx"

import { useFilters } from "../hooks/useFilters.jsx"

export function SearchPage() {
  const {
    loading,
    jobs,
    currentPage,
    totalPages,
    textToFilter,
    filters,
    handlePageChange,
    handleFiltersChange,
    handleTextFilter,
  } = useFilters()

  return (
    <main>
      <JobsSearch
        initialText={textToFilter}
        initialFilters={filters}
        onFilterChange={handleFiltersChange}
        onTextFilter={handleTextFilter}
      />
      <section>
        <h2>Resultados de búsqueda</h2>
        {loading ? (
          <p
            style={{
              textAlign: "center",
              padding: "1rem",
            }}
          >
            Cargando...
          </p>
        ) : (
          <JobCard jobs={jobs} />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  )
}
