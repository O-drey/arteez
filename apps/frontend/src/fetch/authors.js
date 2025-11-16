import { httpServer } from "./httpFetch"

export const authorsMethods = () => {
  const list = async () => {
    const { data } = await httpServer.get("/authors")
    return data
  }

  const retrieve = async (id) => {
    const { data } = await httpServer.get(`/authors/${id}`)
    return data
  }

  const update = async (id, datas) => {
    const data = await httpServer.patch(`/authors/${id}`, datas)
    return data
  }

  const del = async (id) => {
    const data = await httpServer.delete(`/authors/${id}`)
    return data
  }

  return { list, retrieve, update, del }
}
