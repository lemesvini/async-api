import { FastifyRequest, FastifyReply } from "fastify";
export interface AuthenticatedUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
}
export declare function authenticateUser(request: FastifyRequest, reply: FastifyReply): Promise<undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map