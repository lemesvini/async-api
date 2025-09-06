import { z } from "zod";
declare const createPaymentSchema: z.ZodObject<{
    studentId: z.ZodString;
    classId: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    description: z.ZodString;
    dueDate: z.ZodString;
    referenceMonth: z.ZodNumber;
    referenceYear: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updatePaymentSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        PAID: "PAID";
        OVERDUE: "OVERDUE";
        CANCELLED: "CANCELLED";
    }>>;
    dueDate: z.ZodOptional<z.ZodString>;
    paidDate: z.ZodOptional<z.ZodString>;
    referenceMonth: z.ZodOptional<z.ZodNumber>;
    referenceYear: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const getPaymentParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const getPaymentsQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        PAID: "PAID";
        OVERDUE: "OVERDUE";
        CANCELLED: "CANCELLED";
    }>>;
    studentId: z.ZodOptional<z.ZodString>;
    classId: z.ZodOptional<z.ZodString>;
    referenceMonth: z.ZodOptional<z.ZodString>;
    referenceYear: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        amount: "amount";
        dueDate: "dueDate";
        paidDate: "paidDate";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
declare const markPaymentPaidSchema: z.ZodObject<{
    paidDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const paymentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    studentId: z.ZodString;
    classId: z.ZodNullable<z.ZodString>;
    amount: z.ZodNumber;
    description: z.ZodString;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        PAID: "PAID";
        OVERDUE: "OVERDUE";
        CANCELLED: "CANCELLED";
    }>;
    dueDate: z.ZodString;
    paidDate: z.ZodNullable<z.ZodString>;
    referenceMonth: z.ZodNumber;
    referenceYear: z.ZodNumber;
    notes: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    student: z.ZodObject<{
        id: z.ZodString;
        fullName: z.ZodString;
        email: z.ZodString;
    }, z.core.$strip>;
    class: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getPaymentsResponseSchema: z.ZodObject<{
    payments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        studentId: z.ZodString;
        classId: z.ZodNullable<z.ZodString>;
        amount: z.ZodNumber;
        description: z.ZodString;
        status: z.ZodEnum<{
            PENDING: "PENDING";
            PAID: "PAID";
            OVERDUE: "OVERDUE";
            CANCELLED: "CANCELLED";
        }>;
        dueDate: z.ZodString;
        paidDate: z.ZodNullable<z.ZodString>;
        referenceMonth: z.ZodNumber;
        referenceYear: z.ZodNumber;
        notes: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        student: z.ZodObject<{
            id: z.ZodString;
            fullName: z.ZodString;
            email: z.ZodString;
        }, z.core.$strip>;
        class: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    total: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
}, z.core.$strip>;
declare const paymentStatsResponseSchema: z.ZodObject<{
    totalPayments: z.ZodNumber;
    paidPayments: z.ZodNumber;
    pendingPayments: z.ZodNumber;
    overduePayments: z.ZodNumber;
    totalAmount: z.ZodNumber;
    paidAmount: z.ZodNumber;
    pendingAmount: z.ZodNumber;
    overdueAmount: z.ZodNumber;
}, z.core.$strip>;
declare const bulkCreatePaymentsSchema: z.ZodObject<{
    classId: z.ZodString;
    amount: z.ZodNumber;
    description: z.ZodString;
    dueDate: z.ZodString;
    referenceMonth: z.ZodNumber;
    referenceYear: z.ZodNumber;
}, z.core.$strip>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
export type GetPaymentParams = z.infer<typeof getPaymentParamsSchema>;
export type GetPaymentsQuery = z.infer<typeof getPaymentsQuerySchema>;
export type MarkPaymentPaidInput = z.infer<typeof markPaymentPaidSchema>;
export type PaymentResponse = z.infer<typeof paymentResponseSchema>;
export type GetPaymentsResponse = z.infer<typeof getPaymentsResponseSchema>;
export type PaymentStatsResponse = z.infer<typeof paymentStatsResponseSchema>;
export type BulkCreatePaymentsInput = z.infer<typeof bulkCreatePaymentsSchema>;
export { createPaymentSchema, updatePaymentSchema, getPaymentParamsSchema, getPaymentsQuerySchema, markPaymentPaidSchema, paymentResponseSchema, getPaymentsResponseSchema, paymentStatsResponseSchema, bulkCreatePaymentsSchema, };
//# sourceMappingURL=payment.schema.d.ts.map