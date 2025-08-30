import { Link, useParams } from "react-router"
import { usersHooks } from "../../hooks/usersHooks"

import { UIButton } from "../UI/UIButton"
import imgFavorites from "../../assets/login_img.webp"

export const UserProfile = () => {
  const { id } = useParams()
  const { userRetrieved } = usersHooks()
  const { user, loading: userLoading, error: userError } = userRetrieved(id)

  if (userLoading) return <p>Chargement de l'utilisateur…</p>
  if (userError) return <p>Erreur : {error.message}</p>
  if (!user) return <p>Utilisateur non trouvé</p>

  const collections = [
    {
      id: 1,
      title: "collection 1",
      items: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
      ],
    },
    {
      id: 2,
      title: "collection 2",
      items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    },
    {
      id: 3,
      title: "collection 3",
      items: [{ id: 1 }, { id: 2 }],
    },
  ]
  const favorites = [
    { id: 1, title: "favori 1", src: imgFavorites },
    { id: 2, title: "favori 2", src: imgFavorites },
    { id: 3, title: "favori 3", src: imgFavorites },
    { id: 4, title: "favori 4", src: imgFavorites },
    { id: 5, title: "favori 5", src: imgFavorites },
    { id: 6, title: "favori 6", src: imgFavorites },
    { id: 7, title: "favori 7", src: imgFavorites },
    { id: 8, title: "favori 8", src: imgFavorites },
    { id: 9, title: "favori 9", src: imgFavorites },
  ]
  return (
    <div className="grid-cols-12 gap-4">
      <div className="col-span-6 col-start-4">
        <div>
          <div className="flex justify-between mb-4">
            <h1>{user.username}</h1>
            <UIButton to="settings" label="Paramètres" />
          </div>
          <p className="max-w-2xl">{user.bio}</p>
        </div>

        <section
          id="collections"
          className="py-8 px-8 bg-gray-50 rounded-3xl my-16"
        >
          <h2 className="font-semibold text-2xl mb-4 font-Overlock">
            Mes collections
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <Link key={index} to={`/collection/${collection.id}`}>
                <div>
                  <div className="h-60 w-full bg-gray-200 rounded-xl mb-2"></div>
                  <span>
                    {collection.title} • {collection.items.length} éléments
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section
          id="favorites"
          className="py-8 px-8 bg-gray-50 rounded-3xl mb-6"
        >
          <h2 className="font-semibold text-2xl mb-4 font-Overlock">
            Mes favoris
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {favorites.map((favorite, index) => (
              <Link key={index} to={`/art/${favorite.id}`}>
                <div>
                  <div className="h-60 w-full bg-gray-200 rounded-xl mb-2 overflow-hidden">
                    <img src={favorite.src} className="w-full" />
                  </div>
                  <span>{favorite.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
