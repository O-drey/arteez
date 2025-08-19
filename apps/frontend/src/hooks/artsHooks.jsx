import { useState, useEffect } from "react"
import { artsMethods } from "../fetch/arts"

export const artsHooks = () => {
  const artsList = () => {
    const [arts, setArts] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const { list } = artsMethods()
        const data = await list()
        console.log(data)
        setArts(data || [])
      }
      fetchData()
    }, [])

    return arts
  }

  const artRetrieved = (id) => {
    const [art, setart] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        const { retrieve } = artsMethods()
        const data = await retrieve(id)
        console.dir("art : ", data)
        setart(data || {})
      }
      fetchData()
    }, [])

    return art
  }
  return { artsList, artRetrieved }
}
