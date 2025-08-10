import { Router } from "express"
// import { data type json}  from "../data/users.json" 
const router = Router()

export const userMethods = () => {
  const list = () => {
    const data = router.get("/", function (req, res, next) {
      res.json(data)
    })
    return data
  }

  const retrieve = () => {
    const data = router.get("/:id", (req, res) => {
      res.json(req.params.id)
    })

    return data
  }

  const create = ({ firstname, lastname, email, dob, password } = datas) => {
    const data = router.post("/", (req, res) => {
      res.json({
        firstname,
        lastname,
        email,
        dob,
        password,
      })
    })

    return data
  }

  const edit = ({ firstname, lastname, email, dob, password, bio } = datas) => {
    const data = router.patch("/:id", (req, res) => {
      //where userID === currentUserID
      res.json({
        firstname,
        lastname,
        email,
        dob,
        password,
        bio,
      })
    })

    return data
  }
  const del = () => {
    const data = router.delete("/:id", (req, res) => {
      //where userID === currentUserID

      res.json({
        message: "Compte supprimé",
      })
    })

    return data
  }
  return { list, retrieve, create, edit, del }
}

export default router
