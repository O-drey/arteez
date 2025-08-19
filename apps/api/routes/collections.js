import { Router } from "express"
import { readFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

// Obtenir le chemin du fichier actuel en ES6
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = Router()
// Lire le fichier JSON avec le chemin correct
const { data: collectionsData } = JSON.parse(
  readFileSync(join(__dirname, "../data/collections.json"), "utf8")
)

router.get("/", (req, res) => {
  try {
    const data = res.json(collectionsData)
    return data
  } catch (error) {
    console.dir(error)
  }
})

router.get("/:id", (req, res) => {
  try {
    const collectionId = req.params.id
    const collection = collectionsData.find((u) => u.id === collectionId)

    if (!collection) {
      return res.status(404).json({ error: "Œuvre introuvable" })
    }
    res.json(collection)
  } catch (error) {
    console.dir(error)
  }
})

router.post("/", (req, res) => {
  try {
    const { title, user, isPrivate, cover, arts } = req.body

    const newCollection = {
      id: collectionsData.length + 1,
      title,
      user,
      isPrivate,
      cover,
      arts,
    }

    collectionsData.push(newCollection)
    console.log(collectionsData)
    res.status(201).json(newCollection)
  } catch (error) {
    console.dir(error)
  }
})

export default router
