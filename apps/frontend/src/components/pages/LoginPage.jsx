import { Link } from "react-router"
import { redirect } from "react-router"
import loginImg from "../../assets/login_img.webp"
import { useState } from "react"

export function LoginPage() {
  const [seePassword, setSeePassword] = useState(false)

  const handleSeePassword = (e) => {
    e.preventDefault()
    setSeePassword(!seePassword)
  }

  const labelStyle = "font-semibold flex flex-col gap-2 text-left"

  async function login(formData) {
    const username = formData.get("username")
    console.log(username)

    const email = formData.get("email")
    console.log(email)

    const password = formData.get("password")
    console.log(password)

    // const newUser = {
    //   username,
    //   password,
    //   email,
    // }

    try {
      localStorage.setItem("Bearer", "123_456")
      redirect("/")
    } catch (err) {
      console.error("Erreur : ", err)
    }
  }
  return (
    <div className="flex justify-between items-center">
      <form
        action={login}
        className="border-2 bg-pink-50 p-6 flex flex-col gap-8 rounded-2xl max-w-1/2"
      >
        <h1>Connectez-vous</h1>

        <label htmlFor="username" className={labelStyle}>
          <span>Nom utilisateur</span>
          <input name="username" id="username" type="text" />
        </label>

        <label htmlFor="password" className={labelStyle}>
          <span>Mot de passe</span>
          <input
            name="password"
            id="password"
            type={seePassword ? "password" : "text"}
          />
          <button onClick={handleSeePassword}>Voir le mot de passe</button>
        </label>

        <button
          type="submit"
          value="submit"
          className="primary-500 p-20 bg-pink-700 text-white"
        >
          Connexion
        </button>

        <span>
          Vous n’avez pas encore de compte ?{" "}
          <Link to="/auth/register" className="underline">
            Créez-le
          </Link>
        </span>
      </form>
      <div className="rounded-t-full bg-gray-100 object-cover object-center aspect-2/3 max-w-1/3">
        <img src={loginImg} className="w-full" />
      </div>
    </div>
  )
}
