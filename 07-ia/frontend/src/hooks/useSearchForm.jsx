import { useState, useRef } from "react"

export const useSearchForm = ({
  idText,
  idTechnology,
  idLocation,
  idExperienceLevel,
  onFilterChange,
  onTextFilter,
}) => {
  const timeoutIdRef = useRef(null)
  const [searchText, setSearchText] = useState("")

  const handleFilterChange = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if (e.target.name === idText) {
      return
    }

    const filters = {
      text: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      level: formData.get(idExperienceLevel),
    }

    onFilterChange(filters)
  }

  const handleTextChange = (e) => {
    const text = e.target.value
    setSearchText(text)

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      onTextFilter(text)
    }, 500)
  }

  return {
    searchText,
    handleFilterChange,
    handleTextChange,
  }
}
