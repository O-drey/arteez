import { Link } from "react-router"
import { redirect } from "react-router"
import { UIInput } from "../UI/UIInput"
import loginImg from "../../assets/login_img.webp"
import { UIButton } from "../UI/UIButton"

export function LoginPage() {
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
      if (!username || !password) return
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
        className="bg-pink-50 p-6 flex flex-col gap-8 rounded-2xl max-w-1/2"
      >
        <h1>Connectez-vous</h1>

        <UIInput
          id="username"
          name="username"
          label="Nom utilisateur"
          type="email"
        />
        <UIInput
          id="password"
          name="password"
          label="Mot de passe"
          type="password"
        />

        <UIButton type="submit" value="submit" label="Connexion" primary />

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
