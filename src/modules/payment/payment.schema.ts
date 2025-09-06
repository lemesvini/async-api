import { z } from "zod";

// Payment schemas
const createPaymentSchema = z.object({
  studentId: z.string(),
  classId: z.string().optional(),
  amount: z.number().positive(),
  description: z.string().min(1).max(255),
  dueDate: z.string().datetime(),
  referenceMonth: z.number().min(1).max(12),
  referenceYear: z.number().min(2020).max(2050),
  notes: z.string().optional(),
});

const updatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  description: z.string().min(1).max(255).optional(),
  status: z.enum(["PENDING", "PAID", "OVERDUE", "CANCELLED"]).optional(),
  dueDate: z.string().datetime().optional(),
  paidDate: z.string().datetime().optional(),
  referenceMonth: z.number().min(1).max(12).optional(),
  referenceYear: z.number().min(2020).max(2050).optional(),
  notes: z.string().optional(),
});

const getPaymentParamsSchema = z.object({
  id: z.string(),
});

const getPaymentsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.enum(["PENDING", "PAID", "OVERDUE", "CANCELLED"]).optional(),
  studentId: z.string().optional(),
  classId: z.string().optional(),
  referenceMonth: z.string().optional(),
  referenceYear: z.string().optional(),
  sortBy: z.enum(["dueDate", "paidDate", "amount", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

const markPaymentPaidSchema = z.object({
  paidDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

// Response schemas
const paymentResponseSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  classId: z.string().nullable(),
  amount: z.number(),
  description: z.string(),
  status: z.enum(["PENDING", "PAID", "OVERDUE", "CANCELLED"]),
  dueDate: z.string().datetime(),
  paidDate: z.string().datetime().nullable(),
  referenceMonth: z.number(),
  referenceYear: z.number(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  student: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
  }),
  class: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

const getPaymentsResponseSchema = z.object({
  payments: z.array(paymentResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

const paymentStatsResponseSchema = z.object({
  totalPayments: z.number(),
  paidPayments: z.number(),
  pendingPayments: z.number(),
  overduePayments: z.number(),
  totalAmount: z.number(),
  paidAmount: z.number(),
  pendingAmount: z.number(),
  overdueAmount: z.number(),
});

const bulkCreatePaymentsSchema = z.object({
  classId: z.string(),
  amount: z.number().positive(),
  description: z.string().min(1).max(255),
  dueDate: z.string().datetime(),
  referenceMonth: z.number().min(1).max(12),
  referenceYear: z.number().min(2020).max(2050),
});

// Export types
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
export type GetPaymentParams = z.infer<typeof getPaymentParamsSchema>;
export type GetPaymentsQuery = z.infer<typeof getPaymentsQuerySchema>;
export type MarkPaymentPaidInput = z.infer<typeof markPaymentPaidSchema>;
export type PaymentResponse = z.infer<typeof paymentResponseSchema>;
export type GetPaymentsResponse = z.infer<typeof getPaymentsResponseSchema>;
export type PaymentStatsResponse = z.infer<typeof paymentStatsResponseSchema>;
export type BulkCreatePaymentsInput = z.infer<typeof bulkCreatePaymentsSchema>;

// Export schemas
export {
  createPaymentSchema,
  updatePaymentSchema,
  getPaymentParamsSchema,
  getPaymentsQuerySchema,
  markPaymentPaidSchema,
  paymentResponseSchema,
  getPaymentsResponseSchema,
  paymentStatsResponseSchema,
  bulkCreatePaymentsSchema,
};
