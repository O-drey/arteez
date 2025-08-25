import { Link } from "react-router"
// import { artsHooks } from "./hooks/artsHooks"

export function Home() {
  // const { artsList, artRetrieved } = artsHooks()

  // const arts = artsList()
  // const art = artRetrieved("art_1")

  return (
    <div>
      <h1>
        <Link to="/">Arteez</Link>
      </h1>

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
    </div>
  )
}
