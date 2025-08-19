import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { usersHooks } from "./hooks/usersHooks"
import { artsHooks } from "./hooks/artsHooks"
import { collectionsHooks } from "./hooks/collectionsHook"

function App() {
  const [count, setCount] = useState(0)

  const { userList, userRetrieved } = usersHooks()
  const { artsList, artRetrieved } = artsHooks()
  const { collectionsList, collectionRetrieved } = collectionsHooks()

  const user = userRetrieved(1)
  const arts = artsList()
  const art = artRetrieved("art_1")

  const collection = collectionRetrieved("collection_1")

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {userList().map((user, index) => (
        <div key={user.id || index}>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.dob}</p>
        </div>
      ))}
      {!userList() && <p>Il n'y a a pas encore d'utilisateur</p>}
      {user && (
        <div>
          <h1>Utilisateur appelé</h1>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
        </div>
      )}

      {arts.map((art, index) => (
        <div key={art.id || index}>
          <h2>{art.title}</h2>
        </div>
      ))}

      <div>
        <h3>Œuvre appelée</h3>
        <h4>{art.title}</h4>
        {/* fonctionne : récupère image sur Cloudinary mais appels limités {art.imgs.map((url) => (
          <img src={url} alt="" />
        ))} */}
      </div>

      {collectionsList().map((collection, index) => (
        <div key={index}>
          <p>{collection.title}</p>
          {collection.arts.map((art, index) => (
            <img src={art} key={index} />
          ))}
        </div>
      ))}
    </>
  )
}

export default App
