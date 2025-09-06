import { FastifyReply, FastifyRequest } from "fastify";
import { CreateClassInput, UpdateClassInput, GetClassParams, EnrollStudentInput } from "./class.schema";
export declare function createClassHandler(request: FastifyRequest<{
    Body: CreateClassInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getClassHandler(request: FastifyRequest<{
    Params: GetClassParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getClassesHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function updateClassHandler(request: FastifyRequest<{
    Params: GetClassParams;
    Body: UpdateClassInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function deleteClassHandler(request: FastifyRequest<{
    Params: GetClassParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function enrollStudentHandler(request: FastifyRequest<{
    Params: GetClassParams;
    Body: EnrollStudentInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function unenrollStudentHandler(request: FastifyRequest<{
    Params: GetClassParams & {
        studentId: string;
    };
}>, reply: FastifyReply): Promise<undefined>;
export declare function getClassEnrollmentsHandler(request: FastifyRequest<{
    Params: GetClassParams;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=class.controller.d.ts.map