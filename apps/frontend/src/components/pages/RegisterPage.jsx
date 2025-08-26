import { usersHooks } from "../../hooks/usersHooks"
import { useState } from "react"
import { userMethods } from "../../fetch/users"
import { redirect } from "react-router"
import { Link } from "react-router"
import { UIInput } from "../UI/UIInput"
import loginImg from "../../assets/login_img.webp"

export function RegisterPage() {
  const { userList } = usersHooks()
  const { loading, error } = userList()

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
      email,
      password,
    }

    try {
      if (!firstname || !lastname || !username || !email || !password) return

      const { create } = userMethods()
      const data = await create(newUser)
      redirect("/")
      return data
    } catch (err) {
      console.error("Erreur : ", err)
    }
  }
  return (
    <div className="flex items-start justify-between">
      <form action={createUser} className="flex flex-col gap-10 max-w-1/2">
        <h1>Créez votre compte</h1>
        <fieldset className="flex flex-col gap-4">
          <UIInput
            id="firstname"
            name="firstname"
            label="Prénom"
            htmlFor="firstname"
          />
          <UIInput
            id="lastname"
            name="lastname"
            label="Nom de famille"
            htmlFor="lastname"
          />
          <UIInput
            id="username"
            name="username"
            label="Nom utilisateur"
            htmlFor="username"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <UIInput id="email" name="email" label="E-mail" htmlFor="email" />
          <UIInput
            id="password"
            name="password"
            label="Mot de passe"
            htmlFor="password"
            type="password"
          />

          <div className="bg-blue-50 rounded-xl py-6 px-8">
            Votre mot de passe doit contenir au minimum :
            <ul className="list-disc">
              <li>1 minuscule</li>
              <li>1 Majuscule</li>
              <li>1 chiffre (0-9)</li>
              <li>1 caractère spécial (hors `~)</li>
              <li>12 caractères</li>
            </ul>
          </div>
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
