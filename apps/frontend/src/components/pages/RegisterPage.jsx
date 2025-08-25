import { usersHooks } from "../../hooks/usersHooks"
import { userMethods } from "../../fetch/users"
import { redirect } from "react-router"

export function RegisterPage() {
  const { userList } = usersHooks()
  // const { artsList, artRetrieved } = artsHooks()
  // const { collectionsList, collectionRetrieved } = collectionsHooks()
  const { users, loading, error } = userList()

  // const arts = artsList()
  // const art = artRetrieved("art_1")
  // const collections = collectionsList()
  // const collection = collectionRetrieved("collection_1")

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error.message}</p>

  async function createUser(formData) {
    const firstname = formData.get("firstname")
    console.log(firstname)
    const lastname = formData.get("lastname")
    console.log(lastname)

    const username = formData.get("username")
    console.log(username)

    const email = formData.get("email")
    console.log(email)

    const password = formData.get("password")
    console.log(password)

    const newUser = {
      firstname,
      lastname,
      username,
      password,
      email,
    }

    try {
      const { create } = userMethods()
      const data = await create(newUser)
      redirect("/")
      return data
    } catch (err) {
      console.error("Erreur : ", err)
    }
  }
  return (
    <div>
      <h1>Register page</h1>

      <form action={createUser}>
        <label htmlFor="firstname">
          <span>Prénom</span>
          <input name="firstname" id="firstname" type="text" />
        </label>
        <label htmlFor="lastname">
          <span>Nom de famille</span>
          <input name="lastname" id="lastname" type="text" />
        </label>
        <label htmlFor="username">
          <span>Nom utilisateur</span>
          <input name="username" id="username" type="text" />
        </label>
        <label htmlFor="email">
          <span>Email</span>
          <input name="email" id="email" type="text" />
        </label>
        <label htmlFor="password">
          <span>Mot de passe</span>
          <input name="password" id="password" type="text" />
        </label>

        <button type="submit" value="submit">
          Créer mon compte
        </button>
      </form>
    </div>
  )
}
