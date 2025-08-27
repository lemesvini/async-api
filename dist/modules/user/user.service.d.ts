import { CreateUserInput, UpdateUserInput, GetUsersQuery, GetUserParams } from "./user.schema";
export declare function createUser(input: CreateUserInput): Promise<{
    email: string;
    password: string;
    fullName: string;
    role: import("../../generated/prisma").$Enums.Role;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    salt: string;
}>;
export declare function getUserById(params: GetUserParams): Promise<{
    email: string;
    fullName: string;
    role: import("../../generated/prisma").$Enums.Role;
    id: string;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare function getUsers(query: GetUsersQuery): Promise<{
    users: {
        email: string;
        fullName: string;
        role: import("../../generated/prisma").$Enums.Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function updateUser(params: GetUserParams, input: UpdateUserInput): Promise<{
    email: string;
    fullName: string;
    role: import("../../generated/prisma").$Enums.Role;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteUser(params: GetUserParams): Promise<{
    message: string;
}>;
//# sourceMappingURL=user.service.d.ts.map