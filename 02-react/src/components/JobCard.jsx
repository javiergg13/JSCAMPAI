import { useState } from "react"

export function JobCard({ jobs = [] }) {
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
              <h3>{job.titulo}</h3>
              <small>
                {job.empresa} | {job.ubicacion}
              </small>
              <p>{job.descripcion}</p>
            </div>
            <button
              className={
                isApplied ? "button-apply-job is-applied" : "button-apply-job"
              }
              onClick={() => handleApplyClick(job.id)}
            >
              {isApplied ? "Aplicado" : "Aplicar"}
            </button>
          </article>
        )
      })}
    </div>
  )
}
