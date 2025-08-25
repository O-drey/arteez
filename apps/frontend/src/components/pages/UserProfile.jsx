import { useParams } from "react-router"
import { usersHooks } from "../../hooks/usersHooks"
import { userMethods } from "../../fetch/users"

export const UserProfile = () => {
  const { id } = useParams()
  const { userRetrieved } = usersHooks()
  const { user, loading: userLoading, error: userError } = userRetrieved(id)

  if (userLoading) return <p>Chargement de l'utilisateur…</p>
  if (userError) return <p>Erreur : {error.message}</p>
  if (!user) return <p>Utilisateur non trouvé</p>

  async function updateUser(formData) {
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const bio = formData.get("bio")

    const userUpdates = {
      id,
      firstname,
      lastname,
      username,
      password,
      email,
      bio,
    }

    try {
      const { update } = userMethods()
      const data = await update(userUpdates)
      console.log("data : ", data)

      return data
    } catch (err) {
      console.error("Erreur : ", err)
    }
  }

  const delAccount = async () => {
    console.log("id from frontend : ", id)
    const { del } = userMethods()
    const data = await del(id)
    return data
  }
  return (
    <div>
      <h1>Profil de {user.username}</h1>
      <span>{`${user.firstname} ${user.lastname}`}</span>
      <span>{user.email}</span>
      <p>{user.bio}</p>

      <form action={updateUser}>
        <label htmlFor="firstname">
          <span>Prénom</span>
          <input
            name="firstname"
            id="update-firstname"
            type="text"
            defaultValue={user.firstname}
          />
        </label>
        <label htmlFor="lastname">
          <span>Nom de famille</span>
          <input
            name="lastname"
            id="update-lastname"
            type="text"
            defaultValue={user.lastname}
          />
        </label>
        <label htmlFor="username">
          <span>Nom utilisateur</span>
          <input
            name="username"
            id="update-username"
            type="text"
            defaultValue={user.username}
          />
        </label>
        <label htmlFor="email">
          <span>Email</span>
          <input
            name="email"
            id="update-email"
            type="text"
            defaultValue={user.email}
          />
        </label>
        <label htmlFor="password">
          <span>Mot de passe</span>
          <input
            name="password"
            id="update-password"
            type="text"
            defaultValue={user.password}
          />
        </label>
        <label htmlFor="bio">
          <span>Bio</span>
          <input name="bio" id="bio" type="text" defaultValue={user.bio} />
        </label>

        <button type="submit" value="submit">
          Modifier mes infos
        </button>
      </form>

      <div style={{ marginTop: "48px" }}>
        <button type="button" onClick={delAccount}>
          Supprimer mon compte
        </button>
      </div>
    </div>
  )
}
