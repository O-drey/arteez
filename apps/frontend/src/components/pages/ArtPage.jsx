import { useParams, useNavigate } from "react-router"
import { artsMethods } from "../../fetch/arts"
import { useEffect, useState } from "react"
import { UIButton } from "../UI/UIButton"

export function ArtPage() {
  const { id } = useParams()
  const [art, setArt] = useState({})
  const [loading, setLoading] = useState(true)
  const { retrieve, del } = artsMethods()
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
  if (loading) return <p>Chargement de l'œuvre</p>
  return (
    <div>
      <h1>{art.title}</h1>
      {art.img.map((img, index) => (
        <div key={index}>
          <img src={img} alt="" />
        </div>
      ))}

      <UIButton label="Supprimer l'œuvre" onClick={handledArtDel} />
    </div>
  )
}
