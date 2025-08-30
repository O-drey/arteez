import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const usersMethods = () => {
  const list = async () => {
    const data = await prisma.user.findMany()
    return data
  }

  const retrieve = async (id) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })
      return user
    } catch (error) {
      console.error(error)
    }
  }

  const create = async (datas) => {
    const { firstname, lastname, email, username, password } = datas

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        console.log("Utilisateur existe déjà.")
        return
      } else {
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await prisma.user.create({
          data: {
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword,
          },
        })
        return newUser
      }
    } catch (error) {
      console.error(error)
    }
  }

  const update = async (datas) => {
    const { id, firstname, lastname, email, username, password, bio, dob } =
      datas

    try {
      const hashedPassword = await bcrypt.hash(password, 12)

      const userUptades = await prisma.user.update({
        where: { id },
        data: {
          firstname,
          lastname,
          email,
          username,
          password: hashedPassword,
          bio,
          dob,
        },
      })

      return userUptades
    } catch (error) {
      console.error(error)
    }
  }

  const del = async (id) => {
    try {
      console.log("user.controller.del -> id : ", id)
      const data = prisma.user.delete({ where: { id } })
      return data
    } catch (error) {
      console.error(error)
    }
  }
  return { list, retrieve, create, update, del }
}
