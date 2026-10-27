import { Router } from "express"
import { JobsController } from "../controllers/jobs.js"
import { validateJob, validatePartialJob } from "../schemas/jobs.js"

export const jobsRouter = Router()

jobsRouter.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  })
})

function validateCreate(req, res, next) {
  const result = validateJob(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  req.body = result.data
  next()
}

jobsRouter.get("/", JobsController.getAll)
jobsRouter.get("/:id", JobsController.getById)
jobsRouter.post("/", validateCreate, JobsController.create)
