import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a provider
export const createProvider = async (data: {
  userId: string;
  imageurl?: string;
  jobTitle?: string;
  bio?: string;
  hourlyRate: number;
}) => {
  return prisma.provider.create({ data });
};

// Get all providers
export const getProviders = async () => {
  return prisma.provider.findMany({
    include: { user: true, Service: true },
  });
};

// Get provider by ID
export const getProviderById = async (id: string) => {
  return prisma.provider.findUnique({
    where: { id },
    include: { user: true, Service: true },
  });
};

// Update provider
export const updateProvider = async (id: string, data: Partial<{
  imageurl: string;
  jobTitle: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  isAvailable: boolean;
}>) => {
  return prisma.provider.update({
    where: { id },
    data,
  });
};

// Delete provider
export const deleteProvider = async (id: string) => {
  return prisma.provider.delete({
    where: { id },
  });
};
