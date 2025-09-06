"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentResponseSchema = exports.deleteClassResponseSchema = exports.getClassesResponseSchema = exports.classResponseSchema = exports.enrollStudentSchema = exports.getClassesQuerySchema = exports.getClassParamsSchema = exports.updateClassSchema = exports.createClassSchema = void 0;
const zod_1 = require("zod");
const createClassSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().optional(),
    type: zod_1.z.enum(["CORPORATE", "PRIVATE"]),
    level: zod_1.z.enum([
        "A1",
        "A2",
        "B1",
        "B2",
        "C1",
        "C2",
        "CONVERSATION_A1",
        "CONVERSATION_A2",
        "CONVERSATION_B1",
        "CONVERSATION_B2",
        "CONVERSATION_C1",
        "CONVERSATION_C2",
    ]),
    maxStudents: zod_1.z.number().min(1).max(50).default(10),
    isActive: zod_1.z.boolean().default(true),
    startTime: zod_1.z.string().datetime(),
    endTime: zod_1.z.string().datetime(),
    dayOfWeek: zod_1.z.number().min(0).max(6), // 0 = Sunday, 1 = Monday, etc.
    consultantId: zod_1.z.string().min(1).optional(),
});
exports.createClassSchema = createClassSchema;
const updateClassSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().optional(),
    type: zod_1.z.enum(["CORPORATE", "PRIVATE"]).optional(),
    level: zod_1.z
        .enum([
        "A1",
        "A2",
        "B1",
        "B2",
        "C1",
        "C2",
        "CONVERSATION_A1",
        "CONVERSATION_A2",
        "CONVERSATION_B1",
        "CONVERSATION_B2",
        "CONVERSATION_C1",
        "CONVERSATION_C2",
    ])
        .optional(),
    maxStudents: zod_1.z.number().min(1).max(50).optional(),
    isActive: zod_1.z.boolean().optional(),
    startTime: zod_1.z.string().datetime().optional(),
    endTime: zod_1.z.string().datetime().optional(),
    dayOfWeek: zod_1.z.number().min(0).max(6).optional(),
    consultantId: zod_1.z.string().min(1).optional(),
});
exports.updateClassSchema = updateClassSchema;
const getClassParamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.getClassParamsSchema = getClassParamsSchema;
const getClassesQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    type: zod_1.z.enum(["CORPORATE", "PRIVATE"]).optional(),
    level: zod_1.z
        .enum([
        "A1",
        "A2",
        "B1",
        "B2",
        "C1",
        "C2",
        "CONVERSATION_A1",
        "CONVERSATION_A2",
        "CONVERSATION_B1",
        "CONVERSATION_B2",
        "CONVERSATION_C1",
        "CONVERSATION_C2",
    ])
        .optional(),
    consultantId: zod_1.z.string().optional(),
    isActive: zod_1.z.string().optional(),
});
exports.getClassesQuerySchema = getClassesQuerySchema;
const enrollStudentSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(1),
});
exports.enrollStudentSchema = enrollStudentSchema;
const classResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    type: zod_1.z.enum(["CORPORATE", "PRIVATE"]),
    level: zod_1.z.enum([
        "A1",
        "A2",
        "B1",
        "B2",
        "C1",
        "C2",
        "CONVERSATION_A1",
        "CONVERSATION_A2",
        "CONVERSATION_B1",
        "CONVERSATION_B2",
        "CONVERSATION_C1",
        "CONVERSATION_C2",
    ]),
    maxStudents: zod_1.z.number(),
    isActive: zod_1.z.boolean(),
    startTime: zod_1.z.string().datetime(),
    endTime: zod_1.z.string().datetime(),
    dayOfWeek: zod_1.z.number(),
    consultantId: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    consultant: zod_1.z
        .object({
        id: zod_1.z.string(),
        fullName: zod_1.z.string(),
        email: zod_1.z.string(),
    })
        .optional(),
    enrollments: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string(),
        studentId: zod_1.z.string(),
        enrolledAt: zod_1.z.string().datetime(),
        isActive: zod_1.z.boolean(),
        student: zod_1.z.object({
            id: zod_1.z.string(),
            fullName: zod_1.z.string(),
            email: zod_1.z.string(),
        }),
    }))
        .optional(),
});
exports.classResponseSchema = classResponseSchema;
const getClassesResponseSchema = zod_1.z.object({
    classes: zod_1.z.array(classResponseSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPages: zod_1.z.number(),
});
exports.getClassesResponseSchema = getClassesResponseSchema;
const deleteClassResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.deleteClassResponseSchema = deleteClassResponseSchema;
const enrollmentResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    classId: zod_1.z.string(),
    studentId: zod_1.z.string(),
    enrolledAt: zod_1.z.string().datetime(),
    isActive: zod_1.z.boolean(),
});
exports.enrollmentResponseSchema = enrollmentResponseSchema;
//# sourceMappingURL=class.schema.js.map