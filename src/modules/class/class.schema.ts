import { z } from "zod";

const createClassSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(["CORPORATE", "PRIVATE"]),
  hourPrice: z.number().positive(),
  monthlyHours: z.number().int().positive(),
  currentModule: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),
  consultantId: z.string(),
  studentIds: z.array(z.string()).optional(), // Array of student IDs for enrollment
});

const updateClassSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  type: z.enum(["CORPORATE", "PRIVATE"]).optional(),
  hourPrice: z.number().positive().optional(),
  monthlyHours: z.number().int().positive().optional(),
  currentModule: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),
  consultantId: z.string().optional(),
});

const getClassParamsSchema = z.object({
  id: z.string(),
});

const getClassesQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  type: z.enum(["CORPORATE", "PRIVATE"]).optional(),
  consultantId: z.string().optional(),
  studentId: z.string().optional(), // Filter classes where this student is enrolled
  currentModule: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).optional(),
});

const classResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  type: z.enum(["CORPORATE", "PRIVATE"]),
  hourPrice: z.number(),
  monthlyHours: z.number(),
  currentModule: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]).nullable(),
  consultantId: z.string(),
  enrollments: z
    .array(
      z.object({
        id: z.string(),
        studentId: z.string(),
        enrolledAt: z.string().datetime(),
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
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
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

// Enrollment schemas
const enrollStudentSchema = z.object({
  studentId: z.string(),
});

const enrollStudentsSchema = z.object({
  studentIds: z.array(z.string()).min(1),
});

const unenrollStudentSchema = z.object({
  studentId: z.string(),
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
export type GetClassParams = z.infer<typeof getClassParamsSchema>;
export type GetClassesQuery = z.infer<typeof getClassesQuerySchema>;
export type ClassResponse = z.infer<typeof classResponseSchema>;
export type GetClassesResponse = z.infer<typeof getClassesResponseSchema>;
export type DeleteClassResponse = z.infer<typeof deleteClassResponseSchema>;
export type EnrollStudentInput = z.infer<typeof enrollStudentSchema>;
export type EnrollStudentsInput = z.infer<typeof enrollStudentsSchema>;
export type UnenrollStudentInput = z.infer<typeof unenrollStudentSchema>;

export {
  createClassSchema,
  updateClassSchema,
  getClassParamsSchema,
  getClassesQuerySchema,
  classResponseSchema,
  getClassesResponseSchema,
  deleteClassResponseSchema,
  enrollStudentSchema,
  enrollStudentsSchema,
  unenrollStudentSchema,
};
