import { UIInput } from "../UI/UIInput"
import { UITextarea } from "../UI/UITextarea"
import { UIButton } from "../UI/UIButton"
import { usersHooks } from "../../hooks/usersHooks"
import { userMethods } from "../../fetch/users"
import { useNavigate, useParams } from "react-router"

export const UserSettings = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { userRetrieved } = usersHooks()
  const { user } = userRetrieved(id)

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

  const delAccount = async (formData) => {
    console.log("id from frontend : ", id)
    const deleteAccountInputValue = formData.get("delete-account-input")
    if (!deleteAccountInputValue.match(`Supprimer mon compte ${user.username}`))
      return
    const { del } = userMethods()
    const data = await del(id)
    localStorage.removeItem("Bearer")
    navigate("/")
    return data
  }

  const sections = [
    { value: "edit", title: "Infos personnelles" },
    { value: "delete", title: "Supprimer mon compte" },
  ]
  return (
    <div>
      <h1>Paramètres du compte</h1>
      <nav className="flex items-center gap-8 justify-center my-8">
        {sections.map((section, index) => (
          <a key={index} href={`#${section.value}`}>
            {section.title}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-12">
        <section id="edit" className="py-8 px-8 bg-gray-50 rounded-3xl">
          <h2 className="font-semibold text-2xl mb-4 font-Overlock">
            Informations du profil
          </h2>
          <div>
            <form action={updateUser} className="flex flex-col gap-4">
              <UIInput
                htmlFor="firstname"
                id="firstname"
                name="firstname"
                defaultValue={user.firstname}
                label="Prénom"
              />
              <UIInput
                htmlFor="lastname"
                id="lastname"
                name="lastname"
                defaultValue={user.lastname}
                label="Nom de famille"
              />
              <UIInput
                htmlFor="username"
                id="username"
                name="username"
                defaultValue={user.username}
                label="Nom utilisateur"
              />
              <UIInput
                htmlFor="email"
                id="email"
                name="email"
                defaultValue={user.email}
                label="E-mail"
              />
              <UIInput
                htmlFor="password"
                id="password"
                name="password"
                type="password"
                label="Mot de passe"
              />

              <div className="w-1/2">
                <UITextarea
                  htmlFor="bio"
                  id="bio"
                  name="bio"
                  defaultValue={user.bio}
                  label="Bio"
                  maxLength={250}
                />
              </div>

              <UIButton
                type="submit"
                value="submit"
                label="Modifier mes infos"
                primary
              />
            </form>
          </div>
        </section>
        <section id="delete" className="h-80 py-8 px-8 bg-gray-50 rounded-3xl">
          <h2 className="font-semibold text-2xl mb-4 font-Overlock">
            Zone dangereuse
          </h2>
          <p>
            Veuillez noter que la suppression de votre compte est définitive et
            irréversible. Elle entraînera la perte de toutes vos données. <br />
            Entrez « Supprimer mon compte {user.username} » dans le champ
            ci-dessous.
          </p>
          <form action={delAccount}>
            <UIInput
              label="Supprimer votre compte"
              id="delete-account-input"
              name="delete-account-input"
            />
            <div className="mt-12">
              <UIButton
                type="submit"
                label="Supprimer mon compte"
                destructive
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
