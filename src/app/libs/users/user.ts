import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new user
export const createUser = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: "CLIENT" | "TRAINER" | "ADMIN";
  imageurl?: string;
}) => {
  return prisma.user.create({ data });
};

// Get all users
export const getUsers = async () => {
  return prisma.user.findMany({
    include: { provider: true }, // include provider if exists
  });
};

// Get user by ID
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { provider: true },
  });
};

// Update user
export const updateUser = async (id: string, data: Partial<{
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "CLIENT" | "TRAINER" | "ADMIN";
  imageurl: string;
}>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

// Delete user
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
