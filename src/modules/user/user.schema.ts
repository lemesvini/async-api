import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  fullName: z.string().min(2).max(100),
  role: z.enum(["ADMIN", "CONSULTANT", "STUDENT"]),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),
  fullName: z.string().min(2).max(100).optional(),
  role: z.enum(["ADMIN", "CONSULTANT", "STUDENT"]).optional(),
});

const getUserParamsSchema = z.object({
  id: z.string(),
});

const getUsersQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  role: z.enum(["ADMIN", "CONSULTANT", "STUDENT"]).optional(),
});

const userResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  fullName: z.string().min(2).max(100),
  role: z.enum(["ADMIN", "CONSULTANT", "STUDENT"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const getUsersResponseSchema = z.object({
  users: z.array(userResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

const deleteUserResponseSchema = z.object({
  message: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUserParams = z.infer<typeof getUserParamsSchema>;
export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;

export {
  createUserSchema,
  updateUserSchema,
  getUserParamsSchema,
  getUsersQuerySchema,
  userResponseSchema,
  getUsersResponseSchema,
  deleteUserResponseSchema,
};
