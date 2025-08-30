import { Router } from "express"

import { artsMethods } from "../controllers/arts.controllers.js"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
// import { artsCollectionsMethods } from "../controllers/collections.controllers.js"
// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
})

const upload = multer({ dest: "uploads/" })

router.post("/", upload.array("imgs", 6), async (req, res) => {
  try {
    console.log(req)
    console.log("files : ", req.files)
    const { title, author, annotation } = req.body

    const uploadedUrls = []
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "arteez",
      })
      uploadedUrls.push(result.secure_url)
    }

    const newArt = {
      title,
      // author,
      annotation,
      img: uploadedUrls,
    }
    const { create } = artsMethods()
    const data = await create(newArt)
    // const { retrieve, create: createCollection } = artsCollectionsMethods()
    // const addAuthor = await prisma.artsCollections.findUnique({ where: { firstname:authorFirstname } })
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
