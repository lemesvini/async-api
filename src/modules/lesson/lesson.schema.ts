import { z } from "zod";

// Create lesson input schema
export const createLessonSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
  contentId: z.string().min(1, "Content ID is required"),
  lessonDate: z.string().datetime("Invalid lesson date format"),
  notes: z.string().optional(),
});

// Update lesson input schema
export const updateLessonSchema = z.object({
  contentId: z.string().optional(),
  lessonDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  wasCompleted: z.boolean().optional(),
});

// Lesson params schema
export const getLessonParamsSchema = z.object({
  id: z.string().min(1, "Lesson ID is required"),
});

// Class lessons params schema
export const getClassLessonsParamsSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
});

// Lesson response schema
export const lessonResponseSchema = z.object({
  id: z.string(),
  classId: z.string(),
  contentId: z.string(),
  lessonDate: z.string().datetime(),
  notes: z.string().nullable(),
  wasCompleted: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  class: z
    .object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      level: z.string(),
    })
    .optional(),
  content: z
    .object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      module: z.string(),
      order: z.number(),
    })
    .optional(),
  attendance: z
    .array(
      z.object({
        id: z.string(),
        studentId: z.string(),
        status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
        notes: z.string().nullable(),
        student: z
          .object({
            id: z.string(),
            fullName: z.string(),
            email: z.string(),
          })
          .optional(),
      })
    )
    .optional(),
});

// Export types
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
export type GetLessonParams = z.infer<typeof getLessonParamsSchema>;
export type GetClassLessonsParams = z.infer<typeof getClassLessonsParamsSchema>;
export type LessonResponse = z.infer<typeof lessonResponseSchema>;
