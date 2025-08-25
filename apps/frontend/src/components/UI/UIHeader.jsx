import { Link } from "react-router"

export const UIHeader = () => {
  const menu = [
    { value: "home", name: "Accueil", to: "/" },
    // { value: "account", name: "Compte", to: "/user/:id" },
    { value: "singup", name: "Créer mon compte", to: "/auth/register" },
    { value: "login", name: "Connexion", to: "/auth/login" },
  ]

  return (
    <div>
      {menu.map(({ name, to }, index) => (
        <Link key={index} to={to}>
          {name}
        </Link>
      ))}
    </div>
  )
}
