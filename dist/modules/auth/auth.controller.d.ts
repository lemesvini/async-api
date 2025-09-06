import { FastifyRequest, FastifyReply } from "fastify";
import { LoginInput, RegisterInput, ChangePasswordInput, RefreshTokenInput } from "./auth.schema";
export declare function loginHandler(request: FastifyRequest<{
    Body: LoginInput;
}>, reply: FastifyReply): Promise<never>;
export declare function registerHandler(request: FastifyRequest<{
    Body: RegisterInput;
}>, reply: FastifyReply): Promise<never>;
export declare function refreshTokenHandler(request: FastifyRequest<{
    Body: RefreshTokenInput;
}>, reply: FastifyReply): Promise<never>;
export declare function logoutHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function changePasswordHandler(request: FastifyRequest<{
    Body: ChangePasswordInput;
}>, reply: FastifyReply): Promise<never>;
export declare function getMeHandler(request: FastifyRequest, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=auth.controller.d.ts.map