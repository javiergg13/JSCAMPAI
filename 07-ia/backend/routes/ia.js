process.loadEnvFile()

import { Router } from "express"
import { streamText } from "ai"
import rateLimit from "express-rate-limit"
import { JobModel } from "../models/job.js"

export const aiRouter = Router()

const aiRatelimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: { error: "Too many requests from this IP, please try again later." },
  legacyHeaders: false,
  standardHeaders: "draft-8",
})

aiRouter.use(aiRatelimiter)

aiRouter.get("/summary/:id", async (req, res) => {
  const { id } = req.params
  const job = await JobModel.getById(id)

  if (!job) {
    return res.status(404).json({ error: "Job not found" })
  }

  const prompt = [
    `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente.`,
    `Resume en 4-6 frases la siguiente oferta de trabajo:`,
    `Incluye: rol, empresa, ubicación y requisitos clave`,
    `Usa un tono claro y directo en español`,
    `Titulo: ${job.titulo}`,
    `Empresa: ${job.empresa}`,
    `Ubicación: ${job.ubicacion}`,
    `Descripción: ${job.descripcion}`,
  ].join("\n")

  try {
    const result = streamText({
      model: "nvidia/nemotron-3.5-lightning-free",
      prompt,
    })

    res.type("text/plain")
    await result.pipeTextStreamToResponse(res)
  } catch (error) {
    if (!res.headersSent) {
      return res.status(502).json({ error: "Error generating summary" })
    }

    return res.end()
  }
})
