import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.post("/", (req, res) => {
  const credentials = req.headers.authorization
  const [username, password] = credentials.split(":")

  const checkUser = prisma.user.findFirst({ where: username, password })

  if (!checkUser)
    res.json({
      message:
        "Ce compte n'existe pas, vérifiez vos informations ou créez votre compte.",
    })

  const token = "123456azerty"
  req.headers.authorization = `Bearer ${token}`
})
