import { useEffect, useState } from "react"
import { Link } from "react-router"
import { authorsMethods } from "../../fetch/authors"

export function AuthorsListPage() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const { list } = authorsMethods()

  useEffect(() => {
    const getAllAuthors = async () => {
      try {
        const { data } = await list()
        setLoading(false)
        console.log("data :", data)
        setAuthors(data)
        return data
      } catch (err) {
        console.error("Erreur lors du chargement des auteurs", err)
      } finally {
        setLoading(false)
      }
    }
    getAllAuthors()
  }, [])

  if (loading) return <p>Chargement des auteurs…</p>
  return (
    <div>
      {authors.length > 0 ? (
        authors.map((author, index) => (
          <Link key={author.id || index} to={`/author/${author.id}`}>
            {author.firstname} {author.lastname}
          </Link>
        ))
      ) : (
        <p>Il n'y a pas encore d'auteurs</p>
      )}
    </div>
  )
  // return (
  //   <div>

  //     <AddArtPage />
  //   </div>
  // )
}
