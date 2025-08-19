import { httpServer } from "./httpFetch"

export const collectionsMethods = () => {
  const list = async () => {
    const { data } = await httpServer.get("/collections")
    return data
  }

  const retrieve = async (id) => {
    const { data } = await httpServer.get(`/collections/${id}`)
    return data
  }

  const create = async (datas) => {
    const { data } = await httpServer.post("/collections", datas)
    return data
  }

  const edit = async (datas) => {
    const { data } = await httpServer.patch(`/collections/${id}`, datas)
    return data
  }

  const del = async () => {
    const { data } = await httpServer.delete(`/collections/${id}`)
    return data
  }

  return { list, retrieve, create, edit, del }
}
