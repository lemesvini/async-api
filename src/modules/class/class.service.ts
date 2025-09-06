import prisma from "../../utils/prisma";
import {
  CreateClassInput,
  UpdateClassInput,
  GetClassesQuery,
  GetClassParams,
  EnrollStudentInput,
} from "./class.schema";

export async function createClass(input: CreateClassInput) {
  // Verify consultant exists and has the right role
  const consultant = await prisma.user.findUnique({
    where: { id: input.consultantId },
    select: { id: true, role: true },
  });

  if (!consultant) {
    throw new Error("Consultant not found");
  }

  if (consultant.role !== "CONSULTANT" && consultant.role !== "ADMIN") {
    throw new Error("User must be a consultant or admin to teach classes");
  }

  const classData = await prisma.class.create({
    data: {
      ...input,
      startTime: new Date(input.startTime),
      endTime: new Date(input.endTime),
    },
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      level: true,
      maxStudents: true,
      isActive: true,
      startTime: true,
      endTime: true,
      dayOfWeek: true,
      consultantId: true,
      createdAt: true,
      updatedAt: true,
      consultant: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  return {
    ...classData,
    startTime: classData.startTime.toISOString(),
    endTime: classData.endTime.toISOString(),
    createdAt: classData.createdAt.toISOString(),
    updatedAt: classData.updatedAt.toISOString(),
  };
}

export async function getClassById(params: GetClassParams) {
  const classData = await prisma.class.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      level: true,
      maxStudents: true,
      isActive: true,
      startTime: true,
      endTime: true,
      dayOfWeek: true,
      consultantId: true,
      createdAt: true,
      updatedAt: true,
      consultant: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      enrollments: {
        where: { isActive: true },
        select: {
          id: true,
          studentId: true,
          enrolledAt: true,
          isActive: true,
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

  if (!classData) return null;

  return {
    ...classData,
    startTime: classData.startTime.toISOString(),
    endTime: classData.endTime.toISOString(),
    createdAt: classData.createdAt.toISOString(),
    updatedAt: classData.updatedAt.toISOString(),
    enrollments: classData.enrollments.map((enrollment) => ({
      ...enrollment,
      enrolledAt: enrollment.enrolledAt.toISOString(),
    })),
  };
}

export async function getClasses(query: any = {}) {
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "10");
  const skip = (page - 1) * limit;

  // Build where clause
  const whereClause: any = {};

  if (query.type) {
    whereClause.type = query.type;
  }

  if (query.level) {
    whereClause.level = query.level;
  }

  if (query.consultantId) {
    whereClause.consultantId = query.consultantId;
  }

  if (query.isActive !== undefined) {
    whereClause.isActive = query.isActive === "true";
  }

  const [classes, total] = await Promise.all([
    prisma.class.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        level: true,
        maxStudents: true,
        isActive: true,
        startTime: true,
        endTime: true,
        dayOfWeek: true,
        consultantId: true,
        createdAt: true,
        updatedAt: true,
        consultant: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        enrollments: {
          where: { isActive: true },
          select: {
            id: true,
            studentId: true,
            enrolledAt: true,
            isActive: true,
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

  // Convert dates to ISO strings
  const serializedClasses = classes.map((classData) => ({
    ...classData,
    startTime: classData.startTime.toISOString(),
    endTime: classData.endTime.toISOString(),
    createdAt: classData.createdAt.toISOString(),
    updatedAt: classData.updatedAt.toISOString(),
    enrollments: classData.enrollments.map((enrollment) => ({
      ...enrollment,
      enrolledAt: enrollment.enrolledAt.toISOString(),
    })),
  }));

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
  // If consultantId is being updated, verify the new consultant
  if (input.consultantId) {
    const consultant = await prisma.user.findUnique({
      where: { id: input.consultantId },
      select: { id: true, role: true },
    });

    if (!consultant) {
      throw new Error("Consultant not found");
    }

    if (consultant.role !== "CONSULTANT" && consultant.role !== "ADMIN") {
      throw new Error("User must be a consultant or admin to teach classes");
    }
  }

  const updateData: any = { ...input };

  // Convert date strings to Date objects if provided
  if (input.startTime) {
    updateData.startTime = new Date(input.startTime);
  }
  if (input.endTime) {
    updateData.endTime = new Date(input.endTime);
  }

  const classData = await prisma.class.update({
    where: {
      id: params.id,
    },
    data: updateData,
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      level: true,
      maxStudents: true,
      isActive: true,
      startTime: true,
      endTime: true,
      dayOfWeek: true,
      consultantId: true,
      createdAt: true,
      updatedAt: true,
      consultant: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  return {
    ...classData,
    startTime: classData.startTime.toISOString(),
    endTime: classData.endTime.toISOString(),
    createdAt: classData.createdAt.toISOString(),
    updatedAt: classData.updatedAt.toISOString(),
  };
}

export async function deleteClass(params: GetClassParams) {
  // Check if there are active enrollments
  const activeEnrollments = await prisma.classEnrollment.count({
    where: {
      classId: params.id,
      isActive: true,
    },
  });

  if (activeEnrollments > 0) {
    throw new Error(
      "Cannot delete class with active enrollments. Please deactivate enrollments first."
    );
  }

  await prisma.class.delete({
    where: {
      id: params.id,
    },
  });

  return { message: "Class deleted successfully" };
}

export async function enrollStudent(
  params: GetClassParams,
  input: EnrollStudentInput
) {
  // Verify student exists and has the right role
  const student = await prisma.user.findUnique({
    where: { id: input.studentId },
    select: { id: true, role: true },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  if (student.role !== "STUDENT") {
    throw new Error("User must be a student to enroll in classes");
  }

  // Verify class exists and is active
  const classData = await prisma.class.findUnique({
    where: { id: params.id },
    select: { id: true, isActive: true, maxStudents: true },
  });

  if (!classData) {
    throw new Error("Class not found");
  }

  if (!classData.isActive) {
    throw new Error("Cannot enroll in inactive class");
  }

  // Check if student is already enrolled
  const existingEnrollment = await prisma.classEnrollment.findUnique({
    where: {
      classId_studentId: {
        classId: params.id,
        studentId: input.studentId,
      },
    },
  });

  if (existingEnrollment) {
    if (existingEnrollment.isActive) {
      throw new Error("Student is already enrolled in this class");
    } else {
      // Reactivate enrollment
      const enrollment = await prisma.classEnrollment.update({
        where: { id: existingEnrollment.id },
        data: { isActive: true },
      });

      return {
        ...enrollment,
        enrolledAt: enrollment.enrolledAt.toISOString(),
      };
    }
  }

  // Check if class is full
  const currentEnrollments = await prisma.classEnrollment.count({
    where: {
      classId: params.id,
      isActive: true,
    },
  });

  if (currentEnrollments >= classData.maxStudents) {
    throw new Error("Class is full");
  }

  // Create new enrollment
  const enrollment = await prisma.classEnrollment.create({
    data: {
      classId: params.id,
      studentId: input.studentId,
    },
  });

  return {
    ...enrollment,
    enrolledAt: enrollment.enrolledAt.toISOString(),
  };
}

export async function unenrollStudent(
  params: GetClassParams,
  studentId: string
) {
  const enrollment = await prisma.classEnrollment.findUnique({
    where: {
      classId_studentId: {
        classId: params.id,
        studentId: studentId,
      },
    },
  });

  if (!enrollment) {
    throw new Error("Student is not enrolled in this class");
  }

  if (!enrollment.isActive) {
    throw new Error("Student enrollment is already inactive");
  }

  // Deactivate enrollment instead of deleting to maintain history
  await prisma.classEnrollment.update({
    where: { id: enrollment.id },
    data: { isActive: false },
  });

  return { message: "Student unenrolled successfully" };
}

export async function getClassEnrollments(params: GetClassParams) {
  const enrollments = await prisma.classEnrollment.findMany({
    where: {
      classId: params.id,
      isActive: true,
    },
    select: {
      id: true,
      studentId: true,
      enrolledAt: true,
      isActive: true,
      student: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: {
      enrolledAt: "asc",
    },
  });

  return enrollments.map((enrollment) => ({
    ...enrollment,
    enrolledAt: enrollment.enrolledAt.toISOString(),
  }));
}
