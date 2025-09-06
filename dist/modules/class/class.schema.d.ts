import { z } from "zod";
declare const createClassSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        CORPORATE: "CORPORATE";
        PRIVATE: "PRIVATE";
    }>;
    level: z.ZodEnum<{
        A1: "A1";
        A2: "A2";
        B1: "B1";
        B2: "B2";
        C1: "C1";
        C2: "C2";
        CONVERSATION_A1: "CONVERSATION_A1";
        CONVERSATION_A2: "CONVERSATION_A2";
        CONVERSATION_B1: "CONVERSATION_B1";
        CONVERSATION_B2: "CONVERSATION_B2";
        CONVERSATION_C1: "CONVERSATION_C1";
        CONVERSATION_C2: "CONVERSATION_C2";
    }>;
    maxStudents: z.ZodDefault<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    startTime: z.ZodString;
    endTime: z.ZodString;
    dayOfWeek: z.ZodNumber;
    consultantId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updateClassSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        CORPORATE: "CORPORATE";
        PRIVATE: "PRIVATE";
    }>>;
    level: z.ZodOptional<z.ZodEnum<{
        A1: "A1";
        A2: "A2";
        B1: "B1";
        B2: "B2";
        C1: "C1";
        C2: "C2";
        CONVERSATION_A1: "CONVERSATION_A1";
        CONVERSATION_A2: "CONVERSATION_A2";
        CONVERSATION_B1: "CONVERSATION_B1";
        CONVERSATION_B2: "CONVERSATION_B2";
        CONVERSATION_C1: "CONVERSATION_C1";
        CONVERSATION_C2: "CONVERSATION_C2";
    }>>;
    maxStudents: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    dayOfWeek: z.ZodOptional<z.ZodNumber>;
    consultantId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const getClassParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const getClassesQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        CORPORATE: "CORPORATE";
        PRIVATE: "PRIVATE";
    }>>;
    level: z.ZodOptional<z.ZodEnum<{
        A1: "A1";
        A2: "A2";
        B1: "B1";
        B2: "B2";
        C1: "C1";
        C2: "C2";
        CONVERSATION_A1: "CONVERSATION_A1";
        CONVERSATION_A2: "CONVERSATION_A2";
        CONVERSATION_B1: "CONVERSATION_B1";
        CONVERSATION_B2: "CONVERSATION_B2";
        CONVERSATION_C1: "CONVERSATION_C1";
        CONVERSATION_C2: "CONVERSATION_C2";
    }>>;
    consultantId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const enrollStudentSchema: z.ZodObject<{
    studentId: z.ZodString;
}, z.core.$strip>;
declare const classResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<{
        CORPORATE: "CORPORATE";
        PRIVATE: "PRIVATE";
    }>;
    level: z.ZodEnum<{
        A1: "A1";
        A2: "A2";
        B1: "B1";
        B2: "B2";
        C1: "C1";
        C2: "C2";
        CONVERSATION_A1: "CONVERSATION_A1";
        CONVERSATION_A2: "CONVERSATION_A2";
        CONVERSATION_B1: "CONVERSATION_B1";
        CONVERSATION_B2: "CONVERSATION_B2";
        CONVERSATION_C1: "CONVERSATION_C1";
        CONVERSATION_C2: "CONVERSATION_C2";
    }>;
    maxStudents: z.ZodNumber;
    isActive: z.ZodBoolean;
    startTime: z.ZodString;
    endTime: z.ZodString;
    dayOfWeek: z.ZodNumber;
    consultantId: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    consultant: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        fullName: z.ZodString;
        email: z.ZodString;
    }, z.core.$strip>>;
    enrollments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        studentId: z.ZodString;
        enrolledAt: z.ZodString;
        isActive: z.ZodBoolean;
        student: z.ZodObject<{
            id: z.ZodString;
            fullName: z.ZodString;
            email: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const getClassesResponseSchema: z.ZodObject<{
    classes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        type: z.ZodEnum<{
            CORPORATE: "CORPORATE";
            PRIVATE: "PRIVATE";
        }>;
        level: z.ZodEnum<{
            A1: "A1";
            A2: "A2";
            B1: "B1";
            B2: "B2";
            C1: "C1";
            C2: "C2";
            CONVERSATION_A1: "CONVERSATION_A1";
            CONVERSATION_A2: "CONVERSATION_A2";
            CONVERSATION_B1: "CONVERSATION_B1";
            CONVERSATION_B2: "CONVERSATION_B2";
            CONVERSATION_C1: "CONVERSATION_C1";
            CONVERSATION_C2: "CONVERSATION_C2";
        }>;
        maxStudents: z.ZodNumber;
        isActive: z.ZodBoolean;
        startTime: z.ZodString;
        endTime: z.ZodString;
        dayOfWeek: z.ZodNumber;
        consultantId: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        consultant: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            fullName: z.ZodString;
            email: z.ZodString;
        }, z.core.$strip>>;
        enrollments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            studentId: z.ZodString;
            enrolledAt: z.ZodString;
            isActive: z.ZodBoolean;
            student: z.ZodObject<{
                id: z.ZodString;
                fullName: z.ZodString;
                email: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    total: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
}, z.core.$strip>;
declare const deleteClassResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
declare const enrollmentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    classId: z.ZodString;
    studentId: z.ZodString;
    enrolledAt: z.ZodString;
    isActive: z.ZodBoolean;
}, z.core.$strip>;
export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
export type GetClassParams = z.infer<typeof getClassParamsSchema>;
export type GetClassesQuery = z.infer<typeof getClassesQuerySchema>;
export type EnrollStudentInput = z.infer<typeof enrollStudentSchema>;
export type ClassResponse = z.infer<typeof classResponseSchema>;
export type GetClassesResponse = z.infer<typeof getClassesResponseSchema>;
export type DeleteClassResponse = z.infer<typeof deleteClassResponseSchema>;
export type EnrollmentResponse = z.infer<typeof enrollmentResponseSchema>;
export { createClassSchema, updateClassSchema, getClassParamsSchema, getClassesQuerySchema, enrollStudentSchema, classResponseSchema, getClassesResponseSchema, deleteClassResponseSchema, enrollmentResponseSchema, };
//# sourceMappingURL=class.schema.d.ts.map