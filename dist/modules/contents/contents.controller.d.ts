import { FastifyReply, FastifyRequest } from "fastify";
import { CreateContentInput, UpdateContentInput, GetContentParams, GetContentsByModuleParams } from "./contents.schema";
export declare function createContentHandler(request: FastifyRequest<{
    Body: CreateContentInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getContentHandler(request: FastifyRequest<{
    Params: GetContentParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getContentsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function updateContentHandler(request: FastifyRequest<{
    Params: GetContentParams;
    Body: UpdateContentInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function deleteContentHandler(request: FastifyRequest<{
    Params: GetContentParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getContentsByModuleHandler(request: FastifyRequest<{
    Params: GetContentsByModuleParams;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=contents.controller.d.ts.map