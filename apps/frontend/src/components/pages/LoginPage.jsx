import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { login as loginFetch } from "../../fetch/login"
import { useAuth } from "../../hooks/AuthContext"
import { UIInput } from "../UI/UIInput"
import { UIButton } from "../UI/UIButton"
import loginImg from "../../assets/login_img.webp"

export function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLoginSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const identifier = formData.get("identifier")
    const password = formData.get("password")

    if (!identifier || !password) {
      alert("Tous les champs sont obligatoires")
      return
    }

    try {
      setLoading(true)

      const payload = { identifier, password }
      const { token, userId } = await loginFetch(payload)
      await login(token, userId)

      navigate("/")
    } catch (err) {
      console.error("Erreur : ", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-between items-center">
      <form
        onSubmit={handleLoginSubmit}
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

        <UIButton type="submit" value="submit" label="Connexion" />

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
