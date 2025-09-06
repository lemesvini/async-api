"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContentResponseSchema = exports.getContentsResponseSchema = exports.contentResponseSchema = exports.getContentsQuerySchema = exports.getContentsByModuleParamsSchema = exports.getContentParamsSchema = exports.updateContentSchema = exports.createContentSchema = void 0;
const zod_1 = require("zod");
const createContentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().optional(),
    module: zod_1.z.enum([
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
    order: zod_1.z.number().min(1),
    presentationUrl: zod_1.z.string().url().optional(),
    studentsPdfUrl: zod_1.z.string().url().optional(),
    homeworkUrl: zod_1.z.string().url().optional(),
    isActive: zod_1.z.boolean().default(true),
});
exports.createContentSchema = createContentSchema;
const updateContentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200).optional(),
    description: zod_1.z.string().optional(),
    module: zod_1.z
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
    order: zod_1.z.number().min(1).optional(),
    presentationUrl: zod_1.z.string().url().optional(),
    studentsPdfUrl: zod_1.z.string().url().optional(),
    homeworkUrl: zod_1.z.string().url().optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateContentSchema = updateContentSchema;
const getContentParamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.getContentParamsSchema = getContentParamsSchema;
const getContentsByModuleParamsSchema = zod_1.z.object({
    module: zod_1.z.enum([
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
});
exports.getContentsByModuleParamsSchema = getContentsByModuleParamsSchema;
const getContentsQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    module: zod_1.z
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
    isActive: zod_1.z.string().optional(),
});
exports.getContentsQuerySchema = getContentsQuerySchema;
const contentResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    module: zod_1.z.enum([
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
    order: zod_1.z.number(),
    presentationUrl: zod_1.z.string().nullable(),
    studentsPdfUrl: zod_1.z.string().nullable(),
    homeworkUrl: zod_1.z.string().nullable(),
    isActive: zod_1.z.boolean(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    classLessons: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string(),
        classId: zod_1.z.string(),
        lessonDate: zod_1.z.string().datetime(),
        notes: zod_1.z.string().nullable(),
        wasCompleted: zod_1.z.boolean(),
        class: zod_1.z.object({
            id: zod_1.z.string(),
            name: zod_1.z.string(),
        }),
    }))
        .optional(),
});
exports.contentResponseSchema = contentResponseSchema;
const getContentsResponseSchema = zod_1.z.object({
    contents: zod_1.z.array(contentResponseSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPages: zod_1.z.number(),
});
exports.getContentsResponseSchema = getContentsResponseSchema;
const deleteContentResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.deleteContentResponseSchema = deleteContentResponseSchema;
//# sourceMappingURL=contents.schema.js.map