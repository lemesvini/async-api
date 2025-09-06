"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonResponseSchema = exports.getClassLessonsParamsSchema = exports.getLessonParamsSchema = exports.updateLessonSchema = exports.createLessonSchema = void 0;
const zod_1 = require("zod");
// Create lesson input schema
exports.createLessonSchema = zod_1.z.object({
    classId: zod_1.z.string().min(1, "Class ID is required"),
    contentId: zod_1.z.string().min(1, "Content ID is required"),
    lessonDate: zod_1.z.string().datetime("Invalid lesson date format"),
    notes: zod_1.z.string().optional(),
});
// Update lesson input schema
exports.updateLessonSchema = zod_1.z.object({
    contentId: zod_1.z.string().optional(),
    lessonDate: zod_1.z.string().datetime().optional(),
    notes: zod_1.z.string().optional(),
    wasCompleted: zod_1.z.boolean().optional(),
});
// Lesson params schema
exports.getLessonParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "Lesson ID is required"),
});
// Class lessons params schema
exports.getClassLessonsParamsSchema = zod_1.z.object({
    classId: zod_1.z.string().min(1, "Class ID is required"),
});
// Lesson response schema
exports.lessonResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    classId: zod_1.z.string(),
    contentId: zod_1.z.string(),
    lessonDate: zod_1.z.string().datetime(),
    notes: zod_1.z.string().nullable(),
    wasCompleted: zod_1.z.boolean(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    class: zod_1.z
        .object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        type: zod_1.z.string(),
        level: zod_1.z.string(),
    })
        .optional(),
    content: zod_1.z
        .object({
        id: zod_1.z.string(),
        title: zod_1.z.string(),
        description: zod_1.z.string().nullable(),
        module: zod_1.z.string(),
        order: zod_1.z.number(),
    })
        .optional(),
    attendance: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string(),
        studentId: zod_1.z.string(),
        status: zod_1.z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
        notes: zod_1.z.string().nullable(),
        student: zod_1.z
            .object({
            id: zod_1.z.string(),
            fullName: zod_1.z.string(),
            email: zod_1.z.string(),
        })
            .optional(),
    }))
        .optional(),
});
//# sourceMappingURL=lesson.schema.js.map