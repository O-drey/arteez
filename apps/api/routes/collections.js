import { Router } from "express"
import { artsCollectionsMethods } from "../controllers/collections.controllers.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const { list } = artsCollectionsMethods()
    const data = await list()
    console.log("GET all arts collections", data)
    res.json(data)
    return data
  } catch (error) {
    console.dir(error)
  }
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  try {
    const { retrieve } = artsCollectionsMethods()
    const data = retrieve(id)
    if (!data) {
      return res.status(404).json({ error: "Œuvre introuvable" })
    }

    console.log("GET art collection", data)
    res.json(data)
  } catch (error) {
    console.dir(error)
  }
})

router.post("/", async (req, res) => {
  try {
    const { title, user, isPrivate, cover, arts } = req.body

    const newCollection = {
      title,
      user,
      isPrivate,
      cover,
      arts,
    }

    const { create } = artsCollectionsMethods()
    const data = await create(newCollection)
    console.log(data)
    res.status(201).json(data)
  } catch (error) {
    console.dir(error)
  }
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const { title, cover, arts, isPrivate } = req.body

    const collectionUpdates = {
      title,
      cover,
      arts,
      isPrivate,
    }

    const { update } = artsMethods()
    const data = await update({ ...collectionUpdates, id })
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
    const { del } = artsCollectionsMethods()
    const data = del(id)
    console.log("collection supprimée")
    res.json({ message: "Collection supprimée !", data })
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

export default router
