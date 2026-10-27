import express from "express"
import { jobsRouter } from "./routes/jobs.js"
import { corsMiddlewear } from "./middlewares/cors.js"

const PORT = process.env.PORT ?? 1234
const app = express()

app.use(corsMiddlewear())
app.use(express.json())

app.use("/jobs", jobsRouter)

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
  })
}

export default app
