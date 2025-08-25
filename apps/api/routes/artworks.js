import { Router } from "express"

import { artsMethods } from "../controllers/arts.controllers.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const { list } = artsMethods()
    const data = await list()
    res.json(data)
  } catch (error) {
    console.dir(error)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { retrieve } = artsMethods()
    const data = await retrieve(id)
    if (!data) {
      return res.status(404).json({ error: "Œuvre introuvable" })
    }
    res.json(data)
  } catch (error) {
    console.dir(error)
  }
})

router.post("/", async (req, res) => {
  try {
    const { title, author, date, annotation, imgs } = req.body

    const newArt = {
      title,
      author,
      date,
      annotation,
      imgs,
    }

    const { create } = artsMethods()
    const data = await create(newArt)
    console.log(data)
    res.status(201).json(data)
  } catch (error) {
    console.dir(error)
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const { update } = artsMethods()
    const data = await update(req.body)
    console.log(data)
    res.json(data)
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const { del } = artsMethods()
    const data = del(id)
    console.log("œuvre supprimée")
    res.json({ message: "œuvre supprimée !", data })
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

export default router
