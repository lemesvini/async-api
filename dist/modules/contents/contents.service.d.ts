import { CreateContentInput, UpdateContentInput, GetContentParams } from "./contents.schema";
export declare function createContent(input: CreateContentInput): Promise<{
    createdAt: string;
    updatedAt: string;
    id: string;
    description: string | null;
    isActive: boolean;
    title: string;
    module: import("@prisma/client").$Enums.CEFRLevel;
    order: number;
    presentationUrl: string | null;
    studentsPdfUrl: string | null;
    homeworkUrl: string | null;
}>;
export declare function getContentById(params: GetContentParams): Promise<{
    createdAt: string;
    updatedAt: string;
    classLessons: {
        lessonDate: string;
        id: string;
        notes: string | null;
        classId: string;
        class: {
            id: string;
            name: string;
        };
        wasCompleted: boolean;
    }[];
    id: string;
    description: string | null;
    isActive: boolean;
    title: string;
    module: import("@prisma/client").$Enums.CEFRLevel;
    order: number;
    presentationUrl: string | null;
    studentsPdfUrl: string | null;
    homeworkUrl: string | null;
} | null>;
export declare function getContents(query?: any): Promise<{
    contents: {
        createdAt: string;
        updatedAt: string;
        classLessons: {
            lessonDate: string;
            id: string;
            notes: string | null;
            classId: string;
            class: {
                id: string;
                name: string;
            };
            wasCompleted: boolean;
        }[];
        id: string;
        description: string | null;
        isActive: boolean;
        title: string;
        module: import("@prisma/client").$Enums.CEFRLevel;
        order: number;
        presentationUrl: string | null;
        studentsPdfUrl: string | null;
        homeworkUrl: string | null;
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function updateContent(params: GetContentParams, input: UpdateContentInput): Promise<{
    createdAt: string;
    updatedAt: string;
    id: string;
    description: string | null;
    isActive: boolean;
    title: string;
    module: import("@prisma/client").$Enums.CEFRLevel;
    order: number;
    presentationUrl: string | null;
    studentsPdfUrl: string | null;
    homeworkUrl: string | null;
}>;
export declare function deleteContent(params: GetContentParams): Promise<{
    message: string;
}>;
export declare function getContentsByModule(module: string): Promise<{
    createdAt: string;
    updatedAt: string;
    id: string;
    description: string | null;
    isActive: boolean;
    title: string;
    module: import("@prisma/client").$Enums.CEFRLevel;
    order: number;
    presentationUrl: string | null;
    studentsPdfUrl: string | null;
    homeworkUrl: string | null;
}[]>;
//# sourceMappingURL=contents.service.d.ts.map