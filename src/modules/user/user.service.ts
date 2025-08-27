import prisma from "../../utils/prisma";
import {
  CreateUserInput,
  UpdateUserInput,
  GetUsersQuery,
  GetUserParams,
} from "./user.schema";
import { hashPassword } from "../../utils/hash";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hash,
      salt,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
export async function getUserById(params: GetUserParams) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) return null;

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function getUsers(query: any = {}) {
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "10");
  const skip = (page - 1) * limit;

  const whereClause = query.role ? { role: query.role } : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  // Convert dates to ISO strings
  const serializedUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return {
    users: serializedUsers,
    total,
    page,
    limit,
    totalPages,
  };
}

export async function updateUser(
  params: GetUserParams,
  input: UpdateUserInput
) {
  const updateData: any = { ...input };

  if (input.password) {
    const { hash, salt } = hashPassword(input.password);
    updateData.password = hash;
    updateData.salt = salt;
  }

  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: updateData,
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function deleteUser(params: GetUserParams) {
  await prisma.user.delete({
    where: {
      id: params.id,
    },
  });

  return { message: "User deleted successfully" };
}
