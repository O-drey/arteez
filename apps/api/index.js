import "dotenv/config"
import express, { json, urlencoded } from "express"
import createError from "http-errors"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
// import { PrismaClient } from "./generated/prisma/index.js"
// import { cloudinaryConnection } from "../api/fetch/fetchCloudinary.js"

import usersRouter from "./routes/users.js"
import artsRouter from "./routes/artworks.js"
import collectionsRouter from "./routes/collections.js"

const app = express()
const port = process.env.LOCAL_API_PORT ?? process.env.NODE_ENV_API_PROD
app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(
  cors({
    origin:
      process.env.NODE_ENV_FRONTEND_LOCAL ?? process.env.NODE_ENV_FRONTEND_PROD,
    credentials: true,
  })
)
app.use(json())
app.use(urlencoded({ extended: false }))

app.use("/users", usersRouter)
app.use("/arts", artsRouter)
app.use("/collections", collectionsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// await cloudinaryConnection

const prisma = new PrismaClient()

async function main() {
  try {
    const allUsers = await prisma.user.findMany()
    console.log("allUsers : ", allUsers)
  } catch (error) {
    console.error("Erreur lors de la création:", error)
  }
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

app.use(function (req, res, next) {
  next(createError(404))
})

export default app
