import { FastifyRequest, FastifyReply } from "fastify";
import { CreateLessonInput, UpdateLessonInput, GetLessonParams, GetClassLessonsParams } from "./lesson.schema";
export declare function createLessonHandler(request: FastifyRequest<{
    Body: CreateLessonInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getLessonHandler(request: FastifyRequest<{
    Params: GetLessonParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getClassLessonsHandler(request: FastifyRequest<{
    Params: GetClassLessonsParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function updateLessonHandler(request: FastifyRequest<{
    Params: GetLessonParams;
    Body: UpdateLessonInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function deleteLessonHandler(request: FastifyRequest<{
    Params: GetLessonParams;
}>, reply: FastifyReply): Promise<undefined>;
//# sourceMappingURL=lesson.controller.d.ts.map