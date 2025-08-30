import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const artsCollectionsMethods = () => {
  const list = async () => {
    const data = await prisma.artsCollections.findMany()
    return data
  }

  const retrieve = async (id) => {
    try {
      const data = await prisma.artsCollections.findUnique({ where: { id } })
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const create = async ({ datas }) => {
    const { artsId } = datas

    try {
      const newCollection = await prisma.artsCollections.create({
        data: { artsId },
      })
      return newCollection
    } catch (error) {
      console.error(error)
    }
  }

  const update = async ({ datas }) => {
    const { artsId, id } = datas

    try {
      const collectionUptades = await prisma.artsCollections.update({
        where: { id },
        data: { artsId },
      })

      return collectionUptades
    } catch (error) {
      console.error(error)
    }
  }

  const del = async (id) => {
    try {
      const data = prisma.artsCollections.delete({ where: { id } })
      return data
    } catch (error) {
      console.error(error)
    }
  }
  return { list, retrieve, create, update, del }
}
