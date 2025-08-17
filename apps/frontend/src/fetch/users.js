import { httpServer } from "./httpFetch"

export const userMethods = () => {
  const list = async () => {
    const { data } = await httpServer.get("/users")
    return data
  }

  const retrieve = async (id) => {
    const { data } = await httpServer.get(`/users/${id}`)
    return data
  }

  const create = async (datas) => {
    const { data } = await httpServer.post("/users", datas)
    return data
  }

  const edit = async (datas) => {
    const { data } = await httpServer.patch(`/users/${id}`, datas)
    return data
  }

  const del = async () => {
    const { data } = await httpServer.delete(`/users/${id}`)
    return data
  }

  return { list, retrieve, create, edit, del }
}
