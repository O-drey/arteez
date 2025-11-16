import { useState, useEffect } from "react"
import { authorsMethods } from "../fetch/authors"

export const authorsHooks = () => {
  const authorsList = () => {
    const [authors, setAuthors] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const { list } = authorsMethods()
        const data = await list()
        console.log(data)
        setAuthors(data || [])
      }
      fetchData()
    }, [])

    return authors
  }

  const authorRetrieved = (id) => {
    const [author, setAuthor] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        const { retrieve } = authorsMethods()
        const data = await retrieve(id)
        console.dir("author : ", data)
        setAuthor(data || {})
      }
      fetchData()
    }, [])

    return author
  }
  return { authorsList, authorRetrieved }
}
