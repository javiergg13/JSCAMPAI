import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

export function useAISummary(jobId) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateSummary = async () => {
    setLoading(true)
    setError(null)
    setSummary("")

    try {
      const response = await fetch(`${API_URL}/ia/summary/${jobId}`)
      if (!response.ok) {
        throw new Error("Error fetching summary")
      }

      if (!response.body) {
        throw new Error("Summary response has no body")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let receivedText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        receivedText += chunk
        setSummary((previous) => previous + chunk)
      }

      const remainingText = decoder.decode()
      if (remainingText) {
        receivedText += remainingText
        setSummary((previous) => previous + remainingText)
      }

      if (!receivedText.trim()) {
        throw new Error("Empty summary response")
      }
    } catch {
      setError("Error al generar el resumen")
    } finally {
      setLoading(false)
    }
  }

  return {
    summary,
    loading,
    error,
    generateSummary,
  }
}
