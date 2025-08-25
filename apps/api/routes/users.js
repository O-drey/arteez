import { Router } from "express"
import { usersMethods } from "../controllers/users.controllers.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const { list } = usersMethods()
    const data = await list()
    res.json({ data })
    return data
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { retrieve } = usersMethods()
    const data = await retrieve(id)

    if (!data) {
      return res.status(404).json({ message: "Utilisateur introuvable" })
    }
    res.json({ data })
    return data
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.post("/", async (req, res) => {
  try {
    console.log("API POST users : req.body : ", req.body)
    const { firstname, lastname, username, email, password } = req.body

    const newUser = {
      firstname,
      lastname,
      username,
      email,
      password,
    }

    const { create } = usersMethods()
    const data = await create(newUser)
    res.status(201).json(data)
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const { update } = usersMethods()
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
    const { del } = usersMethods()
    const data = del(id)
    console.log("data", data)
    res.json({ message: "Utilisateur supprimé !", data })
  } catch (error) {
    console.dir(error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

export default router
