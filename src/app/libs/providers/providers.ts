import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// CREATE Provider
export const createProvider = async (providerData: {
  userId: string
  jobTitle?: string
  bio?: string
  imageurl?: string
  hourlyRate: number
}) => {
  return await prisma.provider.create({
    data: providerData,
    include: { user: true, services: true, bookingSettings: true }
  })
}

// READ Providers
export const getAllProviders = async () => {
  return await prisma.provider.findMany({
    include: { user: true, services: true }
  })
}

export const getProviderById = async (id: string) => {
  return await prisma.provider.findUnique({
    where: { id },
    include: { 
      user: true, 
      services: true, 
      bookings: true,
      operatingHours: true,
      bookingSettings: true
    }
  })
}

export const getProviderByUserId = async (userId: string) => {
  return await prisma.provider.findUnique({
    where: { userId },
    include: { user: true, services: true, bookingSettings: true }
  })
}

// UPDATE Provider
export const updateProvider = async (id: string, updateData: {
  jobTitle?: string
  bio?: string
  imageurl?: string
  hourlyRate?: number
  rating?: number
  totalReviews?: number
  isAvailable?: boolean
}) => {
  return await prisma.provider.update({
    where: { id },
    data: updateData
  })
}

// DELETE Provider
export const deleteProvider = async (id: string) => {
  return await prisma.provider.delete({
    where: { id }
  })
}