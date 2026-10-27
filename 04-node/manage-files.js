import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const content = await readFile("archivo.txt", "utf-8")
console.log(content)

const outputDir = join("output", "files", "documents")
await mkdir(outputDir, { recursive: true })

const uperCaseContent = content.toUpperCase()
const outputFilePath = join(outputDir, " archivo-uppercase.txt")

await writeFile(outputFilePath, uperCaseContent)
