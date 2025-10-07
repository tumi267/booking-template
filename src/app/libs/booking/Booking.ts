import { PrismaClient,BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();
// CREATE Booking
const createBooking = async (bookingData: {
    clientId: string
    providerId: string
    serviceIds: string[]
    teamMembers: string[]
    price: number
    sessionDuration: number
    startTime: Date
    endTime: Date
    specialRequests?: string
  }) => {
    return await prisma.booking.create({
      data: {
        ...bookingData,
        services: {
          connect: bookingData.serviceIds.map(id => ({ id }))
        }
      },
      include: {
        client: true,
        provider: true,
        services: true
      }
    })
  }
  
  // READ Bookings
  const getAllBookings = async () => {
    return await prisma.booking.findMany({
      include: {
        client: true,
        provider: true,
        services: true
      }
    })
  }
  
  const getBookingById = async (id: string) => {
    return await prisma.booking.findUnique({
      where: { id },
      include: {
        client: true,
        provider: true,
        services: true
      }
    })
  }
  
  const getBookingsByClient = async (clientId: string) => {
    return await prisma.booking.findMany({
      where: { clientId },
      include: { provider: true, services: true }
    })
  }
  
  const getBookingsByProvider = async (providerId: string) => {
    return await prisma.booking.findMany({
      where: { providerId },
      include: { client: true, services: true }
    })
  }
  
  // UPDATE Booking
  const updateBooking = async (id: string, updateData: {
    status?: BookingStatus
    price?: number
    sessionDuration?: number
    startTime?: Date
    endTime?: Date
    specialRequests?: string
    teamMembers?: string[]
  }) => {
    return await prisma.booking.update({
      where: { id },
      data: updateData
    })
  }
  
  // UPDATE Booking Services
  const updateBookingServices = async (id: string, serviceIds: string[]) => {
    return await prisma.booking.update({
      where: { id },
      data: {
        services: {
          set: serviceIds.map(id => ({ id }))
        }
      },
      include: { services: true }
    })
  }
  
  // DELETE Booking
  const deleteBooking = async (id: string) => {
    return await prisma.booking.delete({
      where: { id }
    })
  }
  export {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByClient,
    getBookingsByProvider,
    updateBooking,
    updateBookingServices,
    deleteBooking
  }