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
import loginRouter from "./routes/auth.js"

const app = express()
const port = process.env.PORT || 4000
app.get("/", (req, res) => {
  res.send("Hello World!")
})

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true)

//     const allowedPatterns = [
//       /^https:\/\/arteez-frontend.*\.vercel\.app$/,
//       /^http:\/\/localhost:\d+$/,
//     ]

//     const isAllowed = allowedPatterns.some((pattern) => pattern.test(origin))
//     callback(null, isAllowed)
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Accept",
//     "Access-Control-Allow-Origin",
//   ],
// }

const corsOptions = {
  origin: function (origin, callback) {
    console.log("CORS origin: ", origin)
    if (!origin) return callback(null, true)

    const allowed = [
      process.env.NODE_ENV_FRONTEND_PROD,
      process.env.NODE_ENV_FRONTEND_LOCAL,
    ]

    // Check exact matches
    if (allowed.includes(origin)) return callback(null, true)

    // Check preview pattern
    if (/^https:\/\/arteez-frontend.*\.vercel\.app$/.test(origin)) {
      return callback(null, true)
    }

    callback(null, false)
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}
// const corsOptions = {
//   origin: [
//     process.env.NODE_ENV_FRONTEND_LOCAL,
//     process.env.LOCAL_API_URL,
//     process.env.NODE_ENV_FRONTEND_PROD,
//     "https://arteez-frontend-*.vercel.app",
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization", "Accept"],
// }

app.use(cors(corsOptions))
app.use(json())
app.use(urlencoded({ extended: false }))

app.use("/users", usersRouter)
app.use("/arts", artsRouter)
app.use("/collections", collectionsRouter)
app.use("/login", loginRouter)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
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
    // await prisma.$disconnect()
  })

app.use(function (req, res, next) {
  next(createError(404))
})

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`✅ API running locally on http://localhost:${port}`)
  })
}

export default app
