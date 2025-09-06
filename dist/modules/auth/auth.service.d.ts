import { LoginInput, RegisterInput, ChangePasswordInput } from "./auth.schema";
import { FastifyInstance } from "fastify";
interface AuthenticatedUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
}
export declare function loginUser(input: LoginInput, app: FastifyInstance): Promise<{
    user: AuthenticatedUser;
    accessToken: string;
    refreshToken: string;
} | null>;
export declare function registerUser(input: RegisterInput): Promise<AuthenticatedUser>;
export declare function refreshUserToken(refreshToken: string, app: FastifyInstance): Promise<{
    accessToken: string;
    refreshToken: string;
} | null>;
export declare function changeUserPassword(userId: string, input: ChangePasswordInput): Promise<boolean>;
export declare function getUserFromToken(token: string, app: FastifyInstance): Promise<AuthenticatedUser | null>;
export {};
//# sourceMappingURL=auth.service.d.ts.map