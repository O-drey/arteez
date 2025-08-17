import { Router } from "express"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Obtenir le chemin du fichier actuel en ES6
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = Router()
// Lire le fichier JSON avec le chemin correct
const { data: usersData } = JSON.parse(
  readFileSync(join(__dirname, "../data/users.json"), "utf8")
)

router.get("/", (req, res) => {
  try {
    const data = res.json(usersData)
    return data
  } catch (error) {
    console.dir(error)
  }
})

router.get("/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const user = usersData.find((u) => u.id === userId)

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" })
    }
    res.json(user)
  } catch (error) {
    console.dir(error)
  }
})

router.post("/", (req, res) => {
  try {
    const { firstname, lastname, username, email, password, dob } = req.body

    const newUser = {
      id: usersData.length + 1,
      firstname,
      lastname,
      username,
      email,
      password,
      dob,
      favorite_artworks: [],
    }
    
    usersData.push(newUser)
    console.log(usersData)
    res.status(201).json(newUser)

  } catch (error) {
    console.dir(error)
  }
})

export default router
