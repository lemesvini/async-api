"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
exports.getPaymentById = getPaymentById;
exports.getPayments = getPayments;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;
exports.markPaymentAsPaid = markPaymentAsPaid;
exports.getPaymentStats = getPaymentStats;
exports.createBulkPaymentsForClass = createBulkPaymentsForClass;
exports.getStudentPayments = getStudentPayments;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function createPayment(input) {
    const payment = await prisma_1.default.payment.create({
        data: {
            ...input,
            amount: input.amount,
            dueDate: new Date(input.dueDate),
        },
        include: {
            student: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                },
            },
            class: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return {
        ...payment,
        amount: Number(payment.amount),
        dueDate: payment.dueDate.toISOString(),
        paidDate: payment.paidDate?.toISOString() || null,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
    };
}
async function getPaymentById(params) {
    const payment = await prisma_1.default.payment.findUnique({
        where: {
            id: params.id,
        },
        include: {
            student: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                },
            },
            class: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!payment)
        return null;
    return {
        ...payment,
        amount: Number(payment.amount),
        dueDate: payment.dueDate.toISOString(),
        paidDate: payment.paidDate?.toISOString() || null,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
    };
}
async function getPayments(query = {}) {
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "10");
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy || "dueDate";
    const sortOrder = query.sortOrder || "desc";
    // Build where clause
    const whereClause = {};
    if (query.status) {
        whereClause.status = query.status;
    }
    if (query.studentId) {
        whereClause.studentId = query.studentId;
    }
    if (query.classId) {
        whereClause.classId = query.classId;
    }
    if (query.referenceMonth) {
        whereClause.referenceMonth = parseInt(query.referenceMonth);
    }
    if (query.referenceYear) {
        whereClause.referenceYear = parseInt(query.referenceYear);
    }
    // Check for overdue payments and update status
    await updateOverduePayments();
    const [payments, total] = await Promise.all([
        prisma_1.default.payment.findMany({
            where: whereClause,
            include: {
                student: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
                class: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma_1.default.payment.count({
            where: whereClause,
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    // Serialize dates and amounts
    const serializedPayments = payments.map((payment) => ({
        ...payment,
        amount: Number(payment.amount),
        dueDate: payment.dueDate.toISOString(),
        paidDate: payment.paidDate?.toISOString() || null,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
    }));
    return {
        payments: serializedPayments,
        total,
        page,
        limit,
        totalPages,
    };
}
async function updatePayment(params, input) {
    const updateData = { ...input };
    if (input.dueDate) {
        updateData.dueDate = new Date(input.dueDate);
    }
    if (input.paidDate) {
        updateData.paidDate = new Date(input.paidDate);
    }
    const payment = await prisma_1.default.payment.update({
        where: {
            id: params.id,
        },
        data: updateData,
        include: {
            student: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                },
            },
            class: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return {
        ...payment,
        amount: Number(payment.amount),
        dueDate: payment.dueDate.toISOString(),
        paidDate: payment.paidDate?.toISOString() || null,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
    };
}
async function deletePayment(params) {
    await prisma_1.default.payment.delete({
        where: {
            id: params.id,
        },
    });
    return { message: "Payment deleted successfully" };
}
async function markPaymentAsPaid(params, input) {
    const paidDate = input.paidDate ? new Date(input.paidDate) : new Date();
    const payment = await prisma_1.default.payment.update({
        where: {
            id: params.id,
        },
        data: {
            status: "PAID",
            paidDate,
            notes: input.notes,
        },
        include: {
            student: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                },
            },
            class: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return {
        ...payment,
        amount: Number(payment.amount),
        dueDate: payment.dueDate.toISOString(),
        paidDate: payment.paidDate?.toISOString() || null,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
    };
}
async function getPaymentStats() {
    // Update overdue payments first
    await updateOverduePayments();
    const [totalPayments, paidPayments, pendingPayments, overduePayments, totalAmount, paidAmount, pendingAmount, overdueAmount,] = await Promise.all([
        prisma_1.default.payment.count(),
        prisma_1.default.payment.count({ where: { status: "PAID" } }),
        prisma_1.default.payment.count({ where: { status: "PENDING" } }),
        prisma_1.default.payment.count({ where: { status: "OVERDUE" } }),
        prisma_1.default.payment.aggregate({ _sum: { amount: true } }),
        prisma_1.default.payment.aggregate({
            where: { status: "PAID" },
            _sum: { amount: true },
        }),
        prisma_1.default.payment.aggregate({
            where: { status: "PENDING" },
            _sum: { amount: true },
        }),
        prisma_1.default.payment.aggregate({
            where: { status: "OVERDUE" },
            _sum: { amount: true },
        }),
    ]);
    return {
        totalPayments,
        paidPayments,
        pendingPayments,
        overduePayments,
        totalAmount: Number(totalAmount._sum.amount || 0),
        paidAmount: Number(paidAmount._sum.amount || 0),
        pendingAmount: Number(pendingAmount._sum.amount || 0),
        overdueAmount: Number(overdueAmount._sum.amount || 0),
    };
}
async function createBulkPaymentsForClass(input) {
    // Get all active students enrolled in the class
    const enrollments = await prisma_1.default.classEnrollment.findMany({
        where: {
            classId: input.classId,
            isActive: true,
        },
        include: {
            student: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                },
            },
        },
    });
    if (enrollments.length === 0) {
        throw new Error("No active students found in this class");
    }
    // Create payments for all enrolled students
    const paymentsData = enrollments.map((enrollment) => ({
        studentId: enrollment.studentId,
        classId: input.classId,
        amount: input.amount,
        description: input.description,
        dueDate: new Date(input.dueDate),
        referenceMonth: input.referenceMonth,
        referenceYear: input.referenceYear,
    }));
    const payments = await prisma_1.default.payment.createMany({
        data: paymentsData,
    });
    return {
        message: `Successfully created ${payments.count} payments for class`,
        paymentsCreated: payments.count,
        studentsAffected: enrollments.map((e) => ({
            id: e.student.id,
            name: e.student.fullName,
            email: e.student.email,
        })),
    };
}
async function getStudentPayments(studentId, query = {}) {
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "10");
    const skip = (page - 1) * limit;
    const whereClause = { studentId };
    if (query.status) {
        whereClause.status = query.status;
    }
    if (query.classId) {
        whereClause.classId = query.classId;
    }
    if (query.referenceMonth) {
        whereClause.referenceMonth = parseInt(query.referenceMonth);
    }
    if (query.referenceYear) {
        whereClause.referenceYear = parseInt(query.referenceYear);
    }
    // Update overdue payments
    await updateOverduePayments();
    const [payments, total] = await Promise.all([
        prisma_1.default.payment.findMany({
            where: whereClause,
            include: {
                student: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
                class: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: {
                dueDate: "desc",
            },
        }),
        prisma_1.default.payment.count({
            where: whereClause,
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    const serializedPayments = payments.map((payment) => ({
        ...payment,
        amount: Number(payment.amount),
        dueDate: payment.dueDate.toISOString(),
        paidDate: payment.paidDate?.toISOString() || null,
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
    }));
    return {
        payments: serializedPayments,
        total,
        page,
        limit,
        totalPages,
    };
}
// Helper function to automatically update overdue payments
async function updateOverduePayments() {
    const now = new Date();
    await prisma_1.default.payment.updateMany({
        where: {
            status: "PENDING",
            dueDate: {
                lt: now,
            },
        },
        data: {
            status: "OVERDUE",
        },
    });
}
//# sourceMappingURL=payment.service.js.map