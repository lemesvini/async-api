"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCreatePaymentsSchema = exports.paymentStatsResponseSchema = exports.getPaymentsResponseSchema = exports.paymentResponseSchema = exports.markPaymentPaidSchema = exports.getPaymentsQuerySchema = exports.getPaymentParamsSchema = exports.updatePaymentSchema = exports.createPaymentSchema = void 0;
const zod_1 = require("zod");
// Payment schemas
const createPaymentSchema = zod_1.z.object({
    studentId: zod_1.z.string(),
    classId: zod_1.z.string().optional(),
    amount: zod_1.z.number().positive(),
    description: zod_1.z.string().min(1).max(255),
    dueDate: zod_1.z.string().datetime(),
    referenceMonth: zod_1.z.number().min(1).max(12),
    referenceYear: zod_1.z.number().min(2020).max(2050),
    notes: zod_1.z.string().optional(),
});
exports.createPaymentSchema = createPaymentSchema;
const updatePaymentSchema = zod_1.z.object({
    amount: zod_1.z.number().positive().optional(),
    description: zod_1.z.string().min(1).max(255).optional(),
    status: zod_1.z.enum(["PENDING", "PAID", "OVERDUE", "CANCELLED"]).optional(),
    dueDate: zod_1.z.string().datetime().optional(),
    paidDate: zod_1.z.string().datetime().optional(),
    referenceMonth: zod_1.z.number().min(1).max(12).optional(),
    referenceYear: zod_1.z.number().min(2020).max(2050).optional(),
    notes: zod_1.z.string().optional(),
});
exports.updatePaymentSchema = updatePaymentSchema;
const getPaymentParamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.getPaymentParamsSchema = getPaymentParamsSchema;
const getPaymentsQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    status: zod_1.z.enum(["PENDING", "PAID", "OVERDUE", "CANCELLED"]).optional(),
    studentId: zod_1.z.string().optional(),
    classId: zod_1.z.string().optional(),
    referenceMonth: zod_1.z.string().optional(),
    referenceYear: zod_1.z.string().optional(),
    sortBy: zod_1.z.enum(["dueDate", "paidDate", "amount", "createdAt"]).optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
});
exports.getPaymentsQuerySchema = getPaymentsQuerySchema;
const markPaymentPaidSchema = zod_1.z.object({
    paidDate: zod_1.z.string().datetime().optional(),
    notes: zod_1.z.string().optional(),
});
exports.markPaymentPaidSchema = markPaymentPaidSchema;
// Response schemas
const paymentResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    studentId: zod_1.z.string(),
    classId: zod_1.z.string().nullable(),
    amount: zod_1.z.number(),
    description: zod_1.z.string(),
    status: zod_1.z.enum(["PENDING", "PAID", "OVERDUE", "CANCELLED"]),
    dueDate: zod_1.z.string().datetime(),
    paidDate: zod_1.z.string().datetime().nullable(),
    referenceMonth: zod_1.z.number(),
    referenceYear: zod_1.z.number(),
    notes: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    student: zod_1.z.object({
        id: zod_1.z.string(),
        fullName: zod_1.z.string(),
        email: zod_1.z.string(),
    }),
    class: zod_1.z
        .object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
    })
        .nullable(),
});
exports.paymentResponseSchema = paymentResponseSchema;
const getPaymentsResponseSchema = zod_1.z.object({
    payments: zod_1.z.array(paymentResponseSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPages: zod_1.z.number(),
});
exports.getPaymentsResponseSchema = getPaymentsResponseSchema;
const paymentStatsResponseSchema = zod_1.z.object({
    totalPayments: zod_1.z.number(),
    paidPayments: zod_1.z.number(),
    pendingPayments: zod_1.z.number(),
    overduePayments: zod_1.z.number(),
    totalAmount: zod_1.z.number(),
    paidAmount: zod_1.z.number(),
    pendingAmount: zod_1.z.number(),
    overdueAmount: zod_1.z.number(),
});
exports.paymentStatsResponseSchema = paymentStatsResponseSchema;
const bulkCreatePaymentsSchema = zod_1.z.object({
    classId: zod_1.z.string(),
    amount: zod_1.z.number().positive(),
    description: zod_1.z.string().min(1).max(255),
    dueDate: zod_1.z.string().datetime(),
    referenceMonth: zod_1.z.number().min(1).max(12),
    referenceYear: zod_1.z.number().min(2020).max(2050),
});
exports.bulkCreatePaymentsSchema = bulkCreatePaymentsSchema;
//# sourceMappingURL=payment.schema.js.map