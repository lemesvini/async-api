"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.refreshUserToken = refreshUserToken;
exports.changeUserPassword = changeUserPassword;
exports.getUserFromToken = getUserFromToken;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const hash_1 = require("../../utils/hash");
async function loginUser(input, app) {
    // Find user by email
    const user = await prisma_1.default.user.findUnique({
        where: { email: input.email },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            password: true,
            salt: true,
        },
    });
    if (!user) {
        return null;
    }
    // Verify password
    const isValidPassword = (0, hash_1.verifyPassword)(input.password, user.salt, user.password);
    if (!isValidPassword) {
        return null;
    }
    // Create user payload (without sensitive data)
    const userPayload = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
    };
    // Generate tokens using the JWT instance
    const accessToken = app.jwt.sign(userPayload, { expiresIn: "15m" });
    const refreshToken = app.jwt.sign({ userId: user.id }, { expiresIn: "7d" });
    return {
        user: userPayload,
        accessToken,
        refreshToken,
    };
}
async function registerUser(input) {
    // Check if user already exists
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email: input.email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    // Hash password
    const { password, birthDate, ...rest } = input;
    const { hash, salt } = (0, hash_1.hashPassword)(password);
    // Create user
    const user = await prisma_1.default.user.create({
        data: {
            ...rest,
            password: hash,
            salt,
            birthDate: birthDate ? new Date(birthDate) : null,
        },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
        },
    });
    return user;
}
async function refreshUserToken(refreshToken, app) {
    try {
        // Verify refresh token
        const decoded = app.jwt.verify(refreshToken);
        // Get user data
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
            },
        });
        if (!user) {
            return null;
        }
        // Generate new tokens
        const userPayload = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        };
        const newAccessToken = app.jwt.sign(userPayload, { expiresIn: "15m" });
        const newRefreshToken = app.jwt.sign({ userId: user.id }, { expiresIn: "7d" });
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    catch (error) {
        return null;
    }
}
async function changeUserPassword(userId, input) {
    // Get current user
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
        select: { password: true, salt: true },
    });
    if (!user) {
        return false;
    }
    // Verify current password
    const isCurrentPasswordValid = (0, hash_1.verifyPassword)(input.currentPassword, user.salt, user.password);
    if (!isCurrentPasswordValid) {
        return false;
    }
    // Hash new password
    const { hash, salt } = (0, hash_1.hashPassword)(input.newPassword);
    // Update password
    await prisma_1.default.user.update({
        where: { id: userId },
        data: {
            password: hash,
            salt,
        },
    });
    return true;
}
async function getUserFromToken(token, app) {
    try {
        const decoded = app.jwt.verify(token);
        // Verify user still exists
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
            },
        });
        return user;
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=auth.service.js.map