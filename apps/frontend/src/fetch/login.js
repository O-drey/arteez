import { httpServer } from "./httpFetch"

export const login = async (payload) => {
  const { data } = await httpServer.post("/login", payload)
  console.log(httpServer.head("Authorization"))
  return data
}
