import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// CREATE Operating Hours
export const createOperatingHours = async (operatingHoursData: {
    providerId: string
    dayOfWeek: number
    startTime: string
    endTime: string
  }) => {
    return await prisma.operatingHours.create({
      data: operatingHoursData
    })
  }
  
  // READ Operating Hours
export const getOperatingHoursByProvider = async (providerId: string) => {
    return await prisma.operatingHours.findMany({
      where: { providerId, isActive: true }
    })
  }
  
export const getOperatingHoursByDay = async (providerId: string, dayOfWeek: number) => {
    return await prisma.operatingHours.findUnique({
      where: {
        providerId_dayOfWeek: {
          providerId,
          dayOfWeek
        }
      }
    })
  }
  
  // UPDATE Operating Hours
export const updateOperatingHours = async (id: string, updateData: {
    startTime?: string
    endTime?: string
    isActive?: boolean
  }) => {
    return await prisma.operatingHours.update({
      where: { id },
      data: updateData
    })
  }
  
  // DELETE Operating Hours
export const deleteOperatingHours = async (id: string) => {
    return await prisma.operatingHours.delete({
      where: { id }
    })
  }
