import { Link } from "react-router"
import { UIButton } from "./UIButton"
import { useAuth } from "../../hooks/AuthContext"

export const UIHeader = () => {
  const { token, logout, user } = useAuth()

  const menu = [
    { value: "home", name: "Accueil", to: "/" },
    {
      value: "account",
      name: "Mon compte",
      to: user ? `/user/${user.id}` : "/auth/login",
    },
    {
      value: "add_art",
      name: "Ajouter une œuvre",
      to: "/arts/add",
    },
    !token && {
      value: "singup",
      name: "Créer mon compte",
      to: "/auth/register",
    },
    !token && { value: "login", name: "Connexion", to: "/auth/login" },
  ].filter(Boolean)

  return (
    <header>
      <nav className="flex items-center gap-4 justify-between">
        {menu.map(({ name, to }, index) => (
          <Link key={index} to={to}>
            {name}
          </Link>
        ))}

        {token && (
          <div>
            <UIButton
              label="Déconnexion"
              variant="neutral"
              size="s"
              onClick={logout}
            />
          </div>
        )}
      </nav>
    </header>
  )
}
