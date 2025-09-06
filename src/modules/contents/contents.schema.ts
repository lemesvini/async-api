import { z } from "zod";

const createContentSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  module: z.enum([
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
  order: z.number().min(1),
  presentationUrl: z.string().url().optional(),
  studentsPdfUrl: z.string().url().optional(),
  homeworkUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

const updateContentSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  module: z
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
  order: z.number().min(1).optional(),
  presentationUrl: z.string().url().optional(),
  studentsPdfUrl: z.string().url().optional(),
  homeworkUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

const getContentParamsSchema = z.object({
  id: z.string(),
});

const getContentsByModuleParamsSchema = z.object({
  module: z.enum([
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

const getContentsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  module: z
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
  isActive: z.string().optional(),
});

const contentResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  module: z.enum([
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
  order: z.number(),
  presentationUrl: z.string().nullable(),
  studentsPdfUrl: z.string().nullable(),
  homeworkUrl: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  classLessons: z
    .array(
      z.object({
        id: z.string(),
        classId: z.string(),
        lessonDate: z.string().datetime(),
        notes: z.string().nullable(),
        wasCompleted: z.boolean(),
        class: z.object({
          id: z.string(),
          name: z.string(),
        }),
      })
    )
    .optional(),
});

const getContentsResponseSchema = z.object({
  contents: z.array(contentResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

const deleteContentResponseSchema = z.object({
  message: z.string(),
});

export type CreateContentInput = z.infer<typeof createContentSchema>;
export type UpdateContentInput = z.infer<typeof updateContentSchema>;
export type GetContentParams = z.infer<typeof getContentParamsSchema>;
export type GetContentsByModuleParams = z.infer<
  typeof getContentsByModuleParamsSchema
>;
export type GetContentsQuery = z.infer<typeof getContentsQuerySchema>;
export type ContentResponse = z.infer<typeof contentResponseSchema>;
export type GetContentsResponse = z.infer<typeof getContentsResponseSchema>;
export type DeleteContentResponse = z.infer<typeof deleteContentResponseSchema>;

export {
  createContentSchema,
  updateContentSchema,
  getContentParamsSchema,
  getContentsByModuleParamsSchema,
  getContentsQuerySchema,
  contentResponseSchema,
  getContentsResponseSchema,
  deleteContentResponseSchema,
};
