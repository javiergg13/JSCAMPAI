import { useState, useEffect } from "react"
import { useRouter } from "./useRouter"
const RESULTS_PER_PAGE = 3

export const useFilters = () => {
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return {
      technology: params.get("technology") || "",
      location: params.get("type") || "",
      level: params.get("level") || "",
    }
  })
  const [textToFilter, setTextToFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("text") || ""
  })
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get("page"))
    return Number.isNaN(page) ? page : 1
  })

  const [jobs, setJobs] = useState([])
  const [totalJobs, setTotalJobs] = useState(0)
  const [loading, setLoading] = useState(false)

  const { navigateTo } = useRouter()

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

        console.log(params.toString())
        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${params.toString()}`,
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
    const params = new URLSearchParams()

    if (textToFilter) params.append("text", textToFilter)
    if (filters.technology) params.append("technology", filters.technology)
    if (filters.location) params.append("type", filters.location)
    if (filters.level) params.append("level", filters.level)
    if (currentPage > 1) params.append("page", String(currentPage))

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname

    navigateTo(newUrl)
  }, [filters, currentPage, textToFilter, navigateTo])

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
