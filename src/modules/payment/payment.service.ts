import prisma from "../../utils/prisma";
import {
  CreatePaymentInput,
  UpdatePaymentInput,
  GetPaymentParams,
  GetPaymentsQuery,
  MarkPaymentPaidInput,
  BulkCreatePaymentsInput,
} from "./payment.schema";

export async function createPayment(input: CreatePaymentInput) {
  const payment = await prisma.payment.create({
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

export async function getPaymentById(params: GetPaymentParams) {
  const payment = await prisma.payment.findUnique({
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

  if (!payment) return null;

  return {
    ...payment,
    amount: Number(payment.amount),
    dueDate: payment.dueDate.toISOString(),
    paidDate: payment.paidDate?.toISOString() || null,
    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.updatedAt.toISOString(),
  };
}

export async function getPayments(query: GetPaymentsQuery = {}) {
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "10");
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy || "dueDate";
  const sortOrder = query.sortOrder || "desc";

  // Build where clause
  const whereClause: any = {};

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
    prisma.payment.findMany({
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
    prisma.payment.count({
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

export async function updatePayment(
  params: GetPaymentParams,
  input: UpdatePaymentInput
) {
  const updateData: any = { ...input };

  if (input.dueDate) {
    updateData.dueDate = new Date(input.dueDate);
  }

  if (input.paidDate) {
    updateData.paidDate = new Date(input.paidDate);
  }

  const payment = await prisma.payment.update({
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

export async function deletePayment(params: GetPaymentParams) {
  await prisma.payment.delete({
    where: {
      id: params.id,
    },
  });

  return { message: "Payment deleted successfully" };
}

export async function markPaymentAsPaid(
  params: GetPaymentParams,
  input: MarkPaymentPaidInput
) {
  const paidDate = input.paidDate ? new Date(input.paidDate) : new Date();

  const payment = await prisma.payment.update({
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

export async function getPaymentStats() {
  // Update overdue payments first
  await updateOverduePayments();

  const [
    totalPayments,
    paidPayments,
    pendingPayments,
    overduePayments,
    totalAmount,
    paidAmount,
    pendingAmount,
    overdueAmount,
  ] = await Promise.all([
    prisma.payment.count(),
    prisma.payment.count({ where: { status: "PAID" } }),
    prisma.payment.count({ where: { status: "PENDING" } }),
    prisma.payment.count({ where: { status: "OVERDUE" } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
    prisma.payment.aggregate({
      where: { status: "PAID" },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      where: { status: "PENDING" },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
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

export async function createBulkPaymentsForClass(
  input: BulkCreatePaymentsInput
) {
  // Get all active students enrolled in the class
  const enrollments = await prisma.classEnrollment.findMany({
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

  const payments = await prisma.payment.createMany({
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

export async function getStudentPayments(
  studentId: string,
  query: GetPaymentsQuery = {}
) {
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "10");
  const skip = (page - 1) * limit;

  const whereClause: any = { studentId };

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
    prisma.payment.findMany({
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
    prisma.payment.count({
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

  await prisma.payment.updateMany({
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
