import { httpServer } from "./httpFetch"

export const artsMethods = () => {
  const list = async () => {
    const data = await httpServer.get("/arts")
    return data
  }

  const retrieve = async (id) => {
    const data = await httpServer.get(`/arts/${id}`)
    return data
  }

  const create = async (datas) => {
    const data = await httpServer.post("/arts", datas)
    return data
  }

  const update = async (id, datas) => {
    const data = await httpServer.patch(`/arts/${id}`, datas)
    return data
  }

  const del = async (id) => {
    const data = await httpServer.delete(`/arts/${id}`)
    return data
  }

  return { list, retrieve, create, update, del }
}
