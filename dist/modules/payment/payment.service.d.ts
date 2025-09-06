import { CreatePaymentInput, UpdatePaymentInput, GetPaymentParams, GetPaymentsQuery, MarkPaymentPaidInput, BulkCreatePaymentsInput } from "./payment.schema";
export declare function createPayment(input: CreatePaymentInput): Promise<{
    amount: number;
    dueDate: string;
    paidDate: string | null;
    createdAt: string;
    updatedAt: string;
    student: {
        email: string;
        fullName: string;
        id: string;
    };
    class: {
        id: string;
        name: string;
    } | null;
    id: string;
    notes: string | null;
    description: string;
    studentId: string;
    classId: string | null;
    status: import("@prisma/client").$Enums.PaymentStatus;
    referenceMonth: number;
    referenceYear: number;
}>;
export declare function getPaymentById(params: GetPaymentParams): Promise<{
    amount: number;
    dueDate: string;
    paidDate: string | null;
    createdAt: string;
    updatedAt: string;
    student: {
        email: string;
        fullName: string;
        id: string;
    };
    class: {
        id: string;
        name: string;
    } | null;
    id: string;
    notes: string | null;
    description: string;
    studentId: string;
    classId: string | null;
    status: import("@prisma/client").$Enums.PaymentStatus;
    referenceMonth: number;
    referenceYear: number;
} | null>;
export declare function getPayments(query?: GetPaymentsQuery): Promise<{
    payments: {
        amount: number;
        dueDate: string;
        paidDate: string | null;
        createdAt: string;
        updatedAt: string;
        student: {
            email: string;
            fullName: string;
            id: string;
        };
        class: {
            id: string;
            name: string;
        } | null;
        id: string;
        notes: string | null;
        description: string;
        studentId: string;
        classId: string | null;
        status: import("@prisma/client").$Enums.PaymentStatus;
        referenceMonth: number;
        referenceYear: number;
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function updatePayment(params: GetPaymentParams, input: UpdatePaymentInput): Promise<{
    amount: number;
    dueDate: string;
    paidDate: string | null;
    createdAt: string;
    updatedAt: string;
    student: {
        email: string;
        fullName: string;
        id: string;
    };
    class: {
        id: string;
        name: string;
    } | null;
    id: string;
    notes: string | null;
    description: string;
    studentId: string;
    classId: string | null;
    status: import("@prisma/client").$Enums.PaymentStatus;
    referenceMonth: number;
    referenceYear: number;
}>;
export declare function deletePayment(params: GetPaymentParams): Promise<{
    message: string;
}>;
export declare function markPaymentAsPaid(params: GetPaymentParams, input: MarkPaymentPaidInput): Promise<{
    amount: number;
    dueDate: string;
    paidDate: string | null;
    createdAt: string;
    updatedAt: string;
    student: {
        email: string;
        fullName: string;
        id: string;
    };
    class: {
        id: string;
        name: string;
    } | null;
    id: string;
    notes: string | null;
    description: string;
    studentId: string;
    classId: string | null;
    status: import("@prisma/client").$Enums.PaymentStatus;
    referenceMonth: number;
    referenceYear: number;
}>;
export declare function getPaymentStats(): Promise<{
    totalPayments: number;
    paidPayments: number;
    pendingPayments: number;
    overduePayments: number;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    overdueAmount: number;
}>;
export declare function createBulkPaymentsForClass(input: BulkCreatePaymentsInput): Promise<{
    message: string;
    paymentsCreated: number;
    studentsAffected: {
        id: string;
        name: string;
        email: string;
    }[];
}>;
export declare function getStudentPayments(studentId: string, query?: GetPaymentsQuery): Promise<{
    payments: {
        amount: number;
        dueDate: string;
        paidDate: string | null;
        createdAt: string;
        updatedAt: string;
        student: {
            email: string;
            fullName: string;
            id: string;
        };
        class: {
            id: string;
            name: string;
        } | null;
        id: string;
        notes: string | null;
        description: string;
        studentId: string;
        classId: string | null;
        status: import("@prisma/client").$Enums.PaymentStatus;
        referenceMonth: number;
        referenceYear: number;
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
//# sourceMappingURL=payment.service.d.ts.map