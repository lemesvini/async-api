import { CreateClassInput, UpdateClassInput, GetClassParams, EnrollStudentInput } from "./class.schema";
export declare function createClass(input: CreateClassInput): Promise<{
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    type: import("@prisma/client").$Enums.ClassType;
    id: string;
    name: string;
    description: string | null;
    level: import("@prisma/client").$Enums.CEFRLevel;
    maxStudents: number;
    isActive: boolean;
    dayOfWeek: number;
    consultantId: string | null;
    consultant: {
        email: string;
        fullName: string;
        id: string;
    } | null;
}>;
export declare function getClassById(params: GetClassParams): Promise<{
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    enrollments: {
        enrolledAt: string;
        id: string;
        isActive: boolean;
        studentId: string;
        student: {
            email: string;
            fullName: string;
            id: string;
        };
    }[];
    type: import("@prisma/client").$Enums.ClassType;
    id: string;
    name: string;
    description: string | null;
    level: import("@prisma/client").$Enums.CEFRLevel;
    maxStudents: number;
    isActive: boolean;
    dayOfWeek: number;
    consultantId: string | null;
    consultant: {
        email: string;
        fullName: string;
        id: string;
    } | null;
} | null>;
export declare function getClasses(query?: any): Promise<{
    classes: {
        startTime: string;
        endTime: string;
        createdAt: string;
        updatedAt: string;
        enrollments: {
            enrolledAt: string;
            id: string;
            isActive: boolean;
            studentId: string;
            student: {
                email: string;
                fullName: string;
                id: string;
            };
        }[];
        type: import("@prisma/client").$Enums.ClassType;
        id: string;
        name: string;
        description: string | null;
        level: import("@prisma/client").$Enums.CEFRLevel;
        maxStudents: number;
        isActive: boolean;
        dayOfWeek: number;
        consultantId: string | null;
        consultant: {
            email: string;
            fullName: string;
            id: string;
        } | null;
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function updateClass(params: GetClassParams, input: UpdateClassInput): Promise<{
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    type: import("@prisma/client").$Enums.ClassType;
    id: string;
    name: string;
    description: string | null;
    level: import("@prisma/client").$Enums.CEFRLevel;
    maxStudents: number;
    isActive: boolean;
    dayOfWeek: number;
    consultantId: string | null;
    consultant: {
        email: string;
        fullName: string;
        id: string;
    } | null;
}>;
export declare function deleteClass(params: GetClassParams): Promise<{
    message: string;
}>;
export declare function enrollStudent(params: GetClassParams, input: EnrollStudentInput): Promise<{
    enrolledAt: string;
    id: string;
    isActive: boolean;
    studentId: string;
    classId: string;
}>;
export declare function unenrollStudent(params: GetClassParams, studentId: string): Promise<{
    message: string;
}>;
export declare function getClassEnrollments(params: GetClassParams): Promise<{
    enrolledAt: string;
    id: string;
    isActive: boolean;
    studentId: string;
    student: {
        email: string;
        fullName: string;
        id: string;
        phone: string | null;
    };
}[]>;
//# sourceMappingURL=class.service.d.ts.map