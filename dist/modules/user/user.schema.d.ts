import { z } from "zod";
declare const createUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    fullName: z.ZodString;
    role: z.ZodEnum<{
        ADMIN: "ADMIN";
        CONSULTANT: "CONSULTANT";
        STUDENT: "STUDENT";
    }>;
}, z.core.$strip>;
declare const updateUserSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        CONSULTANT: "CONSULTANT";
        STUDENT: "STUDENT";
    }>>;
}, z.core.$strip>;
declare const getUserParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const getUsersQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        CONSULTANT: "CONSULTANT";
        STUDENT: "STUDENT";
    }>>;
}, z.core.$strip>;
declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    fullName: z.ZodString;
    role: z.ZodEnum<{
        ADMIN: "ADMIN";
        CONSULTANT: "CONSULTANT";
        STUDENT: "STUDENT";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const getUsersResponseSchema: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        fullName: z.ZodString;
        role: z.ZodEnum<{
            ADMIN: "ADMIN";
            CONSULTANT: "CONSULTANT";
            STUDENT: "STUDENT";
        }>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    total: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
}, z.core.$strip>;
declare const deleteUserResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUserParams = z.infer<typeof getUserParamsSchema>;
export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;
export { createUserSchema, updateUserSchema, getUserParamsSchema, getUsersQuerySchema, userResponseSchema, getUsersResponseSchema, deleteUserResponseSchema, };
//# sourceMappingURL=user.schema.d.ts.map