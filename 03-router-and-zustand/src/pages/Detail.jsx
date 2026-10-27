import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { useRouter } from "../hooks/useRouter"
import { Link } from "../components/Link"
import { JobSection } from "../components/JobSection"

import { useAuthStore } from "../store/authStore"

import styles from "./Detail.module.css"
import { JobCardFavoriteButton } from "../components/JobCardFavoriteButton"

export default function JobDetail() {
  const { isLoggedIn } = useAuthStore()
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, setError] = useState(null)

  const { navigateTo } = useRouter()

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Job Not Found")
        return res.json()
      })
      .then((json) => setJob(json))
      .catch((err) => setError(err.message))
      .finally(() => setloading(false))
  }, [jobId])

  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
          <button
            onClick={() => navigateTo("/")}
            className={styles.errorButton}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      <div className={styles.container}>
        <nav>
          <Link href="/search" className={styles.breadcrumbButton}>
            Empleos
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
        </nav>
      </div>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{job.titulo}</h1>
          <p className={styles.header}>
            {job.empresa} · {job.ubicacion}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button disabled={!isLoggedIn} className={styles.applyButton}>
            {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
          </button>

          <JobCardFavoriteButton jobId={job.id} isLoggedIn={isLoggedIn} />
        </div>
      </header>

      <JobSection
        title="Descripción del puesto"
        content={job.content.description}
      />
      <JobSection
        title="Responsabilidades"
        content={job.content.responsibilities}
      />
      <JobSection title="Requisitos" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button disabled={!isLoggedIn} className={styles.applyButton}>
          {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
        </button>
      </div>
    </div>
  )
}
