import { Link } from "react-router"
import { useNavigate } from "react-router"
import { login as loginFetch } from "../../fetch/login"
import { UIInput } from "../UI/UIInput"
import { UIButton } from "../UI/UIButton"
import loginImg from "../../assets/login_img.webp"

export function LoginPage() {
  const navigate = useNavigate()

  async function login(formData) {
    const identifier = formData.get("identifier")
    const password = formData.get("password")

    try {
      if (!identifier || !password) {
        alert("Tous les champs sont obligatoires")
        return
      }

      const payload = { identifier, password }
      console.log("payload", payload)
      const data = await loginFetch(payload)
      console.log("data", data)

      localStorage.setItem("Bearer", data)
      navigate("/")
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
          id="identifier"
          name="identifier"
          label="Nom utilisateur"
          required
        />

        <UIInput
          id="password"
          name="password"
          label="Mot de passe"
          type="password"
          required
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
