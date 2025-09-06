import { z } from "zod";
declare const createContentSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    module: z.ZodEnum<{
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
    order: z.ZodNumber;
    presentationUrl: z.ZodOptional<z.ZodString>;
    studentsPdfUrl: z.ZodOptional<z.ZodString>;
    homeworkUrl: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
declare const updateContentSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    module: z.ZodOptional<z.ZodEnum<{
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
    order: z.ZodOptional<z.ZodNumber>;
    presentationUrl: z.ZodOptional<z.ZodString>;
    studentsPdfUrl: z.ZodOptional<z.ZodString>;
    homeworkUrl: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const getContentParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const getContentsByModuleParamsSchema: z.ZodObject<{
    module: z.ZodEnum<{
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
}, z.core.$strip>;
declare const getContentsQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    module: z.ZodOptional<z.ZodEnum<{
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
    isActive: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const contentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    module: z.ZodEnum<{
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
    order: z.ZodNumber;
    presentationUrl: z.ZodNullable<z.ZodString>;
    studentsPdfUrl: z.ZodNullable<z.ZodString>;
    homeworkUrl: z.ZodNullable<z.ZodString>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    classLessons: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        classId: z.ZodString;
        lessonDate: z.ZodString;
        notes: z.ZodNullable<z.ZodString>;
        wasCompleted: z.ZodBoolean;
        class: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const getContentsResponseSchema: z.ZodObject<{
    contents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        module: z.ZodEnum<{
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
        order: z.ZodNumber;
        presentationUrl: z.ZodNullable<z.ZodString>;
        studentsPdfUrl: z.ZodNullable<z.ZodString>;
        homeworkUrl: z.ZodNullable<z.ZodString>;
        isActive: z.ZodBoolean;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        classLessons: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            classId: z.ZodString;
            lessonDate: z.ZodString;
            notes: z.ZodNullable<z.ZodString>;
            wasCompleted: z.ZodBoolean;
            class: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    total: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
}, z.core.$strip>;
declare const deleteContentResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
export type GetContentParams = z.infer<typeof getContentParamsSchema>;
export type GetContentsByModuleParams = z.infer<typeof getContentsByModuleParamsSchema>;
export type GetContentsQuery = z.infer<typeof getContentsQuerySchema>;
export type ContentResponse = z.infer<typeof contentResponseSchema>;
export type GetContentsResponse = z.infer<typeof getContentsResponseSchema>;
export type DeleteContentResponse = z.infer<typeof deleteContentResponseSchema>;
export { createContentSchema, updateContentSchema, getContentParamsSchema, getContentsByModuleParamsSchema, getContentsQuerySchema, contentResponseSchema, getContentsResponseSchema, deleteContentResponseSchema, };
//# sourceMappingURL=contents.schema.d.ts.map