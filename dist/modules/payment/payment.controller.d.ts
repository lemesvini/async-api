import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePaymentInput, UpdatePaymentInput, GetPaymentParams, GetPaymentsQuery, MarkPaymentPaidInput, BulkCreatePaymentsInput } from "./payment.schema";
export declare function createPaymentHandler(request: FastifyRequest<{
    Body: CreatePaymentInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getPaymentHandler(request: FastifyRequest<{
    Params: GetPaymentParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getPaymentsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function updatePaymentHandler(request: FastifyRequest<{
    Params: GetPaymentParams;
    Body: UpdatePaymentInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function deletePaymentHandler(request: FastifyRequest<{
    Params: GetPaymentParams;
}>, reply: FastifyReply): Promise<undefined>;
export declare function markPaymentAsPaidHandler(request: FastifyRequest<{
    Params: GetPaymentParams;
    Body: MarkPaymentPaidInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getPaymentStatsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export declare function createBulkPaymentsHandler(request: FastifyRequest<{
    Body: BulkCreatePaymentsInput;
}>, reply: FastifyReply): Promise<undefined>;
export declare function getStudentPaymentsHandler(request: FastifyRequest<{
    Params: {
        studentId: string;
    };
    Querystring: GetPaymentsQuery;
}>, reply: FastifyReply): Promise<void>;
//# sourceMappingURL=payment.controller.d.ts.map