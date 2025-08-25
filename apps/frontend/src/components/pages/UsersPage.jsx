import { Link } from "react-router"
import { usersHooks } from "../../hooks/usersHooks"

export const UsersPage = () => {
  const { userList } = usersHooks()
  const { users, loading, error } = userList()

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error.message}</p>

  return (
    <div>
      {users.length > 0 ? (
        users.map((user, index) => (
          <Link key={user.id || index} to={`/user/${user.id}`}>
            <div>
              <span>{user.username}</span>
            </div>
          </Link>
        ))
      ) : (
        <p>Il n'y a pas encore d'utilisateurs</p>
      )}
    </div>
  )
}
