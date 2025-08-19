import "dotenv/config"
import express, { json, urlencoded } from "express"
import createError from "http-errors"
import cors from "cors"
// import { MongoClient, ServerApiVersion } from "mongodb"
import { PrismaClient } from "./generated/prisma/index.js"
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

const uri = process.env.MONGO_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// })

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect()
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 })
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     )
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }
// run().catch(console.dir)

const prisma = new PrismaClient()

async function main() {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: "rich@prisma.com" },
    })

    if (existingUser) {
      console.log("Utilisateur existe déjà:", existingUser)
      return
    }

    await prisma.user.create({
      data: {
        firstname: "Rich",
        lastname: "Dupont",
        email: "rich@prisma.com",
        password: "123abc",
        username: "rich_rich",
        bio: "Hello je suis Rich… et pauvre.",
      },
    })
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
