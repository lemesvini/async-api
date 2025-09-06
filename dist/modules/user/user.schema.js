"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserResponseSchema = exports.getUsersResponseSchema = exports.userResponseSchema = exports.getUsersQuerySchema = exports.getUserParamsSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(100),
    fullName: zod_1.z.string().min(2).max(100),
    role: zod_1.z.enum(["ADMIN", "CONSULTANT", "STUDENT"]),
});
exports.createUserSchema = createUserSchema;
const updateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(8).max(100).optional(),
    fullName: zod_1.z.string().min(2).max(100).optional(),
    role: zod_1.z.enum(["ADMIN", "CONSULTANT", "STUDENT"]).optional(),
});
exports.updateUserSchema = updateUserSchema;
const getUserParamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.getUserParamsSchema = getUserParamsSchema;
const getUsersQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    role: zod_1.z.enum(["ADMIN", "CONSULTANT", "STUDENT"]).optional(),
});
exports.getUsersQuerySchema = getUsersQuerySchema;
const userResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    fullName: zod_1.z.string().min(2).max(100),
    role: zod_1.z.enum(["ADMIN", "CONSULTANT", "STUDENT"]),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.userResponseSchema = userResponseSchema;
const getUsersResponseSchema = zod_1.z.object({
    users: zod_1.z.array(userResponseSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    limit: zod_1.z.number(),
    totalPages: zod_1.z.number(),
});
exports.getUsersResponseSchema = getUsersResponseSchema;
const deleteUserResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
exports.deleteUserResponseSchema = deleteUserResponseSchema;
//# sourceMappingURL=user.schema.js.map