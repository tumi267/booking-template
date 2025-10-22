import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new user
export const createUser = async (data: {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: "CLIENT" | "TRAINER" | "ADMIN";
  imageurl?: string;
}) => {
  const formattedData = {
    ...data,
    role: data.role ? (data.role as any) : "CLIENT", // ✅ normalize role
  };

  return prisma.user.create({
    data: formattedData,
  });
};

// Get all users
export const getUsers = async () => {
  return prisma.user.findMany({
    include: { provider: true },
  });
};

// Get user by Clerk ID
export const getUserByClerkId = async (clerkId: string) => {
  return prisma.user.findUnique({
    where: { clerkId },
    include: { provider: true },
  });
};

// Get user by internal UUID
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { provider: true },
  });
};

// Update user
export const updateUser = async (
  id: string,
  data: Partial<{
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: "CLIENT" | "TRAINER" | "ADMIN";
    imageurl: string;
  }>
) => {
  const formattedData: any = { ...data };

  if (data.role) {
    formattedData.role = { set: data.role }; // convert to Prisma-compatible input
  }

  return prisma.user.update({
    where: { id },
    data: formattedData,
  });
};

// Delete user
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
