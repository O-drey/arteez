import { useState, useEffect } from "react"
import { userMethods } from "../fetch/users"

export const usersHooks = () => {
  const userList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const { list } = userMethods()
          const { data } = await list()
          setUsers(data || [])
        } catch (err) {
          console.error("Erreur lors du fetch", err)
          setError(err)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [])

    return { users, loading, error }
  }

  const userRetrieved = (id) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const { retrieve } = userMethods()
          const { data } = await retrieve(id)
          setUser(data || {})
        } catch (err) {
          console.error("Erreur lors du chargement de l'utilisateur", err)
          setError(err)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [id])

    return { user, loading, error }
  }

  return { userList, userRetrieved }
}
