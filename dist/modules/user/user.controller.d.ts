import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, UpdateUserInput, GetUserParams } from "./user.schema";
export declare function registerUserHandler(request: FastifyRequest<{
    Body: CreateUserInput;
}>, reply: FastifyReply): Promise<void>;
export declare function getUserHandler(request: FastifyRequest<{
    Params: GetUserParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getUsersHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function updateUserHandler(request: FastifyRequest<{
    Params: GetUserParams;
    Body: UpdateUserInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function deleteUserHandler(request: FastifyRequest<{
    Params: GetUserParams;
}>, reply: FastifyReply): Promise<undefined>;
//# sourceMappingURL=user.controller.d.ts.map