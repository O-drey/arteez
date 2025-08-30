import { UIButton } from "../UI/UIButton"
import { UIInput } from "../UI/UIInput"
import { createClient } from "pexels"
import { artsMethods } from "../../fetch/arts"
import { useAuth } from "../../hooks/AuthContext"
import { UITextarea } from "../UI/UITextarea"
import axios from "axios"

export const AddArtPage = () => {
  const { user } = useAuth()
  console.log("user : ", user)
  // async function handleArtURLSumit(e) {
  //   e.preventDefault()

  //   const formData = new FormData(e.target)
  //   console.log("formData", formData)
  //   const input = formData.get("image_url_search")
  //   console.log("input serach url", input)

  //   const fetchImgURL = (url) => {
  //     try {
  //       const client = createClient(import.meta.env.VITE_PEXELS_KEY)

  //       if (input.includes("pexels"))
  //         fetch(url, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: client,
  //           },
  //         })
  //       // const data = httpServer.get(url)
  //       console.log(data)
  //       return data
  //     } catch (error) {
  //       console.error("Erreur : ", error)
  //     }
  //   }

  //   fetchImgURL(input)
  // }

  async function handleArtUploadSubmit(e) {
    if (!user) return
    e.preventDefault()
    // const { create } = artsMethods()
    const formData = new FormData(e.target)
    // const input = formData.get("uploaded_imgs")
    const uploadedImgs = formData.getAll("uploaded_imgs")

    const title = formData.get("uploaded_imgs_title")
    const author = formData.get("uploaded_imgs_author")
    const annotation = formData.get("uploaded_imgs_annotation")
    console.log("input uploaded_imgs", uploadedImgs)

    const data = new FormData()
    uploadedImgs.forEach((file) => data.append("imgs", file)) // fichiers bruts
    data.append("title", title)
    // data.append("author", author)
    data.append("annotation", annotation)
    data.append("userId", user.id)

    // const { data } = create(newArt)
    const res = await axios.post("http://localhost:3000/arts", data)
    console.log("res:", res.data)
    console.log("data create art: ", data)
    // return data
  }

  return (
    <div>
      <div>
        <h1 className="mb-8">Ajoutez une œuvre</h1>
        {/* <div className="py-8 px-6 border rounded-2xl">
          <h2 className="text-center font-semibold text-3xl mb-4">
            Recherchez l’image via son URL
          </h2>
          <div className="bg-gray-200 rounded-2xl grid grid-cols-2 gap-4 p-6">
            <form onSubmit={handleArtURLSumit}>
              <h3 className="font-semibold text-2xl">
                Collez l’URL de l’image
              </h3>
              <p className="">
                Choisissez une ou plusieurs images et collez leur lien dans une
                barre de recherche. Vous pouvez ajouter jusqu’à 6 images en
                modifiant manuellement.
              </p>
              <div className="inline-flex max-w-full w-full">
                <UIInput
                  type="search"
                  name="image_url_search"
                  id="image_url_search"
                />
                <UIButton type="submit" label="Chercher" />
              </div>
            </form>
            <div className="bg-gray-400 aspect-auto rounded-2xl">
            </div>
          </div>
        </div> */}
        <div className="py-8 px-6 border rounded-2xl">
          <h2 className="text-center font-semibold text-3xl mb-4">
            Chargez une image
          </h2>
          <div>
            <h3>Collez l’URL de l’image.</h3>

            <form onSubmit={handleArtUploadSubmit}>
              <UIInput
                type="file"
                accept=".png, .jpeg, .jpg, .webp"
                name="uploaded_imgs"
                multiple
              />
              <UIInput name="uploaded_imgs_title" label="Titre" />
              <UIInput name="uploaded_imgs_author" label="Auteurice" />
              <UITextarea
                name="uploaded_imgs_annotation"
                label="Pourquoi vous aimez cette œuvre ? Qu’est-ce qui a retenu votre attention ?"
              />
              <UIButton type="submit" label="Chercher" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
