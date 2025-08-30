import { useEffect, useState } from "react"
import { Link } from "react-router"
import { artsMethods } from "../../fetch/arts"
// import { AddArtPage } from "./AddArtPage"

export function ArtsPage() {
  const [arts, setArts] = useState([])
  const [loading, setLoading] = useState(true)
  const { list } = artsMethods()

  useEffect(() => {
    const getAllArts = async () => {
      try {
        const { data } = await list()
        setLoading(false)
        console.log("data :", data)
        setArts(data)
        return data
      } catch (err) {
        console.error("Erreur lors du chargement des images", err)
      } finally {
        setLoading(false)
      }
    }
    getAllArts()
  }, [])

  if (loading) return <p>Chargement des œuvres…</p>
  return (
    <div>
      {arts.length > 0 ? (
        arts.map((art, index) => (
          <Link key={art.id || index} to={`/art/${art.id}`}>
            <div>
              {art.img.map((img, index) => (
                <img key={index} src={img} />
              ))}
            </div>
          </Link>
        ))
      ) : (
        <p>Il n'y a pas encore d'utilisateurs</p>
      )}
    </div>
  )
  // return (
  //   <div>

  //     <AddArtPage />
  //   </div>
  // )
}
