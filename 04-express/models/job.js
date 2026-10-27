import jobs from "../jobs.json" with { type: "json" }

export class JobModel {
  static async getAll({
    limit = 10,
    offset = 0,
    technology,
    text,
    type,
    level,
  }) {
    let filteredJobs = jobs

    if (text) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(text.toLowerCase()) ||
          job.descripcion.toLowerCase().includes(text.toLowerCase()),
      )
    }

    if (technology) {
      filteredJobs = filteredJobs.filter((job) =>
        job.data.technology.includes(technology.toLowerCase()),
      )
    }

    if (type) {
      filteredJobs = filteredJobs.filter((job) =>
        job.data.modalidad.toLowerCase().includes(type.toLowerCase()),
      )
    }

    if (level) {
      filteredJobs = filteredJobs.filter((job) =>
        job.data.nivel.toLowerCase().includes(level.toLowerCase()),
      )
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    )

    return { paginatedJobs, filteredJobs, limitNumber, offsetNumber }
  }

  static async getById(id) {
    const job = jobs.find((job) => job.id === id)

    return job
  }

  static async create({ titulo, empresa, ubicacion, data }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data,
    }

    jobs.push(newJob)
  }
}
