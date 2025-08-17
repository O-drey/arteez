import { useState, useEffect } from "react"
import { userMethods } from "../fetch/users"

export const usersHooks = () => {
  const userList = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const { list } = userMethods()
        const data = await list()
        console.log(data)
        setUsers(data || [])
      }
      fetchData()
    }, [])

    return users
  }

  const userRetrieved = (id) => {
    const [user, setUser] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        const { retrieve } = userMethods()
        const data = await retrieve(id)
        console.dir("user : ", data)
        setUser(data || {})
      }
      fetchData()
    }, [])

    return user
  }
  return { userList, userRetrieved }
}
