import { useParams, useNavigate, Link } from "react-router"
import { artsMethods } from "../../fetch/arts"
import { useEffect, useState } from "react"
import { UIButton } from "../UI/UIButton"
import { UIInput } from "../UI/UIInput"
import { useAuth } from "../../hooks/AuthContext"
import { useSearchAuthor } from "../../hooks/useSearch"

export function ArtPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [art, setArt] = useState({})
  const [loading, setLoading] = useState(true)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [author, setAuthor] = useState(art.authorId)
  const { retrieve, del, update } = artsMethods()
  const navigate = useNavigate()

  useEffect(() => {
    const getArt = async () => {
      try {
        const { data } = await retrieve(id)
        setLoading(false)
        console.log(data)
        setArt(data)
      } catch (err) {
        console.error("Erreur lors du chargement de l'œuvre :", err)
      } finally {
        setLoading(false)
      }
    }

    getArt()
  }, [id])

  const handledArtDel = async () => {
    try {
      const { data } = await del(id)
      console.log(data)
      navigate("/arts")
    } catch (err) {
      console.error("Erreur lors de la suppression de l'œuvre :", err)
    }
  }
  const { authorList, searchAuthorError } = useSearchAuthor(author)

  useEffect(() => {
    const handleAuthorSearch = async (e) => {
      if (searchAuthorError) <p>{searchAuthorError}</p>
      setAuthor(e)
      return authorList
    }

    handleAuthorSearch(author)
  }, [author])

  const handledArtUpdate = async (e) => {
    if (!user) return
    e.preventDefault()
    const formData = new FormData(e.target)

    const updatedTitle = formData.get("update-title")
    const updatedAuthor = formData.get("update-author")
    const updatedAnnotation = formData.get("update-annotation")

    try {
      const { data } = await update(id, {
        id,
        author: [updatedAuthor] || [art.authorId],
        title: updatedTitle,
        annotation: updatedAnnotation,
      })
      console.log(data)
      navigate("/arts")
    } catch (err) {
      console.error("Erreur lors de la suppression de l'œuvre :", err)
    }
  }
  if (loading) return <p>Chargement de l'œuvre</p>
  return (
    <div>
      <h1>{art.title}</h1>
      {art.img.map((img, index) => (
        <div key={index}>
          <img src={img} alt="" />
        </div>
      ))}
      {art.authorId.map((author, index) => (
        <div key={author || index}>
          <Link to={`/author/${author}`}>{author}</Link>
        </div>
      ))}

      <p>{art.annotation}</p>
      {showUpdateForm && (
        <form onSubmit={handledArtUpdate}>
          <UIInput label="Titre" name="update-title" defaultValue={art.title} />
          <UIInput
            label="Auteur"
            name="update-author"
            defaultValue={art.authorId}
            value={author}
            // onChange={(e) => setAuthor(e.target.value)}
          />
          {/* <div>
            {authorList.map((el, index) => (
              <div key={index}>{el}</div>
            ))}
          </div> */}
          <UIInput
            label="Annotation"
            name="update-annotation"
            defaultValue={art.annotation}
          />

          <UIButton label="Valider" variant="neutral" type="submit" />
        </form>
      )}

      <UIButton label="Supprimer l'œuvre" onClick={handledArtDel} />
      {user && (
        <UIButton
          label="Modifier"
          variant="neutral"
          onClick={() => setShowUpdateForm(!showUpdateForm)}
        />
      )}
    </div>
  )
}
