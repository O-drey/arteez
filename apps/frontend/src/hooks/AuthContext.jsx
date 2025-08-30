import { createContext, useContext, useState, useEffect } from "react"
import { userMethods } from "../fetch/users"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("Bearer")
    const storedUserId = localStorage.getItem("user_id")

    if (storedToken && storedUserId) {
      setToken(storedToken)

      const fetchUser = async () => {
        const { retrieve } = userMethods()
        const { data } = await retrieve(storedUserId)
        setUser(data)
      }
      fetchUser()
    }
  }, [])

  const login = async (newToken, userId) => {
    localStorage.setItem("Bearer", newToken)
    localStorage.setItem("user_id", userId)
    setToken(newToken)

    try {
      const { retrieve } = userMethods()
      const { data } = await retrieve(userId)
      setUser(data)
    } catch (err) {
      console.error("erreur lors du fetch de l'utilisateur", err)
    }
  }

  const logout = () => {
    localStorage.removeItem("Bearer")
    localStorage.removeItem("user_id")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider.")
  return context
}
