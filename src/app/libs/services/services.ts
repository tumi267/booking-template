import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE Service
export const createService = async (serviceData: {
  name: string
  description?: string
  duration: number
  price: number
}) => {
  return await prisma.service.create({
    data: serviceData
  })
}

// READ Services
export const getAllServices = async () => {
  return await prisma.service.findMany({
    where: { isActive: true }
  })
}

export const getServiceById = async (id: string) => {
  return await prisma.service.findUnique({
    where: { id },
    include: { providers: true, bookings: true }
  })
}

// UPDATE Service
export const updateService = async (id: string, updateData: {
  name?: string
  description?: string
  duration?: number
  price?: number
  isActive?: boolean
}) => {
  return await prisma.service.update({
    where: { id },
    data: updateData
  })
}

// DELETE Service (soft delete)
export const deleteService = async (id: string) => {
  return await prisma.service.update({
    where: { id },
    data: { isActive: false }
  })
}