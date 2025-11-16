import { Router } from "express"
import { authorsMethods } from "../controllers/authors.controllers.js"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
  try {
    const { list } = authorsMethods()
    const data = await list()
    res.json({ data })
    return data
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { retrieve } = authorsMethods()
    const data = await retrieve(id)

    if (!data) {
      return res.status(404).json({ message: "L'auteur n'existe pas." })
    }
    res.json({ data })
    return data
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.post("/", async (req, res) => {
  try {
    console.log("API POST author : req.body : ", req.body)
    const { author: authorInfo, artsId } = req.body
    console.log("autour route — authorInfo :", authorInfo)

    if (!author)
      author = await prisma.author.create({
        firstname,
        lastname,
        artsId,
      })

    res.status(201).json(author)
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const { update } = authorsMethods()
    const data = await update(req.body)
    console.log(data)
    res.json(data)
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.delete("/:id", async (req, res) => {
  console.log("req.params.id :", req.params.id)
  const { id } = req.params

  try {
    const { del } = authorsMethods()
    const data = del(id)
    console.log("data", data)
    res.json({ message: "Auteur supprimé !", data })
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

export default router
