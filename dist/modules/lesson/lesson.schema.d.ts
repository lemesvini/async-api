import { z } from "zod";
export declare const createLessonSchema: z.ZodObject<{
    classId: z.ZodString;
    contentId: z.ZodString;
    lessonDate: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateLessonSchema: z.ZodObject<{
    contentId: z.ZodOptional<z.ZodString>;
    lessonDate: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    wasCompleted: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const getLessonParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const getClassLessonsParamsSchema: z.ZodObject<{
    classId: z.ZodString;
}, z.core.$strip>;
export declare const lessonResponseSchema: z.ZodObject<{
    id: z.ZodString;
    classId: z.ZodString;
    contentId: z.ZodString;
    lessonDate: z.ZodString;
    notes: z.ZodNullable<z.ZodString>;
    wasCompleted: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    class: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodString;
        level: z.ZodString;
    }, z.core.$strip>>;
    content: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        module: z.ZodString;
        order: z.ZodNumber;
    }, z.core.$strip>>;
    attendance: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        studentId: z.ZodString;
        status: z.ZodEnum<{
            PRESENT: "PRESENT";
            ABSENT: "ABSENT";
            LATE: "LATE";
            EXCUSED: "EXCUSED";
        }>;
        notes: z.ZodNullable<z.ZodString>;
        student: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            fullName: z.ZodString;
            email: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
export type GetLessonParams = z.infer<typeof getLessonParamsSchema>;
export type GetClassLessonsParams = z.infer<typeof getClassLessonsParamsSchema>;
export type LessonResponse = z.infer<typeof lessonResponseSchema>;
//# sourceMappingURL=lesson.schema.d.ts.map