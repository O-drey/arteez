import "dotenv/config"
import express, { json, urlencoded } from "express"
import createError from "http-errors"
import { v2 as cloudinary } from "cloudinary"
import cors from "cors"

// import usersRouter from "./routes/users.js"
import { userMethods } from "./routes/users.js"

const app = express()
const port = process.env.SERVER_LOCAL_PORT ?? 4000
app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(
  cors({
    origin: process.env.PORT_FRONTEND_DEV ?? FRONTEND_PROD,
    credentials: true,
  })
)
app.use(json())
app.use(urlencoded({ extended: false }))

app.use("/users", userMethods)
app.use(function (req, res, next) {
  next(createError(404))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
;(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  })
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      }
    )
    .catch((error) => {
      console.log(error)
    })

  console.log(uploadResult)

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  })

  console.log(optimizeUrl)

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  })

  console.log(autoCropUrl)
})()

export default app