import { JobModel } from "../models/job.js"

export class JobsController {
  static async getAll(req, res) {
    const { limit = 10, offset = 0, technology, text, type, level } = req.query
    const { paginatedJobs, filteredJobs, limitNumber, offsetNumber } =
      await JobModel.getAll({
        limit,
        offset,
        technology,
        text,
        type,
        level,
      })

    return res.json({
      data: paginatedJobs,
      total: filteredJobs.length,
      limit: limitNumber,
      offset: offsetNumber,
    })
  }

  static async getById(req, res) {
    const { id } = req.params
    const job = await JobModel.getById(id)

    if (!job) return res.status(404).json({ error: "Job not found" })

    return res.json(job)
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body
    const newJob = await JobModel.create({ titulo, empresa, ubicacion, data })

    return res.status(201).json(newJob)
  }
}
