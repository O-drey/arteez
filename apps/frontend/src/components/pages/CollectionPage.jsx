// import { useParams } from "react-router"
import imgArt from "../../assets/login_img.webp"

export const CollectionPage = () => {
  // const { id } = useParams()
  const arts = [
    { id: 1, title: "Art 1", author: "Author 1", src: imgArt },
    { id: 2, title: "Art 1", author: "Author 1", src: imgArt },
    { id: 3, title: "Art 1", author: "Author 1", src: imgArt },
    { id: 4, title: "Art 1", author: "Author 1", src: imgArt },
    { id: 5, title: "Art 1", author: "Author 1", src: imgArt },
  ]
  return (
    <div>
      <h1>Page de la collection</h1>
      <div className="grid grid-cols-4">
        {arts.map((art, index) => (
          <div key={index}>
            <div className="w-auto h-auto object-cover object-center">
              <img src={art.src} alt="" />
            </div>
            <div>
              <span>{art.title}</span>
              <span>{art.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
