import prisma from "../../utils/prisma";
import {
  CreateClassInput,
  UpdateClassInput,
  GetClassesQuery,
  GetClassParams,
} from "./class.schema";

// Helper function to format class response
function formatClassResponse(classEntity: any) {
  return {
    ...classEntity,
    hourPrice: Number(classEntity.hourPrice),
    createdAt: classEntity.createdAt.toISOString(),
    updatedAt: classEntity.updatedAt.toISOString(),
    enrollments: classEntity.enrollments?.map((enrollment: any) => ({
      ...enrollment,
      enrolledAt: enrollment.enrolledAt.toISOString(),
    })),
  };
}

export async function createClass(input: CreateClassInput) {
  const { studentIds, ...classData } = input;

  const classEntity = await prisma.class.create({
    data: {
      name: classData.name,
      description: classData.description,
      type: classData.type,
      hourPrice: classData.hourPrice,
      monthlyHours: classData.monthlyHours,
      currentModule: classData.currentModule,
      consultantId: classData.consultantId,
    },
    include: {
      enrollments: {
        include: {
          student: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  // Enroll students if provided
  if (studentIds && studentIds.length > 0) {
    await prisma.classEnrollment.createMany({
      data: studentIds.map((studentId) => ({
        classId: classEntity.id,
        studentId,
      })),
    });

    // Fetch the updated class with enrollments
    const updatedClass = await prisma.class.findUnique({
      where: { id: classEntity.id },
      include: {
        enrollments: {
          include: {
            student: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return formatClassResponse(updatedClass!);
  }

  return formatClassResponse(classEntity);
}

export async function getClassById(params: GetClassParams) {
  const classEntity = await prisma.class.findUnique({
    where: {
      id: params.id,
    },
    include: {
      enrollments: {
        include: {
          student: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!classEntity) return null;

  return formatClassResponse(classEntity);
}

export async function getClasses(query: any = {}) {
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "10");
  const skip = (page - 1) * limit;

  const whereClause: any = {};

  if (query.type) whereClause.type = query.type;
  if (query.consultantId) whereClause.consultantId = query.consultantId;
  if (query.currentModule) whereClause.currentModule = query.currentModule;

  // Filter by student enrollment
  if (query.studentId) {
    whereClause.enrollments = {
      some: {
        studentId: query.studentId,
      },
    };
  }

  const [classes, total] = await Promise.all([
    prisma.class.findMany({
      where: whereClause,
      include: {
        enrollments: {
          include: {
            student: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.class.count({
      where: whereClause,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  // Format classes with enrollments
  const serializedClasses = classes.map((classEntity) =>
    formatClassResponse(classEntity)
  );

  return {
    classes: serializedClasses,
    total,
    page,
    limit,
    totalPages,
  };
}
export async function updateClass(
  params: GetClassParams,
  input: UpdateClassInput
) {
  const classEntity = await prisma.class.update({
    where: {
      id: params.id,
    },
    data: input,
    include: {
      enrollments: {
        include: {
          student: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return formatClassResponse(classEntity);
}

export async function deleteClass(params: GetClassParams) {
  await prisma.class.delete({
    where: {
      id: params.id,
    },
  });

  return { message: "Class deleted successfully" };
}

// Enrollment functions (now fully functional)
export async function enrollStudent(classId: string, studentId: string) {
  const enrollment = await prisma.classEnrollment.create({
    data: {
      classId,
      studentId,
    },
    include: {
      student: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  return {
    ...enrollment,
    enrolledAt: enrollment.enrolledAt.toISOString(),
  };
}

export async function unenrollStudent(classId: string, studentId: string) {
  await prisma.classEnrollment.delete({
    where: {
      classId_studentId: {
        classId,
        studentId,
      },
    },
  });

  return { message: "Student unenrolled successfully" };
}
