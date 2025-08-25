import "./index.css"
import { Link } from "react-router"
import { UsersPage } from "./components/pages/UsersPage"
import { UIHeader } from "./components/UI/UIHeader"
// import { artsHooks } from "./hooks/artsHooks"

function App() {
  // const { artsList, artRetrieved } = artsHooks()

  // const arts = artsList()
  // const art = artRetrieved("art_1")

  return (
    <>
      <UIHeader />
      <h1>
        <Link to="/">Arteez App</Link>
      </h1>
      <h2>Les utilisateurs</h2>
      <UsersPage />

      {/* {arts.map((art, index) => (
        <div key={art.id || index}>
          <h2>{art.title}</h2>
        </div>
      ))}

      <div>
        <h3>Œuvre appelée</h3>
        <h4>{art.title}</h4>
        {/* fonctionne : récupère image sur Cloudinary mais appels limités {art.imgs.map((url) => (
          <img src={url} alt="" />
        ))} }
      </div> */}
    </>
  )
}

export default App
