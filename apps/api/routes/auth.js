import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const router = Router()
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
  try {
    console.log("req.body :", req.body)
    const { identifier, password } = req.body

    let user = await prisma.user.findUnique({
      where: { username: identifier },
    })
    console.log("user find by username : ", user)

    if (!user) {
      const emailLower = identifier.toLowerCase()
      console.log("emailLower : ", emailLower)
      user = await prisma.user.findUnique({
        where: { email: emailLower },
      })

      console.log("user find by email : ", user)
    }

    if (!user)
      res.json({
        message:
          "Ce compte n'existe pas, vérifiez vos informations ou créez votre compte.",
      })
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      console.log("Identifiants incorrectes. Vérifiez vos informations.")
      res.json({
        message: "Identifiants incorrectes. Vérifiez vos informations.",
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log("Mot de passe incorrect.")
      return null
    }

    console.log("Connexion réussie :", user.email)
    const token = "123456azerty"
    res.json({ token, userId: user.id })
    const auth = (req.headers.authorization = `Bearer ${token}`)
    return { auth, user: user.id }
  } catch (err) {
    console.error("Erreur lors de la connexion :", err)
    throw err
  }
})

export default router
