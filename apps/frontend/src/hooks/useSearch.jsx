import { useEffect, useState } from "react"
import { authorsHooks } from "./useAuthorHooks"

export const useSearchAuthor = (query = "") => {
  const [serchTerm, setSearchTerm] = useState("")
  const [authorList, setAuthorList] = useState([])
  const [searchAuthorError, setSearchAuthorError] = useState("")
  const [isSearchAuthorLoading, setIsSearchAuthorLoading] = useState(false)
  const { authorsList } = authorsHooks()
  const { data: authors } = authorsList()

  const fetchAuthor = async () => {
    setIsSearchAuthorLoading(true)
    console.log("useSearchAuthor — authors : ", authors)
    try {
      if (!authors) {
        setAuthorList([])
        throw new Error("Erreur lors du chargement des auteurs")
      }
      setSearchTerm(authors.find(query))
      console.log("useSearchAuthor — setSearchTerm : ", authors)
      setAuthorList(authors)
      return authors
    } catch (error) {
      console.error(`Erreur lors du chargement des auteurs : ${error}`)
      setSearchAuthorError("Erreur lors du chargement des auteurs")
    } finally {
      setIsSearchAuthorLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthor(serchTerm)
  }, [serchTerm])

  return { setSearchTerm, authorList, searchAuthorError, isSearchAuthorLoading }
}
