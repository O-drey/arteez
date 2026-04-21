import { json, Router } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const router = Router()
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
  try {
    console.log("req.body :", req.body)
    const { identifier, password } = req.body

    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifiants requis" })
    }

    let user = await prisma.user.findUnique({
      where: { username: identifier },
    })
    console.log("user find by username : ", user)

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: identifier.toLowerCase() },
      })
      console.log("user find by email : ", user)
    }

    if (!user)
      res.status(404).json({
        message:
          "Ce compte n'existe pas, vérifiez vos informations ou créez votre compte.",
      })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Identifiants incorrectes. Vérifiez vos informations.",
      })
    }

    console.log("Connexion réussie :", user.email)
    const token = process.env.TOKEN
    res.json({ token, userId: user.id })
    const auth = (req.headers.authorization = `Bearer ${token}`)
    return { auth, user: user.id }
  } catch (err) {
    return res.status(500).json({ "Erreur server": err })
  }
})

export default router
