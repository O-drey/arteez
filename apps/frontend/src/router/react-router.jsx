import { createBrowserRouter } from "react-router"
import App from "../App"
import { Home } from "../components/pages/Home"
import { UserProfile } from "../components/pages/UserProfile"
import { AuthLayout } from "../layouts/AuthLayout"
import { ArtsPage } from "../components/pages/ArtsPage"
import { UsersPage } from "../components/pages/UsersPage"
import NotFoundPage from "../components/pages/NotFound"
import { LoginPage } from "../components/pages/LoginPage"
import { RegisterPage } from "../components/pages/RegisterPage"
import { UserSettings } from "../components/pages/UserSettings"
import { CollectionPage } from "../components/pages/CollectionPage"
import { ArtPage } from "../components/pages/ArtPage"
import { AddArtPage } from "../components/pages/AddArtPage"
import { ArtSettings } from "../components/pages/ArtSettings"
import { AuthorPage } from "../components/pages/AuthorPage"
import { AuthorsListPage } from "../components/pages/AuthorsListPage"

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
    path: "/user/:id/settings?",
    Component: UserSettings,
  },
  {
    path: "/arts",
    children: [
      { index: true, Component: ArtsPage },
      { path: "add", Component: AddArtPage },
    ],
  },
  {
    path: "/art/:id",
    children: [
      { index: true, Component: ArtPage },
      { path: "/art/:id/settings?", Component: ArtSettings },
    ],
  },
  {
    path: "/authors",
    children: [{ index: true, Component: AuthorsListPage }],
  },
  {
    path: "/author/:id",
    children: [{ index: true, Component: AuthorPage }],
  },
  {
    path: "/collection/:id",
    children: [{ index: true, Component: CollectionPage }],
  },
  { path: "*", Component: NotFoundPage },
])
