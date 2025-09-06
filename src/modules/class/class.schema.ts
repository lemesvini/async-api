import { z } from "zod";

const createClassSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  type: z.enum(["CORPORATE", "PRIVATE"]),
  level: z.enum([
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
  maxStudents: z.number().min(1).max(50).default(10),
  isActive: z.boolean().default(true),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  dayOfWeek: z.number().min(0).max(6), // 0 = Sunday, 1 = Monday, etc.
  consultantId: z.string().min(1),
});

const updateClassSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  type: z.enum(["CORPORATE", "PRIVATE"]).optional(),
  level: z
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
  maxStudents: z.number().min(1).max(50).optional(),
  isActive: z.boolean().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  dayOfWeek: z.number().min(0).max(6).optional(),
  consultantId: z.string().min(1).optional(),
});

const getClassParamsSchema = z.object({
  id: z.string(),
});

const getClassesQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  type: z.enum(["CORPORATE", "PRIVATE"]).optional(),
  level: z
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
  consultantId: z.string().optional(),
  isActive: z.string().optional(),
});

const enrollStudentSchema = z.object({
  studentId: z.string().min(1),
});

const classResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  type: z.enum(["CORPORATE", "PRIVATE"]),
  level: z.enum([
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
  maxStudents: z.number(),
  isActive: z.boolean(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  dayOfWeek: z.number(),
  consultantId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  consultant: z
    .object({
      id: z.string(),
      fullName: z.string(),
      email: z.string(),
    })
    .optional(),
  enrollments: z
    .array(
      z.object({
        id: z.string(),
        studentId: z.string(),
        enrolledAt: z.string().datetime(),
        isActive: z.boolean(),
        student: z.object({
          id: z.string(),
          fullName: z.string(),
          email: z.string(),
        }),
      })
    )
    .optional(),
});

const getClassesResponseSchema = z.object({
  classes: z.array(classResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

const deleteClassResponseSchema = z.object({
  message: z.string(),
});

const enrollmentResponseSchema = z.object({
  id: z.string(),
  classId: z.string(),
  studentId: z.string(),
  enrolledAt: z.string().datetime(),
  isActive: z.boolean(),
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
export type GetClassParams = z.infer<typeof getClassParamsSchema>;
export type GetClassesQuery = z.infer<typeof getClassesQuerySchema>;
export type EnrollStudentInput = z.infer<typeof enrollStudentSchema>;
export type ClassResponse = z.infer<typeof classResponseSchema>;
export type GetClassesResponse = z.infer<typeof getClassesResponseSchema>;
export type DeleteClassResponse = z.infer<typeof deleteClassResponseSchema>;
export type EnrollmentResponse = z.infer<typeof enrollmentResponseSchema>;

export {
  createClassSchema,
  updateClassSchema,
  getClassParamsSchema,
  getClassesQuerySchema,
  enrollStudentSchema,
  classResponseSchema,
  getClassesResponseSchema,
  deleteClassResponseSchema,
  enrollmentResponseSchema,
};
