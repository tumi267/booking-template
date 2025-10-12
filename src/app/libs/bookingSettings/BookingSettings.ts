import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE BookingSettings
export const createBookingSettings = async (data: {
  providerId: string;
  serviceId: string;
  defaultSessionDuration: number;
  defaultPrice: number;
}) => {
  return await prisma.bookingSettings.create({
    data,
    include: {
      service: true,
      provider: true
    }
  });
};

// READ BookingSettings by Provider
export const getBookingSettingsByID = async (id: string) => {
  return await prisma.bookingSettings.findMany({
    where: { id },
    include: {
      service: true,
      provider: true
    }
  });
};
export const getBookingSettings = async () => {
    return await prisma.bookingSettings.findMany({
      include: {
        service: true,
        provider: true
      }
    });
  };
// UPDATE BookingSettings
export const updateBookingSettings = async (id: string, data: {
  defaultSessionDuration?: number;
  defaultPrice?: number;
}) => {
  return await prisma.bookingSettings.update({
    where: { id },
    data,
    include: {
      service: true,
      provider: true
    }
  });
};

// DELETE BookingSettings
export const deleteBookingSettings = async (id: string) => {
  return await prisma.bookingSettings.delete({
    where: { id }
  });
};