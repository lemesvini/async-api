"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClass = createClass;
exports.getClassById = getClassById;
exports.getClasses = getClasses;
exports.updateClass = updateClass;
exports.deleteClass = deleteClass;
exports.enrollStudent = enrollStudent;
exports.unenrollStudent = unenrollStudent;
exports.getClassEnrollments = getClassEnrollments;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function createClass(input) {
    // Verify consultant exists and has the right role (if consultant is provided)
    if (input.consultantId) {
        const consultant = await prisma_1.default.user.findUnique({
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
    const classData = await prisma_1.default.class.create({
        data: {
            name: input.name,
            description: input.description,
            type: input.type,
            level: input.level,
            maxStudents: input.maxStudents,
            isActive: input.isActive,
            startTime: new Date(input.startTime),
            endTime: new Date(input.endTime),
            dayOfWeek: input.dayOfWeek,
            ...(input.consultantId && { consultantId: input.consultantId }),
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
async function getClassById(params) {
    const classData = await prisma_1.default.class.findUnique({
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
    if (!classData)
        return null;
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
async function getClasses(query = {}) {
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "10");
    const skip = (page - 1) * limit;
    // Build where clause
    const whereClause = {};
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
        prisma_1.default.class.findMany({
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
        prisma_1.default.class.count({
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
async function updateClass(params, input) {
    // If consultantId is being updated, verify the new consultant
    if (input.consultantId) {
        const consultant = await prisma_1.default.user.findUnique({
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
    const updateData = { ...input };
    // Convert date strings to Date objects if provided
    if (input.startTime) {
        updateData.startTime = new Date(input.startTime);
    }
    if (input.endTime) {
        updateData.endTime = new Date(input.endTime);
    }
    const classData = await prisma_1.default.class.update({
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
async function deleteClass(params) {
    // Check if there are active enrollments
    const activeEnrollments = await prisma_1.default.classEnrollment.count({
        where: {
            classId: params.id,
            isActive: true,
        },
    });
    if (activeEnrollments > 0) {
        throw new Error("Cannot delete class with active enrollments. Please deactivate enrollments first.");
    }
    await prisma_1.default.class.delete({
        where: {
            id: params.id,
        },
    });
    return { message: "Class deleted successfully" };
}
async function enrollStudent(params, input) {
    // Verify student exists and has the right role
    const student = await prisma_1.default.user.findUnique({
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
    const classData = await prisma_1.default.class.findUnique({
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
    const existingEnrollment = await prisma_1.default.classEnrollment.findUnique({
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
        }
        else {
            // Reactivate enrollment
            const enrollment = await prisma_1.default.classEnrollment.update({
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
    const currentEnrollments = await prisma_1.default.classEnrollment.count({
        where: {
            classId: params.id,
            isActive: true,
        },
    });
    if (currentEnrollments >= classData.maxStudents) {
        throw new Error("Class is full");
    }
    // Create new enrollment
    const enrollment = await prisma_1.default.classEnrollment.create({
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
async function unenrollStudent(params, studentId) {
    const enrollment = await prisma_1.default.classEnrollment.findUnique({
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
    await prisma_1.default.classEnrollment.update({
        where: { id: enrollment.id },
        data: { isActive: false },
    });
    return { message: "Student unenrolled successfully" };
}
async function getClassEnrollments(params) {
    const enrollments = await prisma_1.default.classEnrollment.findMany({
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
//# sourceMappingURL=class.service.js.map