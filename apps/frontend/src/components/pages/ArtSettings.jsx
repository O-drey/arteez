import { useParams } from "react-router"

export function ArtSettings() {
  const { id } = useParams()

  return <div>Paramètres de l'image</div>
}
