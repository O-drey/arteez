import { Router } from "express"

import { artsMethods } from "../controllers/arts.controllers.js"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
// import { artsCollectionsMethods } from "../controllers/collections.controllers.js"
import { PrismaClient } from "@prisma/client"
import { authorsMethods } from "../controllers/authors.controllers.js"
const prisma = new PrismaClient()

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
    console.log(req.body)
    console.log("files : ", req.files)
    const { title, author: authorInfo, annotation, userId } = req.body

    const uploadedUrls = []
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "arteez",
      })
      uploadedUrls.push(result.secure_url)
    }

    console.log("uploadedUrls :", uploadedUrls)
    console.log("filemane :", req.files)
    const [firstname, ...lastname] = authorInfo.split(" ")
    console.log("lastname in root :", lastname)

    const authorLastname = lastname.join()
    console.log("authorLastname in root :", authorLastname)

    let author = await prisma.author.findFirst({
      where: { firstname, lastname: authorLastname || null },
    })
    console.log("author find by firstname : ", author)

    const result = await prisma.$transaction(async (trans) => {
      let authorId

      if (!author) {
        author = await trans.author.create({
          data: { firstname, lastname: authorLastname || null },
        })

        authorId = author.id
      } else {
        authorId = author.id
      }

      const newArt = await trans.arts.create({
        data: {
          title,
          author: { connect: [{ id: authorId }] },
          userId,
          annotation,
          img: uploadedUrls,
        },
      })
      console.log("newArt, :", newArt)

      return { author, art: newArt }
    })

    res.status(201).json(result)
  } catch (error) {
    console.error(error)
    res.json({ message: "Erreur serveur lors de la création de l'œuvre" })
  }
})
// router.post("/", upload.array("imgs", 6), async (req, res) => {
//   try {
//     console.log(req.body)
//     console.log("files : ", req.files)
//     const { title, author: authorInfo, annotation, userId } = req.body

//     const uploadedUrls = []
//     for (const file of req.files) {
//       const result = await cloudinary.uploader.upload(file.path, {
//         folder: "arteez",
//       })
//       uploadedUrls.push(result.secure_url)
//     }

//     console.log("uploadedUrls :", uploadedUrls)
//     console.log("filemane :", req.files)
//     const [firstname, ...lastname] = authorInfo.split(" ")
//     console.log("lastname in root :", lastname)

//     const authorLastname = lastname.join()
//     console.log("authorLastname in root :", authorLastname)

//     let author = await prisma.author.findFirst({
//       where: { firstname },
//     })
//     console.log("author find by firstname : ", author)

//     if (!author && authorLastname.length > 0) {
//       console.log("lastname :", authorLastname)
//       console.log("type of lastname :", typeof authorLastname)
//       const authorLastnameLower = authorLastname.toLowerCase()
//       console.log("authorLastnameLower : ", authorLastnameLower)
//       author = await prisma.author.findFirst({
//         where: { lastname: authorLastnameLower },
//       })

//       console.log("author find by lastname : ", author)
//       return author
//     }

//     if (!author) {
//       const { create } = authorsMethods()
//       author = await create({
//         firstname,
//         lastname: authorLastname,
//         artsId: req.files.filename,
//       })
//       console.log("author Id:", author.id)
//       return author
//     }

//     const newArt = {
//       title,
//       author: author.id,
//       userId,
//       annotation,
//       img: uploadedUrls,
//     }
//     console.log("newArt, :", newArt)
//     const { create } = artsMethods()
//     const data = await create(newArt)
//     console.log(data)
//     res.status(201).json(data)
//   } catch (error) {
//     console.dir(error)
//   }
// })

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
