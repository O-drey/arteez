import { useNavigate, Link } from "react-router"
import { usersHooks } from "../../hooks/usersHooks"
import { userMethods } from "../../fetch/users"
import { UIInput } from "../UI/UIInput"
import { UIButton } from "../UI/UIButton"
import loginImg from "../../assets/login_img.webp"
import { useState } from "react"

export function RegisterPage() {
  const { userList } = usersHooks()
  const { loading, error } = userList()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error.message}</p>

  const rules = [
    { label: "1 minuscule", test: /[a-z]/ },
    { label: "1 majuscule", test: /[A-Z]/ },
    { label: "1 chiffre (0-9)", test: /\d/ },
    { label: "1 caractère spécial (hors `~)", test: /[^A-Za-z\d`~]/ },
    { label: "12 à 24 caractères", test: /^.{12,24}$/ },
  ]
  const handleOnChange = () => {}
  async function createUser(formData) {
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    console.log(password)
    const isValid = rules.every((rule) => rule.test.test(password))

    if (!isValid) {
      alert("Le mot de passe ne respècete pas les règles")
      return
    }

    try {
      if (!firstname || !lastname || !username || !email || !password) {
        alert("Tous les champs sont obligatoires")
        return
      }

      const { create } = userMethods()
      const data = await create({
        firstname,
        lastname,
        username,
        email,
        password,
      })
      navigate("/")
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
            required
          />
          <UIInput
            id="lastname"
            name="lastname"
            label="Nom de famille"
            htmlFor="lastname"
            required
          />
          <UIInput
            id="username"
            name="username"
            label="Nom utilisateur"
            htmlFor="username"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <UIInput
            id="email"
            name="email"
            label="E-mail"
            htmlFor="email"
            type="email"
            required
          />
          <UIInput
            id="password"
            name="password"
            label="Mot de passe"
            htmlFor="password"
            type="password"
            required
            maxLength={24}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="bg-blue-50 rounded-xl py-6 px-8 font-medium">
            Votre mot de passe doit contenir au minimum :
            {/* <ul className="list-disc">
              <li>1 minuscule</li>
              <li>1 Majuscule</li>
              <li>1 chiffre (0-9)</li>
              <li>1 caractère spécial (hors `~)</li>
              <li>12 caractères</li>
            </ul> */}
            <ul className="list-disc pl-6">
              {rules.map((rule) => {
                const valid = rule.test.test(password)
                return (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-2 ${
                      valid ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {valid ? "✅" : "❌"} {rule.label}
                  </li>
                )
              })}
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

        <UIButton type="submit" value="submit" label="Créer mon compte" />

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
