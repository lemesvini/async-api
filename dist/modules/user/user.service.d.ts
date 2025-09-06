import { CreateUserInput, UpdateUserInput, GetUserParams } from "./user.schema";
export declare function createUser(input: CreateUserInput): Promise<{
    createdAt: string;
    updatedAt: string;
    email: string;
    fullName: string;
    role: import("@prisma/client").$Enums.Role;
    id: string;
}>;
export declare function getUserById(params: GetUserParams): Promise<{
    createdAt: string;
    updatedAt: string;
    email: string;
    fullName: string;
    role: import("@prisma/client").$Enums.Role;
    id: string;
} | null>;
export declare function getUsers(query?: any): Promise<{
    users: {
        createdAt: string;
        updatedAt: string;
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function updateUser(params: GetUserParams, input: UpdateUserInput): Promise<{
    createdAt: string;
    updatedAt: string;
    email: string;
    fullName: string;
    role: import("@prisma/client").$Enums.Role;
    id: string;
}>;
export declare function deleteUser(params: GetUserParams): Promise<{
    message: string;
}>;
//# sourceMappingURL=user.service.d.ts.map