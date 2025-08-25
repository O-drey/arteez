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
    console.log("POST users datas : ", datas)
    const { data } = await httpServer.post("/users", datas)
    console.log("POST users data : ", data)
    return data
  }

  const update = async (datas) => {
    console.log("PATCH users datas : ", datas)
    const { id } = datas
    const { data } = await httpServer.patch(`/users/${id}`, datas)
    console.log("PATCH users data : ", data)
    return data
  }

  const del = async (id) => {
    const { data } = await httpServer.delete(`/users/${id}`)
    return data
  }

  return { list, retrieve, create, update, del }
}
