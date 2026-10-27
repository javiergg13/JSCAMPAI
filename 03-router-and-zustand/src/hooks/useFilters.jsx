import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"
const RESULTS_PER_PAGE = 3

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get("technology") || "",
      location: searchParams.get("type") || "",
      level: searchParams.get("level") || "",
    }
  })

  const [textToFilter, setTextToFilter] = useState(
    () => searchParams.get("text") || "",
  )

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"))
    return Number.isNaN(page) ? page : 1
  })

  const [jobs, setJobs] = useState([])
  const [totalJobs, setTotalJobs] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append("text", textToFilter)
        if (filters.technology) params.append("technology", filters.technology)
        if (filters.location) params.append("type", filters.location)
        if (filters.level) params.append("level", filters.level)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append("limit", String(RESULTS_PER_PAGE))
        params.append("offset", String(offset))

        // const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${params.toString()}`,)
        const response = await fetch(
          `http://localhost:1234/jobs?${params.toString()}`,
        )
        const json = await response.json()

        setJobs(json.data)
        setTotalJobs(json.total)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [filters, textToFilter, currentPage])

  useEffect(() => {
    setSearchParams((params) => {
      if (textToFilter) params.set("text", textToFilter)
      if (filters.technology) params.set("technology", filters.technology)
      if (filters.location) params.set("type", filters.location)
      if (filters.level) params.set("level", filters.level)
      if (currentPage > 1) params.set("page", String(currentPage))

      return params
    })
  }, [filters, currentPage, textToFilter, setSearchParams])

  const totalPages = Math.ceil(totalJobs / RESULTS_PER_PAGE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  return {
    loading,
    jobs,
    currentPage,
    totalPages,
    textToFilter,
    filters,
    handlePageChange,
    handleFiltersChange,
    handleTextFilter,
  }
}
