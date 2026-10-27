import { useState } from "react"
import { Link } from "./Link"
import styles from "./JobCard.module.css"

import { useAuthStore } from "../store/authStore"
import { JobCardFavoriteButton } from "./JobCardFavoriteButton"

export function JobCard({ jobs = [] }) {
  const { isLoggedIn } = useAuthStore()
  const [appliedJobs, setAppliedJobs] = useState({})

  const handleApplyClick = (jobId) => {
    setAppliedJobs((current) => ({
      ...current,
      [jobId]: !current[jobId],
    }))
  }

  return (
    <div className="jobs-listings">
      {jobs.length === 0 && (
        <p
          style={{ textAlign: "center", padding: "1rem", textWrap: "balance" }}
        >
          No se encontraron resultados
        </p>
      )}

      {jobs.map((job) => {
        const isApplied = Boolean(appliedJobs[job.id])

        return (
          <article key={job.id} className="job-listing-card">
            <div>
              <h3>
                <Link className={styles.title} href={`/jobs/${job.id}`}>
                  {job.titulo}
                </Link>
              </h3>
              <small>
                {job.empresa} | {job.ubicacion}
              </small>
              <p>{job.descripcion}</p>
            </div>
            <div className={styles.actions}>
              <button
                disabled={!isLoggedIn}
                className={
                  isApplied ? "button-apply-job is-applied" : "button-apply-job"
                }
                onClick={() => handleApplyClick(job.id)}
              >
                {isLoggedIn
                  ? isApplied
                    ? "Aplicado"
                    : "Aplicar"
                  : "Inicia sesión para aplicar"}
              </button>

              {isLoggedIn && (
                <JobCardFavoriteButton jobId={job.id} isLoggedIn={isLoggedIn} />
              )}

              <Link className={styles.details} href={`/jobs/${job.id}`}>
                Ver detalles
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}
