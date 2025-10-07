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

  // CREATE Booking Settings
export const createBookingSettings = async (settingsData: {
    providerId: string
    defaultSessionDuration?: number
    defaultPrice?: number
    availableServices?: string[]
    teamMembers?: string[]
  }) => {
    return await prisma.bookingSettings.create({
      data: settingsData
    })
  }
  
  // READ Booking Settings
export const getBookingSettingsByProvider = async (providerId: string) => {
    return await prisma.bookingSettings.findUnique({
      where: { providerId }
    })
  }
  
  // UPDATE Booking Settings
export const updateBookingSettings = async (providerId: string, updateData: {
    defaultSessionDuration?: number
    defaultPrice?: number
    availableServices?: string[]
    teamMembers?: string[]
  }) => {
    return await prisma.bookingSettings.upsert({
      where: { providerId },
      update: updateData,
      create: {
        providerId,
        ...updateData
      }
    })
  }
  
  // DELETE Booking Settings
export const deleteBookingSettings = async (providerId: string) => {
    return await prisma.bookingSettings.delete({
      where: { providerId }
    })
  }
  // Add Service to Provider
export const addServiceToProvider = async (providerId: string, serviceId: string) => {
    return await prisma.provider.update({
      where: { id: providerId },
      data: {
        services: {
          connect: { id: serviceId }
        }
      },
      include: { services: true }
    })
  }
  
  // Remove Service from Provider
export const removeServiceFromProvider = async (providerId: string, serviceId: string) => {
    return await prisma.provider.update({
      where: { id: providerId },
      data: {
        services: {
          disconnect: { id: serviceId }
        }
      },
      include: { services: true }
    })
  }
  
  // Get Provider's Services
export const getProviderServices = async (providerId: string) => {
    return await prisma.provider.findUnique({
      where: { id: providerId },
      include: { services: true }
    })
  }