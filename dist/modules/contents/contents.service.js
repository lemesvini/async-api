"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContent = createContent;
exports.getContentById = getContentById;
exports.getContents = getContents;
exports.updateContent = updateContent;
exports.deleteContent = deleteContent;
exports.getContentsByModule = getContentsByModule;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function createContent(input) {
    // Check if content with same module and order already exists
    const existingContent = await prisma_1.default.content.findUnique({
        where: {
            module_order: {
                module: input.module,
                order: input.order,
            },
        },
    });
    if (existingContent) {
        throw new Error(`Content with module ${input.module} and order ${input.order} already exists`);
    }
    const contentData = await prisma_1.default.content.create({
        data: {
            title: input.title,
            description: input.description,
            module: input.module,
            order: input.order,
            presentationUrl: input.presentationUrl,
            studentsPdfUrl: input.studentsPdfUrl,
            homeworkUrl: input.homeworkUrl,
            isActive: input.isActive,
        },
        select: {
            id: true,
            title: true,
            description: true,
            module: true,
            order: true,
            presentationUrl: true,
            studentsPdfUrl: true,
            homeworkUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return {
        ...contentData,
        createdAt: contentData.createdAt.toISOString(),
        updatedAt: contentData.updatedAt.toISOString(),
    };
}
async function getContentById(params) {
    const contentData = await prisma_1.default.content.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            module: true,
            order: true,
            presentationUrl: true,
            studentsPdfUrl: true,
            homeworkUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classLessons: {
                select: {
                    id: true,
                    classId: true,
                    lessonDate: true,
                    notes: true,
                    wasCompleted: true,
                    class: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    lessonDate: "desc",
                },
            },
        },
    });
    if (!contentData)
        return null;
    return {
        ...contentData,
        createdAt: contentData.createdAt.toISOString(),
        updatedAt: contentData.updatedAt.toISOString(),
        classLessons: contentData.classLessons.map((lesson) => ({
            ...lesson,
            lessonDate: lesson.lessonDate.toISOString(),
        })),
    };
}
async function getContents(query = {}) {
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "10");
    const skip = (page - 1) * limit;
    // Build where clause
    const whereClause = {};
    if (query.module) {
        whereClause.module = query.module;
    }
    if (query.isActive !== undefined) {
        whereClause.isActive = query.isActive === "true";
    }
    const [contents, total] = await Promise.all([
        prisma_1.default.content.findMany({
            where: whereClause,
            select: {
                id: true,
                title: true,
                description: true,
                module: true,
                order: true,
                presentationUrl: true,
                studentsPdfUrl: true,
                homeworkUrl: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                classLessons: {
                    select: {
                        id: true,
                        classId: true,
                        lessonDate: true,
                        notes: true,
                        wasCompleted: true,
                        class: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    take: 5, // Limit class lessons to avoid large payloads
                    orderBy: {
                        lessonDate: "desc",
                    },
                },
            },
            skip,
            take: limit,
            orderBy: [
                {
                    module: "asc",
                },
                {
                    order: "asc",
                },
            ],
        }),
        prisma_1.default.content.count({
            where: whereClause,
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    // Convert dates to ISO strings
    const serializedContents = contents.map((contentData) => ({
        ...contentData,
        createdAt: contentData.createdAt.toISOString(),
        updatedAt: contentData.updatedAt.toISOString(),
        classLessons: contentData.classLessons.map((lesson) => ({
            ...lesson,
            lessonDate: lesson.lessonDate.toISOString(),
        })),
    }));
    return {
        contents: serializedContents,
        total,
        page,
        limit,
        totalPages,
    };
}
async function updateContent(params, input) {
    // If module or order is being updated, check for conflicts
    if (input.module || input.order) {
        const currentContent = await prisma_1.default.content.findUnique({
            where: { id: params.id },
            select: { module: true, order: true },
        });
        if (!currentContent) {
            throw new Error("Content not found");
        }
        const newModule = input.module || currentContent.module;
        const newOrder = input.order || currentContent.order;
        // Only check for conflicts if module or order is actually changing
        if (newModule !== currentContent.module ||
            newOrder !== currentContent.order) {
            const existingContent = await prisma_1.default.content.findUnique({
                where: {
                    module_order: {
                        module: newModule,
                        order: newOrder,
                    },
                },
            });
            if (existingContent && existingContent.id !== params.id) {
                throw new Error(`Content with module ${newModule} and order ${newOrder} already exists`);
            }
        }
    }
    const contentData = await prisma_1.default.content.update({
        where: {
            id: params.id,
        },
        data: input,
        select: {
            id: true,
            title: true,
            description: true,
            module: true,
            order: true,
            presentationUrl: true,
            studentsPdfUrl: true,
            homeworkUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return {
        ...contentData,
        createdAt: contentData.createdAt.toISOString(),
        updatedAt: contentData.updatedAt.toISOString(),
    };
}
async function deleteContent(params) {
    // Check if there are related class lessons
    const relatedLessons = await prisma_1.default.classLesson.count({
        where: {
            contentId: params.id,
        },
    });
    if (relatedLessons > 0) {
        throw new Error("Cannot delete content with related class lessons. Please remove the lessons first.");
    }
    await prisma_1.default.content.delete({
        where: {
            id: params.id,
        },
    });
    return { message: "Content deleted successfully" };
}
async function getContentsByModule(module) {
    const contents = await prisma_1.default.content.findMany({
        where: {
            module: module,
            isActive: true,
        },
        select: {
            id: true,
            title: true,
            description: true,
            module: true,
            order: true,
            presentationUrl: true,
            studentsPdfUrl: true,
            homeworkUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            order: "asc",
        },
    });
    return contents.map((content) => ({
        ...content,
        createdAt: content.createdAt.toISOString(),
        updatedAt: content.updatedAt.toISOString(),
    }));
}
//# sourceMappingURL=contents.service.js.map