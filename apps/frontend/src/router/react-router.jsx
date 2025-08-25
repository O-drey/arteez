import { createBrowserRouter } from "react-router"
import { Home } from "../components/pages/Home"
import { UserProfile } from "../components/pages/UserProfile"
import { AuthLayout } from "../layouts/AuthLayout"
import { ArtsPage } from "../components/pages/ArtsPage"
import App from "../App"
import { UsersPage } from "../components/pages/UsersPage"
import NotFoundPage from "../components/pages/NotFound"
import { LoginPage } from "../components/pages/LoginPage"
import { RegisterPage } from "../components/pages/RegisterPage"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
    ],
  },
  {
    path: "/users",
    Component: UsersPage,
  },
  {
    path: "/user/:id",

    Component: UserProfile,
  },
  {
    path: "/arts",
    children: [
      { index: true, Component: ArtsPage },
      // { path: "settings", Component: ConcertsCity },
    ],
  },
  { path: "*", Component: NotFoundPage },
])
