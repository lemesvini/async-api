"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLesson = createLesson;
exports.getLessonById = getLessonById;
exports.getClassLessons = getClassLessons;
exports.updateLesson = updateLesson;
exports.deleteLesson = deleteLesson;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function createLesson(input) {
    // Verify class exists and is active
    const classExists = await prisma_1.default.class.findFirst({
        where: {
            id: input.classId,
            isActive: true,
        },
    });
    if (!classExists) {
        throw new Error("Class not found or inactive");
    }
    // Verify content exists and is active
    const contentExists = await prisma_1.default.content.findFirst({
        where: {
            id: input.contentId,
            isActive: true,
        },
    });
    if (!contentExists) {
        throw new Error("Content not found or inactive");
    }
    // Check if lesson already exists for this class/content/date combination
    const existingLesson = await prisma_1.default.classLesson.findFirst({
        where: {
            classId: input.classId,
            contentId: input.contentId,
            lessonDate: new Date(input.lessonDate),
        },
    });
    if (existingLesson) {
        throw new Error("A lesson with the same class, content, and date already exists");
    }
    // Create the lesson
    const lesson = await prisma_1.default.classLesson.create({
        data: {
            classId: input.classId,
            contentId: input.contentId,
            lessonDate: new Date(input.lessonDate),
            notes: input.notes,
        },
        include: {
            class: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                    level: true,
                },
            },
            content: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    module: true,
                    order: true,
                },
            },
        },
    });
    return {
        ...lesson,
        lessonDate: lesson.lessonDate.toISOString(),
        createdAt: lesson.createdAt.toISOString(),
        updatedAt: lesson.updatedAt.toISOString(),
    };
}
async function getLessonById(params) {
    const lesson = await prisma_1.default.classLesson.findUnique({
        where: {
            id: params.id,
        },
        include: {
            class: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                    level: true,
                },
            },
            content: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    module: true,
                    order: true,
                },
            },
            attendance: {
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
    if (!lesson) {
        throw new Error("Lesson not found");
    }
    return {
        ...lesson,
        lessonDate: lesson.lessonDate.toISOString(),
        createdAt: lesson.createdAt.toISOString(),
        updatedAt: lesson.updatedAt.toISOString(),
    };
}
async function getClassLessons(params) {
    // Verify class exists
    const classExists = await prisma_1.default.class.findUnique({
        where: {
            id: params.classId,
        },
    });
    if (!classExists) {
        throw new Error("Class not found");
    }
    const lessons = await prisma_1.default.classLesson.findMany({
        where: {
            classId: params.classId,
        },
        include: {
            class: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                    level: true,
                },
            },
            content: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    module: true,
                    order: true,
                },
            },
            attendance: {
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
        orderBy: {
            lessonDate: "asc",
        },
    });
    return lessons.map((lesson) => ({
        ...lesson,
        lessonDate: lesson.lessonDate.toISOString(),
        createdAt: lesson.createdAt.toISOString(),
        updatedAt: lesson.updatedAt.toISOString(),
    }));
}
async function updateLesson(params, input) {
    // Verify lesson exists
    const existingLesson = await prisma_1.default.classLesson.findUnique({
        where: {
            id: params.id,
        },
    });
    if (!existingLesson) {
        throw new Error("Lesson not found");
    }
    // If updating content, verify it exists and is active
    if (input.contentId) {
        const contentExists = await prisma_1.default.content.findFirst({
            where: {
                id: input.contentId,
                isActive: true,
            },
        });
        if (!contentExists) {
            throw new Error("Content not found or inactive");
        }
    }
    // If updating date, check for conflicts
    if (input.lessonDate) {
        const conflictingLesson = await prisma_1.default.classLesson.findFirst({
            where: {
                id: { not: params.id },
                classId: existingLesson.classId,
                contentId: input.contentId || existingLesson.contentId,
                lessonDate: new Date(input.lessonDate),
            },
        });
        if (conflictingLesson) {
            throw new Error("A lesson with the same class, content, and date already exists");
        }
    }
    const updateData = {};
    if (input.contentId)
        updateData.contentId = input.contentId;
    if (input.lessonDate)
        updateData.lessonDate = new Date(input.lessonDate);
    if (input.notes !== undefined)
        updateData.notes = input.notes;
    if (input.wasCompleted !== undefined)
        updateData.wasCompleted = input.wasCompleted;
    const lesson = await prisma_1.default.classLesson.update({
        where: {
            id: params.id,
        },
        data: updateData,
        include: {
            class: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                    level: true,
                },
            },
            content: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    module: true,
                    order: true,
                },
            },
            attendance: {
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
    return {
        ...lesson,
        lessonDate: lesson.lessonDate.toISOString(),
        createdAt: lesson.createdAt.toISOString(),
        updatedAt: lesson.updatedAt.toISOString(),
    };
}
async function deleteLesson(params) {
    // Verify lesson exists
    const existingLesson = await prisma_1.default.classLesson.findUnique({
        where: {
            id: params.id,
        },
        include: {
            attendance: true,
        },
    });
    if (!existingLesson) {
        throw new Error("Lesson not found");
    }
    // Check if lesson has attendance records
    if (existingLesson.attendance.length > 0) {
        throw new Error("Cannot delete lesson with existing attendance records");
    }
    await prisma_1.default.classLesson.delete({
        where: {
            id: params.id,
        },
    });
    return { message: "Lesson deleted successfully" };
}
//# sourceMappingURL=lesson.service.js.map