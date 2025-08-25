import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const artsMethods = () => {
  const list = async () => {
    const data = await prisma.arts.findMany()
    return data
  }

  const retrieve = async (id) => {
    try {
      const art = await prisma.arts.findUnique({ where: { id } })
      return art
    } catch (error) {
      console.error(error)
    }
  }

  const create = async (datas) => {
    const { title, author, date, annotation, userId, imageId } = datas

    try {
      const newArt = await prisma.arts.create({
        data: {
          title,
          author,
          date,
          annotation,
          userId,
          imageId,
        },
      })
      return newArt
    } catch (error) {
      console.error(error)
    }
  }

  const update = async (datas) => {
    const { id, title, author, date, annotation, imageId } = datas

    try {
      const artUptades = await prisma.arts.update({
        where: { id },
        data: { firstname, title, author, date, annotation, imageId },
      })

      return artUptades
    } catch (error) {
      console.error(error)
    }
  }

  const del = async (id) => {
    try {
      const data = prisma.arts.delete({ where: { id } })
      return data
    } catch (error) {
      console.error(error)
    }
  }
  return { list, retrieve, create, update, del }
}
