import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authorsMethods = () => {
  const list = async () => {
    const data = await prisma.author.findMany()
    return data
  }

  const retrieve = async (id) => {
    try {
      const author = await prisma.author.findUnique({
        where: { id },
      })

      return author
    } catch (error) {
      console.error(error)
    }
  }

  const create = async (datas) => {
    const { firstname, lastname, artsId } = datas

    try {
      let existingAuthor = await prisma.author.findFirst({
        where: { firstname, lastname },
      })

      if (existingAuthor) {
        console.log("L'auteur existe déjà.")
        return
      } else {
        const newAuthor = await prisma.author.create({
          data: {
            firstname,
            lastname,
            artsId,
          },
        })
        return newAuthor
      }
    } catch (error) {
      console.error(error)
    }
  }

  const update = async (datas) => {
    const { id, firstname, lastname, artsId } = datas

    try {
      const authorUptades = await prisma.author.update({
        where: { id },
        data: {
          firstname,
          lastname,
          artsId,
        },
      })

      return authorUptades
    } catch (error) {
      console.error(error)
    }
  }

  const del = async (id) => {
    try {
      console.log("author.controller.del -> id : ", id)
      const data = prisma.author.delete({ where: { id } })
      return data
    } catch (error) {
      console.error(error)
    }
  }
  return { list, retrieve, create, update, del }
}
