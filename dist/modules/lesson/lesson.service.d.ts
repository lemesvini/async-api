import { CreateLessonInput, UpdateLessonInput, GetLessonParams, GetClassLessonsParams } from "./lesson.schema";
export declare function createLesson(input: CreateLessonInput): Promise<{
    lessonDate: string;
    createdAt: string;
    updatedAt: string;
    content: {
        id: string;
        description: string | null;
        title: string;
        module: import("@prisma/client").$Enums.CEFRLevel;
        order: number;
    };
    class: {
        type: import("@prisma/client").$Enums.ClassType;
        id: string;
        name: string;
        level: import("@prisma/client").$Enums.CEFRLevel;
    };
    id: string;
    notes: string | null;
    classId: string;
    wasCompleted: boolean;
    contentId: string;
}>;
export declare function getLessonById(params: GetLessonParams): Promise<{
    lessonDate: string;
    createdAt: string;
    updatedAt: string;
    attendance: ({
        student: {
            email: string;
            fullName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        studentId: string;
        classId: string;
        status: import("@prisma/client").$Enums.AttendanceStatus;
        lessonId: string;
    })[];
    content: {
        id: string;
        description: string | null;
        title: string;
        module: import("@prisma/client").$Enums.CEFRLevel;
        order: number;
    };
    class: {
        type: import("@prisma/client").$Enums.ClassType;
        id: string;
        name: string;
        level: import("@prisma/client").$Enums.CEFRLevel;
    };
    id: string;
    notes: string | null;
    classId: string;
    wasCompleted: boolean;
    contentId: string;
}>;
export declare function getClassLessons(params: GetClassLessonsParams): Promise<any[]>;
export declare function updateLesson(params: GetLessonParams, input: UpdateLessonInput): Promise<{
    lessonDate: string;
    createdAt: string;
    updatedAt: string;
    attendance: ({
        student: {
            email: string;
            fullName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        studentId: string;
        classId: string;
        status: import("@prisma/client").$Enums.AttendanceStatus;
        lessonId: string;
    })[];
    content: {
        id: string;
        description: string | null;
        title: string;
        module: import("@prisma/client").$Enums.CEFRLevel;
        order: number;
    };
    class: {
        type: import("@prisma/client").$Enums.ClassType;
        id: string;
        name: string;
        level: import("@prisma/client").$Enums.CEFRLevel;
    };
    id: string;
    notes: string | null;
    classId: string;
    wasCompleted: boolean;
    contentId: string;
}>;
export declare function deleteLesson(params: GetLessonParams): Promise<{
    message: string;
}>;
//# sourceMappingURL=lesson.service.d.ts.map