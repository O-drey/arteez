import { Link, useParams } from "react-router"
import { authorsMethods } from "../../fetch/authors"
import { useEffect, useState } from "react"

export function AuthorPage() {
  const { id } = useParams()
  const [author, setAuthor] = useState({})
  const [loading, setLoading] = useState(true)
  const { retrieve } = authorsMethods()

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const { data } = await retrieve(id)
        setLoading(false)
        console.log(data)
        setAuthor(data)
      } catch (err) {
        console.error("Erreur lors du chargement de l'œuvre :", err)
      } finally {
        setLoading(false)
      }
    }

    getAuthor()
  }, [id])

  if (loading) return <p>Chargement de l'œuvre</p>
  return (
    <div>
      <h1>
        {author.firstname} {author.lastname}
      </h1>

      <h2>Bio</h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
        {author.artsId.map((art, index) => (
          <div key={index}>
            <Link to={`/art/${art}`}>{art}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
