"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.changePasswordSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
// Login request schema
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
// Register request schema
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    fullName: zod_1.z.string().min(1, "Full name is required"),
    role: zod_1.z.enum(["ADMIN", "CONSULTANT", "STUDENT"]),
    phone: zod_1.z.string().optional(),
    birthDate: zod_1.z.string().datetime().optional(),
    address: zod_1.z.string().optional(),
    emergencyContact: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
// Change password schema
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1, "Current password is required"),
    newPassword: zod_1.z.string().min(6, "New password must be at least 6 characters"),
});
// Refresh token schema
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "Refresh token is required"),
});
//# sourceMappingURL=auth.schema.js.map