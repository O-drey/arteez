import { usersHooks } from "../../hooks/usersHooks"
import { userMethods } from "../../fetch/users"
import { redirect } from "react-router"
import { Link } from "react-router"

import loginImg from "../../assets/login_img.webp"
import { useState } from "react"

export function RegisterPage() {
  const [seePassword, setSeePassword] = useState(false)
  const { userList } = usersHooks()
  const { users, loading, error } = userList()

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error.message}</p>

  const labelStyle = "font-semibold flex flex-col gap-2 text-left"

  const handleSeePassword = (e) => {
    e.preventDefault()
    setSeePassword(!seePassword)
  }

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
      email,
      password,
    }

    try {
      if (
        firstname.length === 0 ||
        lastname.length === 0 ||
        username.length === 0 ||
        email.length === 0 ||
        password.length === 0
      ) {
        return
      } else {
        const { create } = userMethods()
        const data = await create(newUser)
        redirect("/")
        return data
      }
    } catch (err) {
      console.error("Erreur : ", err)
    }
  }
  return (
    <div className="flex items-center justify-between">
      <form action={createUser} className="flex flex-col gap-10 text-left">
        <h1>Créez votre compte</h1>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="firstname" className={labelStyle}>
            <span>Prénom</span>
            <input name="firstname" id="firstname" type="text" />
          </label>
          <label htmlFor="lastname" className={labelStyle}>
            <span>Nom de famille</span>
            <input name="lastname" id="lastname" type="text" />
          </label>

          <label htmlFor="username" className={labelStyle}>
            <span>Nom utilisateur</span>
            <input name="username" id="username" type="text" />
          </label>
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="email" className={labelStyle}>
            <span>Email</span>
            <input name="email" id="email" type="text" />
          </label>
          <label htmlFor="password" className={labelStyle}>
            <span>Mot de passe</span>
            <div>
              <input
                name="password"
                id="password"
                type={seePassword ? "text" : "password"}
              />
              <button onClick={handleSeePassword}>Voir le mot de passe</button>
            </div>

            <div>
              Votre mot de passe doit contenir au minimum :
              <ul className="list-disc">
                <li>1 minuscule</li>
                <li>1 Majuscule</li>
                <li>1 chiffre (0-9)</li>
                <li>1 caractère spécial (hors `~)</li>
                <li>12 caractères</li>
              </ul>
            </div>
          </label>
        </fieldset>
        <label htmlFor="accept-terms" className="flex gap-2 items-baseline">
          <input
            type="checkbox"
            name="accept-terms"
            id="accept-terms"
            title="Accepter CGU"
            className="h-4 w-4 checked:accent-pink-500"
          />
          <span className="font-semibold text-gray-500">
            En créant votre compte, vous acceptez les Conditions d’utilisation
            et notre Politique de confidentialité. (obligatoire)
          </span>
        </label>

        <button type="submit" value="submit">
          Créer mon compte
        </button>

        <span>
          Vous avez déjà un compte ?{" "}
          <Link to="/auth/login" className="underline hover:d">
            Connectez-vous
          </Link>
        </span>
      </form>
      <div className="rounded-t-full bg-gray-100 object-cover object-center aspect-2/3 max-w-1/3">
        <img src={loginImg} className="w-full" />
      </div>
    </div>
  )
}
