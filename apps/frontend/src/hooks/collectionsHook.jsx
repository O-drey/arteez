import { useState, useEffect } from "react"
import { collectionsMethods } from "../fetch/collections"

export const collectionsHooks = () => {
  const collectionsList = () => {
    const [collections, setcollections] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const { list } = collectionsMethods()
        const data = await list()
        console.log(data)
        setcollections(data || [])
      }
      fetchData()
    }, [])

    return collections
  }

  const collectionRetrieved = (id) => {
    const [collection, setcollection] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        const { retrieve } = collectionsMethods()
        const data = await retrieve(id)
        console.dir("collection : ", data)
        setcollection(data || {})
      }
      fetchData()
    }, [])

    return collection
  }
  return { collectionsList, collectionRetrieved }
}
